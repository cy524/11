
import _ from 'lodash'
import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'
import store from '../store';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: (resolve) => require(['../components/HelloWorld.vue'],resolve),
      children: [
        {
          path: 'signup',
          component: (resolve) => require(['../components/nologin/Signup.vue'],resolve)
        },
        {
          path: 'signin',
          component: (resolve) => require(['../components/nologin/Signin.vue'],resolve)
        },
        {
          path: 'server',
          component: (resolve) => require(['../components/nologin/Server.vue'],resolve)
        },
      ]
    }
  ]
})
