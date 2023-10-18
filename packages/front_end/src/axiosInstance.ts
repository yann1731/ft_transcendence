import axios, {AxiosInstance, AxiosResponse} from 'axios';
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
		}).catch(() => {
			alert("Could not refresh token, please login again");
			isRefreshing = false;
			window.location.assign('/')
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
			const raw: any = jwt_decode(config.headers['Authorization'])
			const id: string = config.headers['userId']

			if (Date.now() / 1000 >= raw.exp){
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

export default myAxios