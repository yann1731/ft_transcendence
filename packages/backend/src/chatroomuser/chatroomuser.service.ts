import { Injectable } from '@nestjs/common';
import { CreateChatroomuserDto } from './dto/create-chatroomuser.dto';
import { UpdateChatroomuserDto } from './dto/update-chatroomuser.dto';

@Injectable()
export class ChatroomuserService {
  create(createChatroomuserDto: CreateChatroomuserDto) {
    return 'This action adds a new chatroomuser';
  }

  findAll() {
    return `This action returns all chatroomuser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatroomuser`;
  }

  update(id: number, updateChatroomuserDto: UpdateChatroomuserDto) {
    return `This action updates a #${id} chatroomuser`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatroomuser`;
  }
}
