import { Injectable } from '@nestjs/common';
import { CreateUserblockDto } from './dto/create-userblock.dto';
import { UpdateUserblockDto } from './dto/update-userblock.dto';

@Injectable()
export class UserblocksService {
  create(createUserblockDto: CreateUserblockDto) {
    return 'This action adds a new userblock';
  }

  findAll() {
    return `This action returns all userblocks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userblock`;
  }

  update(id: number, updateUserblockDto: UpdateUserblockDto) {
    return `This action updates a #${id} userblock`;
  }

  remove(id: number) {
    return `This action removes a #${id} userblock`;
  }
}
