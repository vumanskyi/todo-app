import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

  const routes = [
      {
          path: '/',
          name: 'create',
          component: () => import('./../views/Create')
      },
      {
          path: '/list',
          name: 'list',
          //lazy load
          component: () => import('./../views/List'),
      },
      {
          path: '/task/:id',
          name: 'task',
          component: () => import('./../views/Task'),
      }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
