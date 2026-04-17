"use client"

import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import { CreateImagesComponentPropType, ImageType } from "@/utils/types/interface"
import { UploadedImageType } from "@/utils/types/interface"

/*
 * Should be Create Canvas, but currently can only create images.
 *
 * 3 logics: publish, save, uploads
 *
 * Advanced logic scenario: if user publishes, but wants to edit and then saves draft, other users see last published but user can see draft in dashboard
 *
 * TODO:
 * - rename functionality
 * - differentiating creation and tile
 * - updating tile position in creation_state
 * - update page once published (no longer in edit mode)
 */
export default function CreateImagesComponent({
  user_id,
  creation_id,
  item_ids,
}: CreateImagesComponentPropType) {
  const [ uploadedFiles, setUploadedFiles ] = useState<UploadedImageType[]>([])
  const [ fileError, setFileError ] = useState<string | null>(null)
  const [ publishingStatus, setPublishingStatus ] = useState<boolean>(false)
  const [ savingStatus, setSavingStatus ] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.url))
    }
  }, [uploadedFiles])

  const processFiles = (newFiles: File[]) => {
    setFileError(null)
    // Check number of images in upload
    if (uploadedFiles.length + newFiles.length > 5) {
      setFileError("5 files max per upload.")
      return
    }

    const validFiles: UploadedImageType[] = newFiles
      .filter((file) => {
        // Check for valid image
        if (!file.type.startsWith("image/")) {
          setFileError("Only images are allowed.")
          return false
        // Check image size
        }
        if (file.size > 1024 * 1024 * 5) {
          setFileError("Max file size is 5 MB.")
          return false
        } 
        return true
    })
    .map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      file: file,
      status: "draft",
    }))

    setUploadedFiles((prev) => [...prev, ...validFiles])
  }

  // To remove files from selection
  const removeFromSelection = (index: number) => {
    setUploadedFiles((prev) => {
      URL.revokeObjectURL(prev[index].url)
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleImageUpload = async () => {
    setPublishingStatus(true)
    const supabase = await createClient()

    try {
      const uploadPromises = uploadedFiles.map(async (item) => {
        const fileExtension = item.name.split(".").pop()
        const fileName = `${userId}/${creation_id}/{${Math.random()}.${fileExtension}`

        // Upload image(s) to bucket
        const { data: uploadImageData, error: uploadImageError } = await supabase.storage
          .from("images")
          .upload(fileName, item.file)
        if (uploadImageError) throw uploadImageError

        // Get public url of image
        const { data: { publicUrl } } = supabase.storage
          .from("images")
          .getPublicUrl(fileName)

        // Insert image url(s) in database
        // TODO: Use AI for alt_description
        const { error: insertImageUrlError } = await supabase
          .from("creation_items")
          .insert({public_url: publicUrl})
        if (insertImageUrlError) throw insertImageUrlError 
      })

      await Promise.all(uploadPromises)

      // Update metadata once user wants to publish
      const { error: updateMetadataError } = await supabase
        .from("creation_metadata")
        .update({updated_at: new Date().toISOString(), status: "published"})
        .eq("id", creation_id)
      if (updateMetadataError) throw updateMetadataError

      alert("Creation published!")
      setUploadedFiles([])
    } catch (err: any) {
      setFileError(err.message)
    } finally {
      setPublishingStatus(false)
      redirect("/")
    }
  }

  const handleSaveDraft = async () => {
    setSavingStatus(true)
    const supabase = await createClient()

    try {
      const uploadPromises = uploadedFiles.map(async (item) => {
        const fileExtension = item.name.split(".").pop()
        const fileName = `${userId}/${Math.random()}.${fileExtension}`

        // Upload image(s) to bucket
        const { data: uploadImageData, error: uploadImageError } = await supabase.storage
          .from("images")
          .upload(fileName, item.file)
        if (uploadImageError) throw uploadImageError

        const { data: { publicUrl } } = supabase.storage
          .from("images")
          .getPublicUrl(fileName)

        // Assign image url(s) to user in database
        const { data: imageIdData, error: assignImageError } = await supabase
          .from("images")
          .insert({public_url: publicUrl})
          .select("id")
          .single()
        if (assignImageError) throw assignImageError

        // Insert image url(s) in database
        // TODO: Use AI for alt_description
        const { error: insertImageUrlError } = await supabase
          .from("creation_items")
          .insert({public_url: publicUrl})
        if (insertImageUrlError) throw insertImageUrlError 

    })

      await Promise.all(uploadPromises)

      // Update metadata once user wants to publish
      const { error: updateMetadataError } = await supabase
        .from("creation_metadata")
        .update({updated_at: new Date().toISOString()})
        .eq("id", creation_id)
      if (updateMetadataError) throw updateMetadataError

      alert("Draft saved.")
    } catch (err: any) {
        setFileError(err.message)
    } finally {
        setSavingStatus(false)
    }
  }

  // For drag and drop functionality
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: processFiles,
    accept: { "image/*": []},
  })

  return (
      <div> 
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag images here or click to select (max 5).</p>
        </div>

        {fileError && <p>{fileError}</p>}

        <div>
          {uploadedFiles.map((file, index) => (
            <div key={file.url}>
              <img src={file.url} alt={file.name} width={50} />
              <button
                onClick={() => removeFromSelection(index)}
              >Remove</button>
            </div>
          ))}
        </div>

        {uploadedFiles.length > 0 && (
          <div>
            <button
              onClick={handleImageUpload}
              disabled={publishingStatus}
            >
              {publishingStatus ? "Publishing.." : "Publish"}
            </button>
            <button
              onClick={handleSaveDraft}
              disabled={savingStatus}
            >
              {savingStatus ? "Saving.." : "Save draft"}
            </button>
          </div>
        )}

      </div>
  )
}



