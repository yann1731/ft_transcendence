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

  @Get(':blockerId/:blockedUserId')
  findOne(@Param() params: {blockerId: string, blockedUserId: string}) {
    return this.userblocksService.findOne(params.blockerId, params.blockedUserId);
  }

  @Delete(':blockerId/:blockedUserId')
  remove(@Param() params: {blockerId: string, blockedUserId: string}) {
    return this.userblocksService.remove(params.blockerId, params.blockedUserId);
  }
}
