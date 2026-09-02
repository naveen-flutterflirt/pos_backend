import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import * as path from 'path';

@Injectable()
export class UploadService {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION || 'ap-southeast-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const bucket = process.env.AWS_S3_BUCKET || 'flutterflirt-pos';
    const ext = path.extname(file.originalname);
    const filename = `${randomUUID()}${ext}`;
    const key = `${folder}/${filename}`;

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );

      return `https://${bucket}.s3.${process.env.AWS_REGION || 'ap-southeast-1'}.amazonaws.com/${key}`;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      throw new InternalServerErrorException('Failed to upload file');
    }
  }
}
