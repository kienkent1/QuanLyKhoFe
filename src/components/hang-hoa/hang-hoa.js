import * as api from '../../helper/call-api.js'
import * as contentType from '../../helper/base-header-contentype.js'

const controller = 'HangHoa';

export const getHangHoa = async (params = {}) => {
    try {
        const res = await api.getApi(controller, {
            params: params,
            requiresAuth: true,
        });

        return res;
    } catch (error) {
        api.throwErr(error, controller)
    }
};

export const getHangHoaById = async (id) => {
try {
    const res = await api.getApi(controller + `/${id}`, {
        requiresAuth: true,
    });

    return res;
} catch (error) {
    api.throwErr(error, controller);
}
};

export const scanBarcode = async (barcode) => {
try {
    const res = await api.postApi(controller + '/scan', {
        requiresAuth: true,
        body: barcode,
        headers: contentType.formType,
    })

    return res;
} catch (error) {
    api.throwErr(error, controller)
}
};

export const themHangHoa = async (body = {}) => {
try {
    const res = await api.postApi(controller,{
        requiresAuth: true,
        body: body,
        headers: contentType.appJson,
    })

    return res;
} catch (error) {
    api.throwErr(error, controller);
}
};

export const updateHangHoa = async (id, body = {}) => {
try {
    const res = await api.putApi(controller + `/${id}`,{
        requiresAuth: true,
        body: body,
    });

    return res;
} catch (error) {
    api.throwErr(error, controller)
}
};

export const deleteHangHoa = async (id) => {
try {
    const res = await api.deleteApi(controller + `/${id}`,{
        requiresAuth: true,
    });
    
    return res;
} catch (error) {
    api.throwErr(error, controller);
}
};

export const genBarCode = async (id) => {
try {
    const res = await api.getApi(controller + `/${id}/gen-barcode`, {
        requiresAuth: true,
    });

    return res;
} catch (error) {
    api.throwErr(error, controller + ' barcode');
}
};

export const getCauHinhById = async (id) => {
try {
    const res = await api.getApi(controller + `/${id}/configs`,{
        requiresAuth: true,
    });

    return res;
} catch (error) {
    api.throwErr(error, controller + '/cauHinh');
}
};

export const createCauHinhHH = async (id, body = {}) => {
try {
const res = await api.postApi(controller + `/configs/${id}`,{
    requiresAuth: true,
    body: body,
});

return res;
} catch (error) {
    api.throwErr(error, controller + 'configs/{id}');
}
};

export const addImgCauHing = async (id, file) => {
try {
    const res = await api.postApi(controller + `/configs/${id}/images`,{
        requiresAuth: true,
        body: file,
        headers: contentType.formType,
    });

    return res;
} catch (error) {
    api.throwErr(error, controller + '/configs/{id}/images');
}
};

export const deleteImg = async (ids = [""]) => {
try {
    const res = await api.deleteApi(controller + `/configs/images`,{
        requiresAuth: true,
        body: ids,
    });

    return res;
} catch (error) {
    api.throwErr(error, controller + '/configs/images');
}
};