import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserfriendshipService } from './userfriendship.service';
import { CreateUserfriendshipDto } from './dto/create-userfriendship.dto';

@Controller('userfriendship')
export class UserfriendshipController {
  constructor(private readonly userfriendshipService: UserfriendshipService) {}

  @Post()
  create(@Body() createUserfriendshipDto: CreateUserfriendshipDto) {
    return this.userfriendshipService.create(createUserfriendshipDto);
  }

  @Get()
  findAll() {
    return this.userfriendshipService.findAll();
  }

  @Get(':userAId/:userBId')
  findOne(@Param() params: { userAId: string, userBId: string}) {
    return this.userfriendshipService.findOne(params.userAId, params.userBId);
  }

  @Delete(':userAId/:userBId')
  remove(@Param() params: { userAId: string, userBId: string}) {
    return this.userfriendshipService.remove(params.userAId, params.userBId);
  }
}
