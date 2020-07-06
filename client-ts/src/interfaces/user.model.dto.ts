export interface UserDTO {
  _id: number;
  username: string;
  name: string;
  providerId: string;
  image: string;
}

export interface UserFindDTO {
  providerId: string;
}

export interface UserCreateDTO {
  username: string;
  name: string;
  providerId: string;
  image: string;
}

export interface UserConnectDTO {
  _id: number;
  username: string;
  image: string;
}
