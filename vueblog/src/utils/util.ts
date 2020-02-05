
import axios from 'axios';
//注意： 不是vue-router,否则router.replace不跳转
import router from '../router';

let http = axios.create({
  timeout: 7000
})

//axios.defaults.baseURL = '/api';


// 拦截请求，给所有的请求都带上token
http.interceptors.request.use(request => {
  const luffy_jwt_token = window.localStorage.getItem('luffy_jwt_token');
  console.log('token: '+luffy_jwt_token);
  if (luffy_jwt_token) {
    /*
      此处有坑，在此记录
      request.headers['Authorization']
      必须通过此种形式设置Authorization,否则后端即使收到字段也会出现问题，返回401
      - request.headers.Authorization或request.headers.authorization可以设置成功，
      浏览器查看也没有任何问题，但是在后端会报401并且后端一律只能拿到小写的，
      也就是res.headers.authorization，后端用大写获取会报undefined
    */
    request.headers['Authorization'] = `Bearer ${luffy_jwt_token}`;
  }
  return request;
});

// 拦截响应，遇到token不合法则报错
http.interceptors.response.use(
  response => {
    //const res = response.data;
    console.log('哈哈哈哈哈哈: '+response.data.token);
    if (response.data.token) {
     
      window.localStorage.setItem('luffy_jwt_token', response.data.token);
    }
    return response;
  },
  error => {
    const errRes = error.response.data;
    console.log('401: '+error.response.status);
    if (error.response.status === 401) {
      window.localStorage.removeItem('luffy_jwt_token');
      router.replace({
            path: '/login',
            //query: {redirect: router.currentRoute.fullPath} // 登录成功后跳入浏览的当前页面
          });
      console.log('replace')
    }
    return Promise.reject(errRes); // 返回接口返回的错误信息
  }
)

export default http;
 