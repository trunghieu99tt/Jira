import { Injectable } from '@nestjs/common';

@Injectable()
export class AttachmentService {
  constructor() {
    console.log('This is constructor');
  }
}
