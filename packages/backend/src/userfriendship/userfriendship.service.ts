import { Injectable } from '@nestjs/common';
import { CreateUserfriendshipDto } from './dto/create-userfriendship.dto';
import { UpdateUserfriendshipDto } from './dto/update-userfriendship.dto';

@Injectable()
export class UserfriendshipService {
  create(createUserfriendshipDto: CreateUserfriendshipDto) {
    return 'This action adds a new userfriendship';
  }

  findAll() {
    return `This action returns all userfriendship`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userfriendship`;
  }

  update(id: number, updateUserfriendshipDto: UpdateUserfriendshipDto) {
    return `This action updates a #${id} userfriendship`;
  }

  remove(id: number) {
    return `This action removes a #${id} userfriendship`;
  }
}
