import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FindPage from '../views/page/FindPage.vue'
import RecomPage from '../views/page/RecomPage.vue'
import NewlistPage from '../views/page/NewlistPage.vue'
import NewmyPage from '../views/page/NewmyPage.vue'
import TjgdInfo from '../views/infopage/TjgdInfo.vue'
import Tjmvinfo from '../views/infopage/Tjmvinfo.vue'
import Search from '../views/infopage/SearchInfo.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/find',
    children: [{
      path: '/find',
      name: 'FindPage',
      component: FindPage,
    }, {
      path: '/recom',
      name: 'RecomPage',
      component: RecomPage
    }, {
      path: '/newlist',
      name: 'NewlistPage',
      component: NewlistPage
    }, {
      path: '/newmy',
      name: 'NewmyPage',
      component: NewmyPage
    }, {
      path: '/tjgdinfo',
      name: 'TjgdInfo',
      component: TjgdInfo
    }, {
      path: '/tjmvinfo',
      name: 'Tjmvinfo',
      component: Tjmvinfo
    }, {
      path: '/search',
      name: 'Search',
      component: Search
    }]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import( /* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
 // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
