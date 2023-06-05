import { Injectable } from '@nestjs/common';
import { CreateUserrelationDto } from './dto/create-userrelation.dto';
import { UpdateUserrelationDto } from './dto/update-userrelation.dto';

@Injectable()
export class UserrelationService {
  create(createUserrelationDto: CreateUserrelationDto) {
    return 'This action adds a new userrelation';
  }

  findAll() {
    return `This action returns all userrelation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userrelation`;
  }

  update(id: number, updateUserrelationDto: UpdateUserrelationDto) {
    return `This action updates a #${id} userrelation`;
  }

  remove(id: number) {
    return `This action removes a #${id} userrelation`;
  }
}
