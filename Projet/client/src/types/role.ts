import { User } from "./user";

export type Role = {
  label: string;
  id: number;
  user: User[];
};
