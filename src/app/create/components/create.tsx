"use client"

import { ImagePreviewType } from "@/utils/interface"
import { useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { createClient } from "@/utils/supabase/client"

export default function CreateImagesComponent({ userId}: {userId: string}) {
  //const [ filesSelection, setFilesSelection ] = useState<UploadedImageType[]>([])
  const [ uploadedFiles, setUploadedFiles ] = useState<ImagePreviewType[]>([])
  const [ fileError, setFileError ] = useState<string | null>(null)
  const [ uploadingStatus, setUploadingStatus ] = useState<boolean>(false)

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

    const validFiles: ImagePreviewType[] = newFiles
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
    setUploadingStatus(true)
    const supabase = await createClient()

    try {
      const uploadPromises = uploadedFiles.map(async (item) => {
        const fileExtension = item.name.split(".").pop()
        const fileName = `${userId}/${Math.random()}.${fileExtension}`

        const {data: uploadImageData, error: uploadImageError } = await supabase.storage
          .from("images")
          .upload(fileName, item.file)

        if (uploadImageError) {
          console.log(uploadImageError)
          throw uploadImageError
        }
      })

      await Promise.all(uploadPromises)
      alert("Upload successful.")
      setUploadedFiles([])
    } catch (err: any) {
      setFileError(err.message)
    } finally {
      setUploadingStatus(false)
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
        <button
          onClick={handleImageUpload}
          disabled={uploadingStatus}
        >
          {uploadingStatus ? "Uploading.." : "Upload images"}
        </button>
      )}

    </div>
  )
}
