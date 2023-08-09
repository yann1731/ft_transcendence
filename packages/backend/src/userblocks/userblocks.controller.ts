import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserblocksService } from './userblocks.service';
import { CreateUserblockDto } from './dto/create-userblock.dto';
import { TokenGuard } from 'src/guard/token.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('userblocks')
@ApiTags('userblocks')
// @UseGuards(TokenGuard)
export class UserblocksController {
  constructor(private readonly userblocksService: UserblocksService) {}

  @Post() //create userblock relation based on the infos within createUserblockDto
  create(@Body() createUserblockDto: CreateUserblockDto) {
    return this.userblocksService.create(createUserblockDto);
  }

  @Get() //returns all userblockrelations
  findAll() {
    return this.userblocksService.findAll();
  }

  @Get(':id') //returns a single userblock relation by id
  findOne(@Param('id') id: string) {
    return this.userblocksService.findOne(id);
  }

  @Delete(':id') //deletes a single userblock relation by id
  remove(@Param('id') id: string) {
    return this.userblocksService.remove(id);
  }
}
