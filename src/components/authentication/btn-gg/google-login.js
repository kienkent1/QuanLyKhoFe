import * as api from '../../../helper/call-api.js'
import VueCookies from 'vue-cookies';

const param = 'Authentication/google-Login'
const loginGG = async (idToken, isRemember) => {
  try {
    const res = await api.postApi(param, {
        data: {idToken:idToken},
        headers:{ "Content-Type": "application/json" },
    });
    if(res.status === 400)  return {message:`${res.data.message}`, success: true};

    else if(res.status === 200 || res.status === 201){

        const accessToken = res.data.data.accessToken;
        
        const refreshToken = res.data.data.refreshToken;
        if(isRemember === true){
            VueCookies.set('accessToken', `${accessToken}`, '1d');
        localStorage.setItem('refreshToken',`${refreshToken}`)
        localStorage.setItem('isRemember', true)
        }
        else{
            VueCookies.set('accessToken', `${accessToken}`, '1h');
        localStorage.setItem('refreshToken',`${refreshToken}`)
        localStorage.removeItem('isRemember');
        }
        

        return {message:'Đăng nhập thành công',success: true};
    }
    else if(res.status === 5000){
        console.error(res.data.message);

        return {message:'Lỗi hệ thống',success: false};
    }
} catch (error) {
    console.error(error);
    return {
        status: err.response?.status || 0,
        data: { message: err.message || 'Không thể kết nối đến máy chủ.' },
        success: false
      };
}
}
export default loginGG;