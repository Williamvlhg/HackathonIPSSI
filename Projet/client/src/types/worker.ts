import { Skill } from "./skill";
import { User } from "./user";

export type WorkerType = {
  id: number;
  user: User;
  skills: Skill[];
};
