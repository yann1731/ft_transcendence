import { Injectable } from '@nestjs/common';
import { CreatePrivatemessageDto } from './dto/create-privatemessage.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrivatemessageService {
  constructor(private prisma: PrismaService) {}

  async create(createPrivatemessageDto: CreatePrivatemessageDto) {
    return 'This action adds a new privatemessage';
  }

  async findAll() {
    return `This action returns all privatemessage`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} privatemessage`;
  }

  async remove(id: string) {
    return `This action removes a #${id} privatemessage`;
  }
}
