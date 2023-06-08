import {User} from '../../user/entities/user.entity'

export class UserFriendship {
	userAId: string ;
	userA?: User ;
	userBId: string ;
	userB?: User ;
	id: string ;
}