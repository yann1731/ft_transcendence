import { PartialType } from '@nestjs/mapped-types';
import { CreateUserfriendshipDto } from './create-userfriendship.dto';

export class UpdateUserfriendshipDto extends PartialType(CreateUserfriendshipDto) {}
