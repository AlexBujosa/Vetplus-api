import { Injectable } from '@nestjs/common';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

@Injectable()
export class AwsS3Service {
  async savePetImageToS3(file: Express.Multer.File) {
    const blob = Buffer.from(file.buffer);

    const uploadedImage = await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: file.filename,
        Body: blob,
      })
      .promise();

    const { Location } = uploadedImage;

    return Location;
  }
}
