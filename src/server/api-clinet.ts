import 'server-only';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

/**
 * Axios client for making requests to the Airtable APIs.
 *
 */
class APIClient {
    private logger = console;
    private readonly API_URL = process.env.API_URL;

    private askAdminBackendApp: AxiosInstance;

    constructor() {
        this.logger.debug('Creating APIClient instance');
        if (!this.API_URL) {
            throw new Error(
                'API_URL is not defined. API_URL: ' +
                process.env.API_URL
            );
        }

        this.askAdminBackendApp = axios.create({
            baseURL: this.API_URL,
            timeout: 30000,
        });


        this.setupInterceptors(this.askAdminBackendApp);

    }

    private setupInterceptors(instance: AxiosInstance) {
        // Add a request interceptor to include the id_token in every request
        instance.interceptors.request.use(
            async (config) => {
                const session = await getServerSession(authOptions);

                if (session === null) {
                    throw new Error('Unauthorized');
                }

                const jwtToken = session.id_token;
                // Add authorization token if available
                const idToken = jwtToken as string;
                if (idToken) {
                    config.headers.Authorization = `Bearer ${idToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error) // Handle request error
        );

        // Add a response interceptor to handle authentication errors
        instance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.status === 401) {
                    // Handle unauthorized error, e.g., redirect to login page
                    console.error('Unauthorized');
                    redirect('/auth/signin');
                }
                if (error.response.status === 429) {
                    console.error('Too many requests');
                    return Promise.reject(error);
                }
                return Promise.reject(error);
            }
        );
    }

    public get<T>(
        instance: AxiosInstance,
        path: string,
        config?: AxiosRequestConfig
    ): Promise<T> {
        this.logger.log('🟩 GET: ', instance.defaults.baseURL + path);
        return instance.get(path, config).then((response) => response.data);
    }

    public post<T>(
        instance: AxiosInstance,
        path: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        console.log('🟦 POST: ', instance.defaults.baseURL + path);
        this.logger.debug(data);
        return instance.post(path, data, config).then((response) => response.data);
    }

    public put<T>(
        instance: AxiosInstance,
        path: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        this.logger.log('🔷 PUT: ', instance.defaults.baseURL + path);
        this.logger.debug(data);
        return instance.put(path, data, config).then((response) => response.data);
    }

    public patch<T>(
        instance: AxiosInstance,
        path: string,
        data?: unknown,
        config?: AxiosRequestConfig
    ): Promise<T> {
        this.logger.log('🔷 PATCH: ', instance.defaults.baseURL + path);
        this.logger.debug(data);
        return instance.patch(path, data, config).then((response) => response.data);
    }

    public delete<T>(
        instance: AxiosInstance,
        path: string,
        config?: AxiosRequestConfig
    ): Promise<T> {
        this.logger.log('🟥 DEL: ', instance.defaults.baseURL + path);
        return instance.delete(path, config).then((response) => response.data);
    }

    private createClientForInstance<T>(instance: AxiosInstance) {
        return {
            get: (url: string, config?: AxiosRequestConfig): Promise<T> =>
                this.get(instance, url, config),
            post: (
                url: string,
                data?: unknown,
                config?: AxiosRequestConfig
            ): Promise<T> => this.post(instance, url, data, config),
            put: (url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
                this.put(instance, url, data, config),
            patch: (
                url: string,
                data?: unknown,
                config?: AxiosRequestConfig
            ): Promise<T> => this.patch(instance, url, data, config),
            delete: (url: string, config?: AxiosRequestConfig): Promise<T> =>
                this.delete(instance, url, config),
        };
    }

    public get askAdminAPI() {
        return this.createClientForInstance(this.askAdminBackendApp);
    }

}
const apiClient = new APIClient();
export default apiClient;
