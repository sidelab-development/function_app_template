/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StorageSharedKeyCredential } from '@azure/storage-blob';
import { IStorageService, IGetFileResponse } from '../../../app/services/blob-storage/interface';

export class FakeStorageService implements IStorageService {
  createCredential(): StorageSharedKeyCredential {
    return null;
  }

  async getFile(blobName: string, type: string): Promise<IGetFileResponse> {
    return { blob: blobName, url: blobName, type };
  }

  async sendFile(_blobName: string, _data: string): Promise<void> {
    return null;
  }

  async deleteFile(_blobName: string): Promise<void> {
    return null;
  }
}
