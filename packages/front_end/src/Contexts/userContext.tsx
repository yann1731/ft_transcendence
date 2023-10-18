
import { createContext, useState, Dispatch, SetStateAction, ReactNode, useCallback, useEffect } from 'react';
import { ChatInUse, Chatroom, ChatroomMessage, ChatroomUser, PrivateMessage, UserBlocks, UserFriendship } from 'Components/Interfaces';
import myAxios from 'Components/axiosInstance';
import axios from 'axios';
import Cookies from 'universal-cookie';


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
  twoFaSecret: string | null;
	friendListA?: UserFriendship[] ;
	friendListB?: UserFriendship[] ;
	blockedUsers?: UserBlocks[] ;
	blockedBy?: UserBlocks[] ;
	chatrooms?: ChatroomUser[] ;
	sentMessages?: PrivateMessage[] ;
	receivedMessages?: PrivateMessage[] ;
	sentChatroomMessages?: ChatroomMessage[] ;
	Chatroom?: Chatroom[] ;
  chatInUse?: ChatInUse;
  isInvited: boolean;
  host: boolean;
  button: boolean;
}

export interface MatchHistoryOne {
  id: string;
  winnerId: string;
  winnerScore: number;
  loserId: string;
  loserScore: number;
  createdAt: string;
}

export interface MatchHistoryTwo {
  id: string;
  winnerId: string[];
  winnerScore: number;
  loserId: string[];
  loserScore: number;

  createdAt: string;
}

export interface MatchHistoryThree {
  id: string;
  winnerId: string[];
  winnerScore: number;
  loserId: string[];
  loserScore: number;
  createdAt: string;
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

  
type UserProviderProps = {
  children: ReactNode;
};

const cookies = new Cookies()

export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
      const getUser = async () => {
        const id = sessionStorage.getItem('id');
  
        try {
          const tokens = await axios.get(`/api/refresh/${id}`, {});
          sessionStorage.setItem("at", tokens.data.access);
  
          const user = await myAxios.get(`/api/user/me/${id}`, {
            headers: {
              Authorization: tokens.data.access,
              userId: id
            }
          });
          setUser(user.data);
        } catch (error) {
          setUser(null);
        }
      };
  
      getUser();
    }, []);

    
  const updateUser = useCallback((newUserData: Partial<User>) => {
    setUser((prevUser: User | null) => {
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
    if (user)
      myAxios.patch(`/api/user/${user.id}`, {
        data: { ...user},
        headers: {
            Authorization: sessionStorage.getItem("at"),
            userId: user.id
        }
        
      })
  }, []);

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