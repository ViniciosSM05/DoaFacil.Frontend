import { createRouter, createWebHistory } from 'vue-router'
import { useGeneralStore } from '@/stores/general/general-store'
import UserRegisterView from '@/views/user-register/UserRegisterView.vue'
import UserLoginView from '@/views/user-login/UserLoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user/register',
      name: 'register',
      meta: { requiresAuth: false },
      component: UserRegisterView
    },
    {
      path: '/user/login',
      name: 'login',
      meta: { requiresAuth: false },
      component: UserLoginView
    }
  ]
})

router.beforeEach((to, _, next) => {
  const isAuth = useGeneralStore().isAuthenticated
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isAuth) next({ name: 'login' })
  else next()
})

export default router
