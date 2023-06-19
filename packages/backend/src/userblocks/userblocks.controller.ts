import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserblocksService } from './userblocks.service';
import { CreateUserblockDto } from './dto/create-userblock.dto';

@Controller('userblocks')
export class UserblocksController {
  constructor(private readonly userblocksService: UserblocksService) {}

  @Post()
  create(@Body() createUserblockDto: CreateUserblockDto) {
    return this.userblocksService.create(createUserblockDto);
  }

  @Get()
  findAll() {
    return this.userblocksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userblocksService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userblocksService.remove(id);
  }
}
