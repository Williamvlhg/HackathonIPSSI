import { Skill } from './skill'

export type Site = {
  id: number;
  name: string;
  address: string;
  startDate: string;
  endDate: string;
  skills: Skill[];
  workers: Worker[];
};
