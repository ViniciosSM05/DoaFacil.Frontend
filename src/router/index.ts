import { createRouter, createWebHistory } from 'vue-router'
import { useGeneralStore } from '@/stores/general/general-store'
import UserRegisterView from '@/views/user-register/UserRegisterView.vue'
import UserLoginView from '@/views/user-login/UserLoginView.vue'
import HomeView from '@/views/home/HomeView.vue'
import LayoutAuthenticated from '@/components/layout/authenticated/LayoutAuthenticated.vue'
import LayoutPublic from '@/components/layout/public/LayoutPublic.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user/register',
      component: LayoutPublic,
      children: [
        {
          path: '',
          name: 'register',
          component: UserRegisterView,
          meta: { requiresAuth: false }
        }
      ]
    },
    {
      path: '/user/login',
      component: LayoutPublic,
      children: [
        {
          path: '',
          name: 'login',
          component: UserLoginView,
          meta: { requiresAuth: false }
        }
      ]
    },
    {
      path: '/',
      component: LayoutAuthenticated,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach((to, _, next) => {
  const isAuth = useGeneralStore().isAuthenticated
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isAuth) return next({ name: 'login' })
  if (!requiresAuth && isAuth) return next({ name: 'home' })
  else next()
})

export default router
