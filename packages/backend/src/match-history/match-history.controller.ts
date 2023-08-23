import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatchHistoryService } from './match-history.service';
import { CreateMatchHistoryOneDto } from './dto/create-match-history.dto';
import { CreateMatchHistoryTwoDto } from './dto/create-match-history.dto';
import { CreateMatchHistoryThreeDto } from './dto/create-match-history.dto';

@Controller('match-history')
export class MatchHistoryController {
  constructor(private readonly matchHistoryService: MatchHistoryService) {}

  @Post('/one')
  createOne(@Body() createMatchHistoryOneDto: CreateMatchHistoryOneDto) {
    return this.matchHistoryService.createOne(createMatchHistoryOneDto);
  }

  @Post('/two')
  createTwo(@Body() createMatchHistoryTwoDto: CreateMatchHistoryTwoDto) {
    return this.matchHistoryService.createTwo(createMatchHistoryTwoDto);
  }

  @Post('/three')
  createThree(@Body() createMatchHistoryThreeDto: CreateMatchHistoryThreeDto) {
    return this.matchHistoryService.createThree(createMatchHistoryThreeDto);
  }

  @Get('/one')
  findAllOne() {
    return this.matchHistoryService.findAllOne();
  }

  @Get('/two')
  findAllTwo() {
    return this.matchHistoryService.findAllTwo();
  }

  @Get('/three')
  findAllThree() {
    return this.matchHistoryService.findAllThree();
  }

  @Get('/one/:userId')
  findAllOfOne(@Param('userId') userId: string) {
    return this.matchHistoryService.findAllOfOne(userId);
  }

  @Get('/two/:userId')
  findAllOfTwo(@Param('userId') userId: string) {
    return this.matchHistoryService.findAllOfTwo(userId);
  }

  @Get('/three/:userId')
  findAllOfThree(@Param('userId') userId: string) {
    return this.matchHistoryService.findAllOfThree(userId);
  }

  @Delete('one/:id')
  removeOne(@Param('id') id: string) {
    return this.matchHistoryService.removeOne(id);
  }

  @Delete('two/:id')
  removeTwo(@Param('id') id: string) {
    return this.matchHistoryService.removeTwo(id);
  }

  @Delete('three/:id')
  removeThree(@Param('id') id: string) {
    return this.matchHistoryService.removeThree(id);
  }
}
