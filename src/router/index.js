import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/store'
// import firebase from '@/firebase'

const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/signin', component: 'SignIn' },
  { path: '/signup', component: 'SignUp' },
  { path: '/home', component: 'Home', meta: { requiresAuth: true } },
  { path: '/myaccount', component: 'MyAccount', meta: { requiresAuth: true } },
  { path: '/passwordEdit', component: 'PasswordEdit', meta: { requiresAuth: true } },
  {
    path: '/objects',
    name: 'listObjects',
    components:
      { default: 'Objects', sidebar: 'ObjectsSidebar' },
    meta: { requiresAuth: true }
  },
  {
    path: '/objects/new',
    name: 'createObject',
    components:
      { default: 'ObjectEdit' },
    meta: { requiresAuth: true }
  },
  { path: '*', component: 'NotFound' }
]

const routes = routerOptions.map(route => {
  let imports = {}
  if (route.components) {
    imports = { components: {} }
    Object.keys(route.components).map(k => {
      imports.components[k] = () => import(`@/components/${route.components[k]}.vue`)
    })
  } else if (route.component) {
    imports = { component: () => import(`@/components/${route.component}.vue`) }
  }
  return {
    ...route,
    ...imports
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = store.getters['auth/isAuthenticated']
  // const isAuthenticated = firebase.auth().currentUser // for Firebase use
  if (requiresAuth && !isAuthenticated) {
    next('/signin')
  } else {
    next()
  }
})

export default router
