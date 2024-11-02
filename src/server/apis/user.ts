import { CreateUser, AirTUser } from "@/types/user";
import apiClient from "../api-client";

export const createUser = async (data: CreateUser) => {
    try {
        const newUser = await apiClient.askAdminAPI.post('/users', data);
        console.log('createUser: ', newUser);
        return newUser as AirTUser;
        
    } catch (error) {
        console.error('createUser error:', error);
        throw new Error(`createUser error: ${error}`);
    }
};