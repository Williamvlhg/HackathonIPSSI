import { Skill } from "./skill";

export type Site = {
  id: string;
  name: string;
  address: string;
  startDate: string;
  endDate: string;
  skills: Skill[];
};
