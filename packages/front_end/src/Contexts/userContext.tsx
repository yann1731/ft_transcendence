import React, { createContext, useState, PropsWithChildren } from 'react';

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
}

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