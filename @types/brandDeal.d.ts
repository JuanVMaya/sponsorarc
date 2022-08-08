import { IDeliverable } from "./deliverable";
// @types.brandDeal.ts
export interface IBrandDeal {
  id: number;
  title: string;
  description: string;
  subject: string;
  pay: number;
  user_id: number;
  updated_at: string;
  timeframe: string;
  social_networks: string;
  completed: number;
  active_creator_id: number;
  users_id: number;
  deliverables?: [ deliverable: IDeliverable ];
  first_name?: string;
  last_name?: string;
  email?: string;
  location?: string;
  industry?: string;
  company_name?: string;
  channel_name?: string;
}
