import { PartialType } from '@nestjs/mapped-types';
import { CreatePrivatemessageDto } from './create-privatemessage.dto';

export class UpdatePrivatemessageDto extends PartialType(CreatePrivatemessageDto) {}
