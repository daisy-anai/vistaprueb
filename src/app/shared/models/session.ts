import { User } from "./user";

export class Session {
  token: String;
  user: User;
  expire: Date;
}
