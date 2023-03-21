import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import QnA from '../components/QnA.vue'
import Summarise from '../components/Summarise.vue'
import FAQ from '../components/FAQ.vue'
import Home from '../components/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/qna',
      name: 'qna',
      component: QnA
    },
    {
      path: '/summary',
      name: 'summary',
      component: Summarise
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ
    }
  ]
})

export default router
