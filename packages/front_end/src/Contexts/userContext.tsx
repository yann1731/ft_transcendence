
import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useCallback, useEffect } from 'react';
import { ChatInUse, Chatroom, ChatroomMessage, ChatroomUser, PrivateMessage, UserBlocks, UserFriendship } from 'Components/Interfaces';

export interface User {
  id: string ;
  avatar: string;
  username: string;
  nickname: string;
  email: string;
  win: number;
  loss: number;
  gamesPlayed: number;
  userStatus: boolean;
  twoFaEnabled: boolean;
  token: string;
  token_created_at: number;
  token_expires_at: number;
	friendListA?: UserFriendship[] ;
	friendListB?: UserFriendship[] ;
	blockedUsers?: UserBlocks[] ;
	blockedBy?: UserBlocks[] ;
	chatrooms?: ChatroomUser[] ;
	sentMessages?: PrivateMessage[] ;
	receivedMessages?: PrivateMessage[] ;
	sentChatroomMessages?: ChatroomMessage[] ;
	Chatroom?: Chatroom[] ;
	refresh_token?: string;
  chatInUse?: Chatroom;
}

export interface UserContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  updateUser: (newUserData: Partial<User>) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  updateUser: () => {}
});
// Faire un api get pour mettre les default settings à jour avec la DB
const defaultState = {
  user: {
    avatar: '',
    nickname: '',
    username: '',
    email: '',
    win: 0,
    loss: 0,
    gamesPlayed: 0,
    userStatus: true,
    twoFaEnabled: false,
    id: '',
  },
  setUser: (user: User | null) => {},
  updateUser: (newUserData: Partial<User>) => {}
} as UserContextType;
  
type UserProviderProps = {
  children: ReactNode;
};
  
export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  
  const updateUser = useCallback((newUserData: Partial<User>) => {
    setUser((prevUser) => {
      if (prevUser === null) {
        return null;
      }
      return {
        ...prevUser,
        ...newUserData
      };
    });
  }, []);
  
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const userContextValue: UserContextType = {
    user,
    setUser,
    updateUser
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}