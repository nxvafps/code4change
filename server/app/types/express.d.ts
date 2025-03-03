import { User as UserModel } from "./table-data-types";

declare global {
  namespace Express {
    interface User extends UserModel {}
  }
}
