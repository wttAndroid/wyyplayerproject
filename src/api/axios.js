import axios from 'axios'
const BASE_URL = 'https://autumnfish.cn/'


export const request = createInstance();


function createInstance() {
  const instance = axios.create({
    baseURL: BASE_URL
  })
  instance.interceptors.response.use(handleResponse, handleError)
  return instance;
}

function handleResponse(response) {
  console.log(response.data)

  if (response.status != 200) {
    throw new Error('发生网络异常，数据请求失败')
    return
  }
  return response.data
}

function handleError(handleError) {
  throw handleError
}
