import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: '/admin/',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: function(resolve) { require(['../components/Home'], resolve) },
      meta: { title: 'Dashboard', auth: true }
    },
    {
    	path: '/pages',
    	name: 'Pages',
    	component: function(resolve){ require(['../components/Pages'], resolve) },
      meta: { title: 'Pages', auth: true }
    },
    {
      path: '/page/:page',
      name: 'Page',
      component: function(resolve){ require(['../components/Page'], resolve) },
      meta: { title: 'Page', auth: true }
    },
    {
      path: '/templates',
      name: 'Templates',
      component: function(resolve){ require(['../components/Templates'], resolve) },
      meta: { title: 'Templates', auth: true }
    },
    {
      path: '/themes',
      name: 'Themes',
      component: function(resolve){ require(['../components/Themes'], resolve) },
      meta: { title: 'Themes', auth: true }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: function(resolve){ require(['../components/Settings'], resolve) },
      meta: { title: 'Settings', auth: true }
    },
    {
      path: '/integrations',
      name: 'Integrations',
      component: function(resolve){ require(['../components/Integrations'], resolve) },
      meta: { title: 'Integrations', auth: true }
    },
    {
      path: '*',
      name: 'NotFound',
      component: function(resolve){ require(['../components/NotFound'], resolve) },
      meta: { title: 'Page Not Found', auth: false }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router