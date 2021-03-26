import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/questions',
    name: 'Questions',
    component: () => import(/* webpackChunkName: "questions" */ '../views/Questions.vue')
  },
  {
    path: '/summary',
    name: 'Summary',
    component: () => import(/* webpackChunkName: "summary" */ '../views/Summary.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'Questions' && !store.state.loadingQuestions) next('/')
  if (to.name === 'Summary' && !store.getters.gameFinished) next('/')
  next()
})

export default router
