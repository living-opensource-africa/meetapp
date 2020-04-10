import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '@/components/Register.vue'
import Login from '@/components/Login.vue'
import Welcome from '@/components/Welcome.vue'
import Admin from '@/components/Admin.vue'
import NProgress from 'nprogress'
import '../../node_modules/nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    meta: {
      title: 'Get to know Living Open Source Africa'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About Living Open Source Africa'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      guest: true,
      title: 'Become a community member'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true,
      title: 'Join your fellow geeks'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: 'Welcome Home',
      Auth: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      title: 'Welcome back',
      Auth: true,
      is_admin: true
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.matched.some(record => record.meta.Auth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      const user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.is_admin === 1) {
          next()
        } else {
          next({ name: 'home' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({ name: 'home' })
    }
  } else {
    next()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
