import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Bug from '@/components/Bug'
import Bugs from '@/components/Bugs'
import BugForm from '@/components/FormBug'
import Build from '@/components/Build'

import BootstrapVue from 'bootstrap-vue'


Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bugs',
      component: Bugs
    },
    {
    	path: '/new',
    	name: 'BugForm',
    	component: BugForm
    },
    {
      path: '/build',
      name: 'view-build',
      component: Build
    },
    {
    	path: '/:bug_id',
    	name: 'view-bug',
    	component: Bug
    }
  ]
})
