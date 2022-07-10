import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home')
      },
      {
        path: 'home/list',
        name: 'list',
        component: () => import('@/views/List')
      },
      {
        path: 'home/news',
        name: 'news',
        component: () => import('@/views/News')
      },
      {
        path: 'home/profile',
        name: 'profile',
        component: () => import('@/views/Profile')
      }
    ]
  },
  {
    path: '/favorate',
    name: 'favorate',
    component: () => import('@/views/Profile/favorate')
  },
  {
    path: '/rent',
    name: 'rent',
    component: () => import('@/views/Profile/rent')
  },
  {
    path: '/city',
    name: 'city',
    component: () => import('@/components/city')
  },
  {
    path: '/rent/add',
    name: 'issuehouse',
    component: () => import('@/components/issueHouse')
  },
  {
    path: '/rent/search',
    name: 'searchSmallArea',
    component: () => import('@/views/searchSmallArea')
  },
  {
    path: '/detail/:id',
    name: 'details',
    component: () => import('@/components/card/HouseDetails')
  }
]

const router = new VueRouter({
  routes
})

export default router
