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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userfriendshipService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userfriendshipService.remove(id);
  }
}
