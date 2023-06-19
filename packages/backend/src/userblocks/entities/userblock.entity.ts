import {User} from '../../user/entities/user.entity'

export class UserBlocks {
	blockerId: string ;
	blocker?: User ;
	blockedUserId: string ;
	blockedUser?: User ;
	id: string ;
}