import { PartialType } from '@nestjs/mapped-types';
import { CreateChatroommessageDto } from './create-chatroommessage.dto';

export class UpdateChatroommessageDto extends PartialType(CreateChatroommessageDto) {}
