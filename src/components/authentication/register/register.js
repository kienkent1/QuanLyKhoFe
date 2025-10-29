import * as api from '/src/helper/call-api.js'
import router from '/routes.js'

const controller = 'Authentication/register'
const register = async (obj={}) => {
    try {
        const res = await api.postApi(controller, obj)
if(res.status === 201 || res.status === 200){
    alert('Đăng ký thành công! Vui lòng đăng nhập');
    router.push('/login')
    return res;
}
return res;
}
catch (err) {
    
    const message = err.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại.';
    return {
      status: err.response?.status || 500,
      data: { message }
    };
  }
}

export default register;