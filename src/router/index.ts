import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '../views/MainView.vue'
import DiscoverView from '../views/DiscoverView.vue'
import SerialsView from '../views/SerialsView.vue'
import MyView from '../views/MyView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import RegisterViewVue from '@/views/RegisterView.vue'
import PicDetailVue from '@/views/DetailViews/PicDetail.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main/home'
    },
    {
      path: '',
      redirect: '/main/home'
    },
    {
      name: 'main',
      path: '/main',
      component: MainView,
      children: [
        {
          name: 'home',
          path: 'home',
          component: HomeView,
          meta: {
            keepAlive: true
          }
        },
        {
          name: 'discover',
          path: 'discover',
          component: DiscoverView,
          meta: {
            keepAlive: false
          }
        },
        {
          name: 'serials',
          path: 'serials',
          component: SerialsView,
          meta: {
            keepAlive: false
          }
        },
        {
          name: 'my',
          path: 'my',
          component: MyView,
          meta: {
            keepAlive: false
          }
        },
      ]
    },
    {
      name: 'pagedetail',
      path: '/pagedetail',
      component: () => import('@/views/PageDetail.vue'),
      meta: {
        keepAlive: false
      }
    },
    {
      name: 'picdetail',
      path: '/picdetail/:picId',
      component: PicDetailVue,
      meta: {
        keepAlive: false,
      }
    },
    {
      name: 'specaildetail',
      path: '/specaildetail/:specailId',
      component: () => import('@/views/DetailViews/SpecailDetail.vue'),
      meta: {
        keepAlive: false,
      }
    },
    {
      name: 'allbrank',
      path: '/allbrank/:brankId/:title/:type',
      component: () => import('@/views/AllBrank.vue'),
      meta: {
        keepAlive: false,
      }
    },
    {
      name: 'allbrank',
      path: '/allbrank/:brankId/:title/:type/:isSerial',
      component: () => import('@/views/AllBrank.vue'),
      meta: {
        keepAlive: false,
      }
    },
    {
      name: 'collectlist',
      path: '/collectlist/:type',
      component: () => import('@/views/MyCollectList.vue'),
      meta: {
        keepAlive: false,
      }
    },
    {
      name: 'login',
      path: '/login',
      component: LoginViewVue,
      meta: {
        keepAlive: false
      }
    },
    {
      name: 'register',
      path: '/register',
      component: RegisterViewVue,
      meta: {
        keepAlive: false
      }
    }
  ]
})

export default router
