import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserfriendshipService } from './userfriendship.service';
import { CreateUserfriendshipDto } from './dto/create-userfriendship.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/userfriendship')
@ApiTags('userfriendship')
@UseGuards(TokenGuard)
export class UserfriendshipController {
  constructor(private readonly userfriendshipService: UserfriendshipService) {}

  @Post() //creates new userfriendship using the information contained within createUserfriendshipDto
  create(@Body() createUserfriendshipDto: CreateUserfriendshipDto) {
    try {
      return this.userfriendshipService.create(createUserfriendshipDto);
    } catch (error) {
      throw error;
    }
  }

  @Get() //returns all userfriendship relations
  findAll() {
    try {
      return this.userfriendshipService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('user/:id')
  findAllUF(@Param('id') id: string) { //returns all userfriendships associated with id
    try {
      return this.userfriendshipService.findAllUF(id);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id') //returns single userfriendship relation by id
  findOne(@Param('id') id: string) {
    try {
      return this.userfriendshipService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id') //delete single userfriendship relation by id
  remove(@Param('id') id: string) {
    try {
      return this.userfriendshipService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
