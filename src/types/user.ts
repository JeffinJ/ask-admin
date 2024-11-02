export interface AirTUser {
    id: string;
    name: string;
    email: string;
    userId?: string;
    profilePhoto?: {
        url: string;
        width: number;
        height: number;
    }
}

export interface CreateUser {
    userName: string;
    email: string;
}