import axios from "axios";
import router from '../../routes.js'
import VueCookies from 'vue-cookies'

const baseApi = import.meta.env.VITE_BASE_URL;
// const token = VueCookies.get('token')
// const refreshToken = localStorage.getItem('refreshToken')
// const checkedToken = () => {
//     if(token){
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// }
// else if(refreshToken){
//     //goi api lay token moi
//     router.push('/login');
// }
// else{
//     router.push('/login')
//     //window.location.href = '/login'
// }

// }

// axios.defaults.headers.post['Content-Type'] = 'application/json';
// // export const getApi = async (filer, sort) => {

// //     //const res = await axios.get(`${baseApi}/employees`, 
export async function postApi(param, obj = {}) {
    try {
        const res = await axios.post(baseApi + param, obj);
        return res;
    } catch (error) {
        throw error;
    }
}