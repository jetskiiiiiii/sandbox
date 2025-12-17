// Naming all types with [NAME]Type
export interface UploadedImageType {
  url: string;
  name: string;
  size: number;
}

export interface ImagePreviewType extends UploadedImageType {
  file: File;
}
