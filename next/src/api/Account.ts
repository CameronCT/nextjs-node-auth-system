import axios from "axios"
import { toast } from "react-toastify"
import Config from "../Config"
import Authentication from "../utils/Authentication"

type AxiosResponse = {
  status: number
  message: string | null
  data: unknown | any
}

const getByUrl = async (url: string): Promise<AxiosResponse | null> => {
  const response = await axios.get(`${Config.apiUrl}/profile/?url=${url}`, {}).catch((e) => toast.error(e.response.data.message))
  // @ts-ignore
  return response?.data || null
}

const update = async (formData: { [key: string]: string }): Promise<AxiosResponse | null> => {
  const response = await axios.post(`${Config.apiUrl}/profile/update`, { ...formData, _csrf: Authentication.getCSRFToken() }).catch((e) => toast.error(e.response.data.message))
  // @ts-ignore
  return response?.data || null
}

export default { getByUrl, update };