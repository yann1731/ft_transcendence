import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MatchHistoryService } from './match-history.service';
import { CreateMatchHistoryOneDto } from './dto/create-match-history.dto';
import { CreateMatchHistoryTwoDto } from './dto/create-match-history.dto';
import { CreateMatchHistoryThreeDto } from './dto/create-match-history.dto';
import { ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/guard/token.guard';

@Controller('api/match-history')
@ApiTags('match-history')
@UseGuards(TokenGuard)
export class MatchHistoryController {
  constructor(private readonly matchHistoryService: MatchHistoryService) {}

  @Post('/one')
  createOne(@Body() createMatchHistoryOneDto: CreateMatchHistoryOneDto) {
    try {
      return this.matchHistoryService.createOne(createMatchHistoryOneDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('/two')
  createTwo(@Body() createMatchHistoryTwoDto: CreateMatchHistoryTwoDto) {
    try {
      return this.matchHistoryService.createTwo(createMatchHistoryTwoDto);
    } catch (error) {
      throw error;
    }
  }

  @Post('/three')
  createThree(@Body() createMatchHistoryThreeDto: CreateMatchHistoryThreeDto) {
    try {
      return this.matchHistoryService.createThree(createMatchHistoryThreeDto);
    } catch (error) {
      throw error;
    }
  }

  @Get('/one')
  findAllOne() {
    try {
      return this.matchHistoryService.findAllOne();
    } catch (error) {
      throw error;
    }
  }

  @Get('/two')
  findAllTwo() {
    try {
      return this.matchHistoryService.findAllTwo();
    } catch (error) {
      throw error;
    }
  }

  @Get('/three')
  findAllThree() {
    try {
      return this.matchHistoryService.findAllThree();
    } catch (error) {
      throw error;
    }
  }

  @Get('/one/:userId')
  findAllOfOne(@Param('userId') userId: string) {
    try {
      return this.matchHistoryService.findAllOfOne(userId);
    } catch (error) {
      throw error;
    }
  }

  @Get('/two/:userId')
  findAllOfTwo(@Param('userId') userId: string) {
    try {
      return this.matchHistoryService.findAllOfTwo(userId);
    } catch (error) {
      throw error;
    }
  }

  @Get('/three/:userId')
  findAllOfThree(@Param('userId') userId: string) {
    try {
      return this.matchHistoryService.findAllOfThree(userId);
    } catch (error) {
      throw error;
    }
  }

  @Delete('one/:id')
  removeOne(@Param('id') id: string) {
    try {
      return this.matchHistoryService.removeOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Delete('two/:id')
  removeTwo(@Param('id') id: string) {
    try {
      return this.matchHistoryService.removeTwo(id);
    } catch (error) {
      throw error;
    }
  }

  @Delete('three/:id')
  removeThree(@Param('id') id: string) {
    try {
      return this.matchHistoryService.removeThree(id);
    } catch (error) {
      throw error;
    }
  }
}
