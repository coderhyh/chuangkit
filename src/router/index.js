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
  component: () => import('views/page/Page.vue'),
  children: [{
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router