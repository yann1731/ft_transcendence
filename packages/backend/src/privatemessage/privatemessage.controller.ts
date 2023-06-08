import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrivatemessageService } from './privatemessage.service';
import { CreatePrivatemessageDto } from './dto/create-privatemessage.dto';
import { UpdatePrivatemessageDto } from './dto/update-privatemessage.dto';

@Controller('privatemessage')
export class PrivatemessageController {
  constructor(private readonly privatemessageService: PrivatemessageService) {}

  @Post()
  create(@Body() createPrivatemessageDto: CreatePrivatemessageDto) {
    return this.privatemessageService.create(createPrivatemessageDto);
  }

  @Get()
  findAll() {
    return this.privatemessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.privatemessageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrivatemessageDto: UpdatePrivatemessageDto) {
    return this.privatemessageService.update(+id, updatePrivatemessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.privatemessageService.remove(+id);
  }
}
