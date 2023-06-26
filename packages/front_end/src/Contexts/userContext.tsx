/* import React, { createContext, useState, PropsWithChildren, Dispatch, SetStateAction, ReactNode } from 'react';
//REGLER USER CONTEXT!!!!
export type User = {
  avatar: string;
  username: string;
  email: string;
  win: number;
  loss: number;
  gamesPlayed: number;
  userStatus: boolean;
  twoFaEnabled: boolean;
  id: string;
};

export interface UserContextInterface {
  user: User,
  setUser: Dispatch<SetStateAction<User>>
}

const defaultState = {
  user: {
    avatar: '',
    username: '',
    email: '',
    win: 0,
    loss: 0,
    gamesPlayed: 0,
    userStatus: true,
    twoFaEnabled: false,
    id: ''
  },
  setUser: (user: User) => {}
} as UserContextInterface

export const UserContext = createContext<Partial<UserContextInterface>>(defaultState);

type UserPoviderProps = {
  children: ReactNode
}

export default function UserProvider({children} : UserPoviderProps)
{
  const [user, setUser] = useState<User>({
    avatar: '',
    username: '',
    email: '',
    win: 0,
    loss: 0,
    gamesPlayed: 0,
    userStatus: true,
    twoFaEnabled: false,
    id: ''
  });
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
    {children}
    </UserContext.Provider>
    )
  }; */
  /* import React, { createContext, useState, PropsWithChildren } from 'react';
  //REGLER USER CONTEXT!!!!
  export type User = {
    avatar: string;
    username: string;
    email: string;
    win: number;
    loss: number;
    gamesPlayed: number;
    userStatus: boolean;
    twoFaEnabled: boolean;
    id: string;
  };
  
  export interface UserContextProps {
    user: User | null;
    setUser: (user: User) => void;
    updateUser: () => Promise<void>;
  }
  
  export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => null,
    updateUser: async () => {},
  });
  
  export const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    
    const updateUser = async () => {
      try {
        const response = await fetch('http://localhost:4242/user/' + user?.id);
        if (response)
        {
          const updateUser = await response.json();
          setUser(updateUser);
        }
        else
        {
          console.log('Could not fetch user');
        }
      }
      catch (err)
      {
        console.log(err);
      }
      alert(user?.username);
    }
    
    const value = {
      user,
      setUser,
      updateUser,
    };
    return (
      <UserContext.Provider value={value}>
      {children}
      </UserContext.Provider>
      );
    }; */
    
    //export default UserProvider;
    /* import React, { createContext, useState, PropsWithChildren } from 'react';
    //REGLER USER CONTEXT!!!!
    export type User = {
      avatar: string;
      username: string;
      email: string;
      win: number;
      loss: number;
      gamesPlayed: number;
      userStatus: boolean;
      twoFaEnabled: boolean;
      id: string;
    };
    
    interface UserContextProps {
      user: User | null;
      setUser: (user: User | null) => void;
      updateUser: (updatedUser: Partial<User>) => void;
    }
    
    export const UserContext = createContext<UserContextProps>({
      user: null,
      setUser: () => {},
      updateUser: () => {},
    });
    
    export const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
      const [user, setUser] = useState<User | null>(null);
      
      const updateUser = (updatedUser: Partial<User>) => {
        if (user) {
          setUser({ ...user, ...updatedUser });
        }
      };
      
      return (
        <UserContext.Provider value={{ user, setUser, updateUser }}>
        {children}
        </UserContext.Provider>
        );
      };
      
      export default UserProvider; */
      import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useCallback, useEffect } from 'react';

      export interface User {
        avatar: string;
        username: string;
        email: string;
        win: number;
        loss: number;
        gamesPlayed: number;
        userStatus: boolean;
        twoFaEnabled: boolean;
        id: string;
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
      
      const defaultState = {
        user: {
          avatar: '',
          username: '',
          email: '',
          win: 0,
          loss: 0,
          gamesPlayed: 0,
          userStatus: true,
          twoFaEnabled: false,
          id: ''
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
      alert(user?.username);
        return (
          <UserContext.Provider value={userContextValue}>
            {children}
          </UserContext.Provider>
        );
      }