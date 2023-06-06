import { Injectable } from '@nestjs/common';
import { CreateChatroommessageDto } from './dto/create-chatroommessage.dto';
import { UpdateChatroommessageDto } from './dto/update-chatroommessage.dto';

@Injectable()
export class ChatroommessageService {
  create(createChatroommessageDto: CreateChatroommessageDto) {
    return 'This action adds a new chatroommessage';
  }

  findAll() {
    return `This action returns all chatroommessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatroommessage`;
  }

  update(id: number, updateChatroommessageDto: UpdateChatroommessageDto) {
    return `This action updates a #${id} chatroommessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroommessage`;
  }
}
