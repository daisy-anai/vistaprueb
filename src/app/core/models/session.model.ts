import { User } from "./user.model";

export class Session {
  public token: String;
  public user: User;
  public expire: Date;
}
