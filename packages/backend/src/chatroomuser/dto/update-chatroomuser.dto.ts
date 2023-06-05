import { PartialType } from '@nestjs/mapped-types';
import { CreateChatroomuserDto } from './create-chatroomuser.dto';

export class UpdateChatroomuserDto extends PartialType(CreateChatroomuserDto) {}
