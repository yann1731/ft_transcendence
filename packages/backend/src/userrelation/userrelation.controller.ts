import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserrelationService } from './userrelation.service';
import { CreateUserrelationDto } from './dto/create-userrelation.dto';
import { UpdateUserrelationDto } from './dto/update-userrelation.dto';

@Controller('userrelation')
export class UserrelationController {
  constructor(private readonly userrelationService: UserrelationService) {}

  @Post()
  create(@Body() createUserrelationDto: CreateUserrelationDto) {
    return this.userrelationService.create(createUserrelationDto);
  }

  @Get()
  findAll() {
    return this.userrelationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userrelationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserrelationDto: UpdateUserrelationDto) {
    return this.userrelationService.update(+id, updateUserrelationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userrelationService.remove(+id);
  }
}
