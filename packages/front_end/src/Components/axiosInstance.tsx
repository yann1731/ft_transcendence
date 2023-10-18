import axios, {AxiosError, AxiosHeaders, AxiosInstance, AxiosResponse, ResponseType} from 'axios';
import jwt_decode from 'jwt-decode'

const myAxios: AxiosInstance  = axios.create({})
let isRefreshing: boolean = false;
let requestQueue: ((token: string) => void)[] = [];

const refresh = async (id: string) => {

	if (!isRefreshing){
		isRefreshing = true
		await axios.get(`/api/refresh/${id}`, {}).then((response: AxiosResponse) => {
			sessionStorage.setItem("at", response.data.access)
			isRefreshing = false;

			requestQueue.forEach(callback => callback(response.data.access));
			requestQueue = [];
		}).catch((error: any) => {
			alert("Could not refresh token, please login again");
			isRefreshing = false;
			window.location.assign('/')
			return Promise.reject(error);
		})
	}
	else{
		return new Promise<string>((resolve) => {
			requestQueue.push((token) => {
				resolve(token);
			});
		});
	}
}

myAxios.interceptors.request.use(
	(config: any) => {
		try {
			let raw: any;
			try {
				raw = jwt_decode(config.headers['Authorization'])
			} catch (error) {
				raw = "fuck"
			}
			const id: string = config.headers['userId']

			if (raw === 'fuck') {
				refresh(id).then(() => {
					config.headers['Authorization'] = sessionStorage.getItem("at");
				})
			} else if (Date.now() / 1000 >= raw.exp){
				refresh(id).then(() => {
					config.headers['Authorization'] = sessionStorage.getItem("at");
				})
			}
			return config
		} catch (error) {
			return Promise.reject(error);
		}
	},
	(error: any) => {
		return Promise.reject(error);
	}
)

myAxios.interceptors.response.use(
	(response: AxiosResponse) => {
		return response
	},
	async (error: AxiosError) => {
		const config = error.config
		const url = error.config?.url
		const code = error.response?.status
		if (url	!== "/api/refresh" && (code === 401 || code === 403) && config){
			try{
				await refresh(config.headers["userId"])
				config.headers['Authorization']  = sessionStorage.getItem("at")
				return myAxios(config)
			} catch (error) {
				return Promise.reject(error)
			}
		}
		return Promise.reject(error);
	}
)

export default myAxios