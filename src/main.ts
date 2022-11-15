import { createApp } from 'vue'
import pinia from '@/stores/store'
import App from './App.vue'
import router from './router'
import VantUi from './VantUi'
import { Lazyload } from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VantUi)
app.use(Lazyload,{
    loading:'/src/assets/Image/ic_default_image.png',//默认懒加载图片
    error: '/src/assets/Image/ic_default_image.png'
})

// 路由白名单
// const whiteList = [
//     'home',
//     'discover',
//     'serials',
//     'pagedetail',
//     'my'
// ]

// 全局路由守卫
// router.beforeEach((to:any,from:any,next:any) => {
//     // 先判断路由是否在路由的白名单， 再判断token是否匹配
//     if(whiteList.indexOf(to.name) !== -1) {
//         next()
//     }else {
//         let users = localStorage.usersInfo
//         let token = localStorage.token
//         // console.log(users,token);
//         if(users && token && JSON.parse(users).filter((v:localUser) => v.token == JSON.parse(token)).length>0) {
//             // 放行
//             next()
//         }else {
//             // 跳转到登录页面
//             if(to.name == 'login') {
//                 next()
//             }else {
//                 console.log('去登录页面');
//                 router.push('/login')
//             }
//         }
//     }
    
// })

app.mount('#app')
