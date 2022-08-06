// @types.user.ts
export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  description: string;
  represent: string;
  industry: string;
  username: string;
  company_name: string | null;
  channel_name: string | null;
  email: string;
  location: string;
  updated_at: string;
  creatorStartDate?: string;
  subscriberCount?: string;
  totalViews?: string;
  videoCount?: string;
  brandDeals?: [{
    id: number;
    title: string;
    description: string;
    subject: string;
    pay: number;
    user_id: number;
    updated_at: string;
    timeframe: string;
    social_networks: string;
  }

  ];
  featuredVideos?: [
    {
      title?: string;
      viewCount?: string;
      likeCount?: string;
      id?: string;
    }
  ];
  profilePicture: string;
  loggedIn: boolean;
}
export type UserContextType = {
  user: IUser;
  logIn: (user: IUser) => void;
  signOut: (user: IUser) => void;
};
