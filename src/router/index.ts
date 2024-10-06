import { createRouter, createWebHistory } from 'vue-router'
import UserRegisterView from '@/views/user-register/UserRegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user/register',
      name: 'register',
      component: UserRegisterView
    }
  ]
})

export default router
