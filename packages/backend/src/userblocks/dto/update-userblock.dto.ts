import { PartialType } from '@nestjs/mapped-types';
import { CreateUserblockDto } from './create-userblock.dto';

export class UpdateUserblockDto extends PartialType(CreateUserblockDto) {}
