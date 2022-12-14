import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { UserContextType, IUser } from "../@types/user";
import axios from "axios";

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
    updated_at: "2020-01-01T00:00:00.000Z",
    profilePicture:
      "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    loggedIn: false,
  },
  logIn: (user) => {},
  signOut: (user) => {},
};

const UserContext = createContext<UserContextType>(userContextDefaultValues);

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
    updated_at: "2020-01-01T00:00:00.000Z",
    profilePicture:
      "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
    loggedIn: false,
  });
  // Seeded for testing purposes
  //1 - Marques Brownlee
  //5 - MrBeast
  //7 - iJustine
  //9 - Tina Rodriguez
  //8 - Erik Bryann (2 brand deals)
  // You will need to change the id to the user id you want to navigate with
  useEffect(() => {
    axios
      .get("http://localhost:8080/users/8")
      .then((response) => {
        setUser({ ...user, ...response.data });
      })
      .catch((error) => {
        console.log("There was an error retrieving this offer:", error);
      });
  }, []);

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
