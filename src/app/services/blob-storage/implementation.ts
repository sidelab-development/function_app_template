import {
  BlobSASPermissions, BlobServiceClient
} from '@azure/storage-blob';
import { IGetFileResponse, IStorageService } from './interface';

const containerName = process.env.STORAGE_CONTAINER_NAME;
const connStr = process.env.STORAGE_CONNECTION_STRING;

export class StorageService implements IStorageService {
  /**
   * Generates a SAS Link with Read Permission that will download the file
   * @param blobName Name of The file
   * @returns SAS Link of the file
   */
  async getFile(blobName: string, type: string): Promise<IGetFileResponse> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    const blobExist = await blobClient.exists();

    if (!blobExist) return null;

    const url = await blobClient.generateSasUrl({
      permissions: BlobSASPermissions.parse('r'),
      startsOn: new Date(), // Required
      expiresOn: new Date(new Date().getTime() + 15 * 60000),
      contentType: type,
    });

    return { blob: blobName, url, type };
  }

  /**
   * Will Send the file to the Blob Storage
   * @param blobName Name that will be given to File
   * @param data The data of the File
   * @param data The type of the File
   * @returns The status of the transaction
   */
  async sendFile(blobName: string, data: string): Promise<void> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const matches = data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const type = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');

    await blockBlobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: {
        blobContentType: type,
      },
    });
  }

  async deleteFile(blobName: string): Promise<void> {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.deleteIfExists();
  }
}
