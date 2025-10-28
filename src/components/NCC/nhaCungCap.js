import * as api from '../../helper/callApi.js'
import * as contenType from '../../helper/baseHeaderContentype.js'

const controller = 'NhaCungCap'

export const getNCC = async (params = {}) => {
    try {
        const res = await api.getApi(controller,{
            params: params,
            requiresAuth: true
        })
        return res;
    } catch (error) {
        api.throwErr(error, controller)
    }
} ;

export const getNccById = async (id) => {
    try {
        const res = await api.getApi(controller + `/${id}`,{
            requiresAuth:true
        })

        return res;
    } catch (error) {
        api.throwErr(error, controller)
    }
};

export const themNhaCungCap = async (body = {}) => {
 try {
    const res = await api.postApi(controller, {
        requiresAuth: true,
        data: body,
        headers: contenType.formType
    })

    return res;
 } catch (error) {
   api.throwErr(error, controller)
 }
};

export const updateNCC = async  (id, body = {}) => {
    try {
        const res = await api.putApi(`${controller}/${id}`,{
            requiresAuth: true,
            data: body,
            headers: contenType.formType
        })
        return res;
    } catch (error) {
        api.throwErr(error, controller)
    }
};

export const deleteNcc = async (id) => {
try {
    const res = await api.deleteApi(controller + `/${id}`,{
        requiresAuth: true
    })
    return res;
} catch (error) {
    api.throwErr(error, controller)
}
};