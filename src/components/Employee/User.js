import * as api from '../../helper/callApi.js'
const controller = 'NhanVien'

export const userData = async (query = {}) => {

   
  const data = await  api.getApi(controller, {requiresAuth: true}, query)
  return data.data.data
} 

export const createUser = async (data) => {
  return await api.postApi(controller, data, {requiresAuth: true});
}

export const updateUser = async (id, data) => {
  return await api.putApi(`${controller}/${id}`, data, {requiresAuth: true});
}

export const deleteUser = async (id) => {
  return await api.deleteApi(`${controller}/${id}`, {requiresAuth: true})
}