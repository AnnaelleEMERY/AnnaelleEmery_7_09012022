import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
      path: '/',
      name: 'signin',
      component: () => import('../views/signin.vue')
    },
    
    {  
      path: '/wall',
      name: 'wall',
      component: () => import('../views/wall.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/profil.vue')
    },
    {
      path: '/perso',
      name: 'perso',
      component: () => import('../views/perso.vue'),
    },
    {
      path: '/membre',
      name: 'membre',
      component: () => import('../views/members.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const Access = ["/"]
  const pagesVerif = !Access.includes(to.path)
  const loggedIn = localStorage.getItem("userId")
  const sessionToken = localStorage.getItem("token")
  if (pagesVerif && !loggedIn && !sessionToken) {
      return next("/")
  }
  next()
})

export default router
