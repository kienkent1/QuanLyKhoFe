import * as api from '../../helper/callApi.js';
import * as contenType from '../../helper/baseHeaderContentype.js';

const controller = 'Loai';

export const getLoai = async (params = {}) => {
    try {
        const res = await api.getApi(controller, {
            requiresAuth: true,
            params: params,
        });

        return res;
    } catch (error) {
        api.throwErr(error, controller);
    }
};

export const getLoaiById = async (id) => {
    try {
        const res = await api.getApi(controller + `/${id}`,{
            requiresAuth: true,
        });

        return res;
    } catch (error) {
        api.throwErr(error, controller);
    }
};

export const createLoai = async (body = {}) => {
    try {
        const res = await api.postApi(controller, {
            requiresAuth: true,
            body: body,
            headers: contenType.formType,
        });

        return res;
    } catch (error) {
        api.throwErr(error, controller);     
    }
};

export const updateLoai = async (id, body = {}) => {
try {
    const res = await api.putApi(controller + `/${id}`,{
        requiresAuth: true,
        body: body,
        headers: contenType.formType,
    });

    return res;
} catch (error) {
    api.throwErr(error, controller);
}
};

export const deleteLoai = async (id) => {
try {
    const res = api.deleteApi(controller + `/${id}`,{
        requiresAuth: true,
    });

    return res;
} catch (error) {
    api.throwErr(error, controller);
}
};