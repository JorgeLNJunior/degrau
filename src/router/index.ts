import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      name: 'Tips',
      path: '/tips',
      component: () => import('@/views/TipsView.vue'),
    },
    {
      name: 'Templates',
      path: '/templates',
      component: () => import('@/views/TemplatesView.vue'),
    },
    {
      name: 'About',
      path: '/about',
      component: () => import('@/views/AboutView.vue'),
    },
  ],
})

export default router
