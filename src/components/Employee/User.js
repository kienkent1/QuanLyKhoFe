import * as api from '../../helper/callApi.js'
const controller = 'NhanVien'

export const userData = async (query = {}) => {

   
  const data = await  api.getApi(controller, {requiresAuth: true}, query)
  return data.data.data
} 