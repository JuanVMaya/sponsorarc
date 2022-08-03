import { createContext, useState, ReactNode, useContext } from "react";
import { UserContextType, IUser } from "../@types/user";

const userContextDefaultValues: UserContextType = {
  user: {
    id: 1,
    first_name: "Marques",
    last_name: "Brownlee",
    description:
      "MKBHD: Quality Tech Videos | YouTuber | Geek | Consumer Electronics | Tech Head | Internet Personality!",
    represent: "Creator",
    industry: "Technology",
    username: "marquesbrownlee",
    company_name: null,
    channel_name: "Marques Brownlee",
    email: "marques@MKBHD.com",
    location: "United States",
    subscriber_count: "15.9M",
    loggedIn: false,
  },
  logIn: (user) => {},
  signOut: (user) => {},
};

const UserContext = createContext<UserContextType >( //Might need to add | null later
  userContextDefaultValues
);

export function useUser() {
  return useContext(UserContext);
}

type Props = {
  children?: ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser>({
    id: 1,
    first_name: "Marques",
    last_name: "Brownlee",
    description:
      "MKBHD: Quality Tech Videos | YouTuber | Geek | Consumer Electronics | Tech Head | Internet Personality!",
    represent: "Creator",
    industry: "Technology",
    username: "marquesbrownlee",
    company_name: null,
    channel_name: "Marques Brownlee",
    email: "marques@MKBHD.com",
    location: "United States",
    subscriber_count: "1.59M",
    loggedIn: false,
  });
  const logIn = (user: IUser) => {
    setUser({ ...user, loggedIn: true });
  };
  const signOut = (user: IUser) => {
    setUser({ ...user, loggedIn: false });
  };
  return (
    <UserContext.Provider value={{ user, logIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
