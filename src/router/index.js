import {
  createRouter,
  createWebHistory
} from 'vue-router'

const routes = [
  {
    path: '',
    redirect: '/page/index'
  },
  {
    path: '/page',
    name: 'tabbar',
    component: () => import('views/page/Page.vue'),
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('views/index/Index.vue')
      },
      {
        path: 'design',
        name: 'Design',
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
    component: () => import('views/classifyDetail/ClassifyDetail.vue')
  },
  {
    path: '/recommend/:id',
    name: 'Recommend',
    component: () => import('views/recommend/Recommend.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('views/detail/Detail.vue')
  },
  {
    path: '/search/:id',
    name: 'Search',
    component: () => import('views/search/Search.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes
})

export default router