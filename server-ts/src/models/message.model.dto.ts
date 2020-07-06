export interface MessageCreateDTO {
    message: string;
    providerId: number;
    time: number;
}

export interface UserMessageDTO {
    _id: string;
    message: number;
    time: number;
    username: string;
    image: string;
    name: string;
}