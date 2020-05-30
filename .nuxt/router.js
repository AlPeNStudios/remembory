import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _511d3226 = () => interopDefault(import('../pages/memories/create.vue' /* webpackChunkName: "pages/memories/create" */))
const _b76e9134 = () => interopDefault(import('../pages/memories/edit/_id.vue' /* webpackChunkName: "pages/memories/edit/_id" */))
const _7b46ec99 = () => interopDefault(import('../pages/memories/_id.vue' /* webpackChunkName: "pages/memories/_id" */))
const _1b146453 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/memories/create",
    component: _511d3226,
    name: "memories-create"
  }, {
    path: "/memories/edit/:id?",
    component: _b76e9134,
    name: "memories-edit-id"
  }, {
    path: "/memories/:id?",
    component: _7b46ec99,
    name: "memories-id"
  }, {
    path: "/",
    component: _1b146453,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
