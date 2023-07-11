import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserfriendshipService } from './userfriendship.service';
import { CreateUserfriendshipDto } from './dto/create-userfriendship.dto';

@Controller('userfriendship')
export class UserfriendshipController {
  constructor(private readonly userfriendshipService: UserfriendshipService) {}

  @Post() //creates new userfriendship using the information contained within createUserfriendshipDto
  create(@Body() createUserfriendshipDto: CreateUserfriendshipDto) {
    return this.userfriendshipService.create(createUserfriendshipDto);
  }

  @Get() //returns all userfriendship relations
  findAll() {
    return this.userfriendshipService.findAll();
  }

  @Get('user/:id')
  findAllUF(@Param('id') id: string) { //returns all userfriendships associated with id
    return this.userfriendshipService.findAllUF(id);
  }

  @Get(':id') //returns single userfriendship relation by id
  findOne(@Param('id') id: string) {
    return this.userfriendshipService.findOne(id);
  }

  @Delete(':id') //delete single userfriendship relation by id
  remove(@Param('id') id: string) {
    return this.userfriendshipService.remove(id);
  }
}
