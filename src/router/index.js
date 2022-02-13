import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [{
  path: '',
  redirect: '/page/index'
},
{
  path: '/page',
  name: 'tabbar',
  meta: {
    needKeepAlive: true
  },
  component: () => import('views/page/Page.vue'),
  children: [{
    path: 'index',
    name: 'Index',
    meta: {
      needKeepAlive: true
    },
    component: () => import('views/index/Index.vue')
  },
  {
    path: 'design',
    name: 'Design',
    meta: {
      needKeepAlive: true
    },
    component: () => import('views/design/Design.vue')
  },
  {
    path: 'profile',
    name: 'Profile',
    meta: {
      needKeepAlive: true
    },
    component: () => import('views/profile/Profile.vue')
  },
  ]
},
{
  path: '/classifyDetail/:id',
  name: 'ClassifyDetail',
  meta: {
    needKeepAlive: false
  },
  component: () => import('views/classifyDetail/ClassifyDetail.vue')
},
{
  path: '/recommend/:id',
  name: 'Recommend',
  meta: {
    needKeepAlive: true
  },
  component: () => import('views/recommend/Recommend.vue')
},
{
  path: '/detail/:id',  
  name: 'Detail',
  meta: {
    needKeepAlive: false
  },
  component: () => import('views/detail/Detail.vue')
},
{
  path: '/search/:id',  
  name: 'Search',
  meta: {
    needKeepAlive: false
  },
  component: () => import('views/search/Search.vue')
},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router