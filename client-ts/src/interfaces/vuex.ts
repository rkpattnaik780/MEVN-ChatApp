import { UserDTO } from "@/interfaces/user.model.dto";

export interface UserStateI {
  userDetails: UserDTO | null;
}

export type UserDetails = UserDTO | null;
