import { Injectable } from '@nestjs/common';
import {
  AbortMultipartUploadCommandOutput,
  CompleteMultipartUploadCommandOutput,
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload as UploadSdk } from '@aws-sdk/lib-storage';
import * as Upload from 'graphql-upload/Upload.js';
import * as UploadType from 'graphql-upload/Upload.js';
import {
  ImageUploadFolder,
  customException,
} from '@/global/constant/constants';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '@/prisma/prisma.service';
const {
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY,
  AWS_S3_REGION,
  AWS_S3_BUCKET_NAME,
} = process.env;

@Injectable()
export class AwsS3Service {
  private readonly client: S3Client;
  constructor(private readonly prismaService: PrismaService) {
    this.client = new S3Client({
      region: AWS_S3_REGION,
      credentials: {
        accessKeyId: AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
      },
    });
  }
  validateImages(file: Upload) {
    const images = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!images.includes(file.mimetype))
      throw customException.INVALID_FILE_TYPE({
        cause: new Error(),
        description:
          'Restrict File Type to "image/jpeg", "image/png"  and ""image/jpg',
      });
  }

  async deleteImageToS3(
    url: string,
    folder: ImageUploadFolder,
  ): Promise<boolean> {
    const regex =
      folder == 'pets'
        ? /\/pets\/([a-f0-9-]+)\b/
        : folder == 'clinics'
        ? /\/clinics\/([a-f0-9-]+)\b/
        : /\/users\/([a-f0-9-]+)\b/;

    const [, id] = url.match(regex);

    const result = new DeleteObjectCommand({
      Bucket: AWS_S3_BUCKET_NAME,
      Key: `${folder}/${id}`,
    });
    const s3DeletedOutput = await this.client.send(result);
    return isDeleted(s3DeletedOutput);
  }

  async saveImageToS3(
    file: UploadType,
    folder: ImageUploadFolder,
    old_image_url?: string,
  ) {
    const { createReadStream, filename, mimetype } = await file;

    const blob = createReadStream(filename);
    const uuid = uuidv4();

    const client = this.client;

    const upload = new UploadSdk({
      client,
      params: {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: `${folder}/${uuid}`,
        ContentType: mimetype,
        Body: blob,
        ACL: 'public-read',
      },
    });

    const result = await upload.done();

    if (!isComplete(result)) return null;

    if (old_image_url) await this.deleteImageToS3(old_image_url, folder);

    return result.Location;
  }
}

function isComplete(
  output:
    | CompleteMultipartUploadCommandOutput
    | AbortMultipartUploadCommandOutput,
): output is CompleteMultipartUploadCommandOutput {
  return (output as CompleteMultipartUploadCommandOutput).ETag !== undefined;
}

function isDeleted(
  output: DeleteObjectCommandOutput,
): output is DeleteObjectCommandOutput {
  return (output as DeleteObjectCommandOutput).DeleteMarker !== false;
}
