import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index') 
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/index'),
      children: [
        {
          path: '/home',
          redirect: '/home/mine'
        },
        {
          path: '/home/substitute',
          name: 'substitute',
          component: () => import('@/views/substitute/index'),
        },
        {
          path: '/home/publish',
          name: 'publish',
          component: () => import('@/views/publish/index'),
        },
        {
          path: '/home/course',
          name: 'course',
          component: () => import('@/views/course/index'),
        },
        {
          path: '/home/mine',
          name: 'mine',
          component: () => import('@/views/mine/index'),
        }
      ]
    }, 
  ]
})
