import { Injectable } from '@nestjs/common';
import { CreateChatroomDto } from './dto/create-chatroom.dto';
import { UpdateChatroomDto } from './dto/update-chatroom.dto';
import { Chatroom } from './entities/chatroom.entity';

@Injectable()
export class ChatroomService {
  async create(createChatroomDto: CreateChatroomDto) {
    const chatroom = this.prisma
    return await ;
  }

  async findAll() {
    return await `This action returns all chatroom`;
  }

  async findOne(id: number) {
    return await `This action returns a #${id} chatroom`;
  }

  async update(id: number, updateChatroomDto: UpdateChatroomDto) {
    return await `This action updates a #${id} chatroom`;
  }

  async remove(id: number) {
    return await `This action removes a #${id} chatroom`;
  }
}
