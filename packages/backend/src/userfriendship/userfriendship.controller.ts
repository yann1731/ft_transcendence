import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserfriendshipService } from './userfriendship.service';
import { CreateUserfriendshipDto } from './dto/create-userfriendship.dto';
import { UpdateUserfriendshipDto } from './dto/update-userfriendship.dto';

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
    return this.userfriendshipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserfriendshipDto: UpdateUserfriendshipDto) {
    return this.userfriendshipService.update(+id, updateUserfriendshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userfriendshipService.remove(+id);
  }
}
