import { User } from "./user";

export interface Session {
  token: String;
  user: User;
  expire: Date;
}
