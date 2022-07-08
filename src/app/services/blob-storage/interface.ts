export type IGetFileResponse = { blob: string; type: string; url: string; }

export interface IStorageService {
  getFile: (blobName: string, type: string) => Promise<IGetFileResponse>
  sendFile: (blobName: string, data: string) => Promise<void>
  deleteFile(blobName: string): Promise<void>
}
