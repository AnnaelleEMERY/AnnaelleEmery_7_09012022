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
    },
    {
      path: '/membre/:id',
      name: 'persoMembre',
      component: () => import('../views/persoMembre.vue'),
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const Access = ["/"]
  const pagesVerif = !Access.includes(to.path)
  const loggedIn = sessionStorage.getItem("userId")
  const sessionToken = sessionStorage.getItem("token")
  if (pagesVerif && !loggedIn && !sessionToken) {
      return next("/")
  }
  next()
})

export default router
