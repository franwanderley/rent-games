import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class UploadService {
  private clientId: string = '864cda37e15513e';

  async validateImg(file: Express.Multer.File) {
    const extImages = ['png', 'jpeg', 'jpg', 'gif', 'webp'];
    const extension = file.originalname.slice(
      ((file.originalname.lastIndexOf('.') - 1) >>> 0) + 2,
    );

    if (!extImages.includes(extension) || file.size > 100000) {
      throw new BadRequestException('Aceito somente imagens menor que 100 kb');
    }
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    this.validateImg(file);
    const formData = new FormData();
    formData.append('image', file.buffer, {
      filename: file.originalname,
    });

    const response = await axios({
      method: 'post',
      url: 'https://api.imgur.com/3/image',
      data: formData,
      headers: {
        Authorization: `Client-ID ${this.clientId}`,
        ...formData.getHeaders(),
      },
    });

    return response.data.data.link;
  }
}
