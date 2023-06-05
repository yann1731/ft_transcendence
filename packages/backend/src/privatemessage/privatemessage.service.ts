import { Injectable } from '@nestjs/common';
import { CreatePrivatemessageDto } from './dto/create-privatemessage.dto';
import { UpdatePrivatemessageDto } from './dto/update-privatemessage.dto';

@Injectable()
export class PrivatemessageService {
  create(createPrivatemessageDto: CreatePrivatemessageDto) {
    return 'This action adds a new privatemessage';
  }

  findAll() {
    return `This action returns all privatemessage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} privatemessage`;
  }

  update(id: number, updatePrivatemessageDto: UpdatePrivatemessageDto) {
    return `This action updates a #${id} privatemessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} privatemessage`;
  }
}
