import { Injectable } from '@nestjs/common';
import {
  AbortMultipartUploadCommandOutput,
  CompleteMultipartUploadCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload as UploadSdk } from '@aws-sdk/lib-storage';
import * as Upload from 'graphql-upload/Upload.js';
import * as UploadType from 'graphql-upload/Upload.js';
import { customException } from '@/global/constant/constants';
import { v4 as uuidv4 } from 'uuid';
const {
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY,
  AWS_S3_REGION,
  AWS_S3_BUCKET_NAME,
} = process.env;

@Injectable()
export class AwsS3Service {
  validateImages(file: Upload) {
    const images = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!images.includes(file.mimetype))
      throw customException.INVALID_FILE_TYPE();
  }

  async savePetImageToS3(file: UploadType) {
    const { createReadStream, filename, mimetype } = await file;

    const client = new S3Client({
      region: AWS_S3_REGION,
      credentials: {
        accessKeyId: AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
      },
    });

    const blob = createReadStream(filename);
    const uuid = uuidv4();

    const upload = new UploadSdk({
      client,
      params: {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: `pets/${uuid}`,
        ContentType: mimetype,
        Body: blob,
        ACL: 'public-read',
      },
    });

    const result = await upload.done();

    if (isComplete(result)) {
      return result.Location;
    }
  }
}

function isComplete(
  output:
    | CompleteMultipartUploadCommandOutput
    | AbortMultipartUploadCommandOutput,
): output is CompleteMultipartUploadCommandOutput {
  return (output as CompleteMultipartUploadCommandOutput).ETag !== undefined;
}
