import "server-only";
import apiClient from "../api-client";
import { QuestionT } from "@/types/question";


export const getQuestions = async () => {
    const API_PATH = "/questions";
    const response = await apiClient.askAdminAPI.get(API_PATH);
    console.log('getQuestions: ', response);
    return response as QuestionT[];
}
