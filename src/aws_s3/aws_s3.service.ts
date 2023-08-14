import { Injectable } from '@nestjs/common';
import {
  AbortMultipartUploadCommandOutput,
  CompleteMultipartUploadCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import * as UploadType from 'graphql-upload/Upload.js';

const {
  AWS_S3_ACCESS_KEY_ID,
  AWS_S3_SECRET_ACCESS_KEY,
  AWS_S3_REGION,
  AWS_S3_BUCKET_NAME,
} = process.env;

@Injectable()
export class AwsS3Service {
  async savePetImageToS3(file: UploadType) {
    console.log(file);
    const { createReadStream, filename, mimetype } = await file;

    const client = new S3Client({
      region: AWS_S3_REGION,
      credentials: {
        accessKeyId: AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
      },
    });

    const blob = createReadStream(filename);

    const upload = new Upload({
      client,
      params: {
        Bucket: AWS_S3_BUCKET_NAME,
        Key: `pets/${filename}`,
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
