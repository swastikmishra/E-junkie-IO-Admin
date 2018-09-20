import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  mode: 'history',
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