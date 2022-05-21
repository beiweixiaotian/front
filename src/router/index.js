import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from "../views/Register.vue";
// import Main from "../views/Login.vue";
import Login from "../views/Login.vue";
import About from "../views/About.vue";
import UpdateCV from "../views/UpdateCV.vue";
import Jobs from "../views/jobs/JobList";
import Recommend from "../views/jobs/JobRecommend.vue";
import Header from "../components/Header.vue";
import Layout from "@/components/Layout";
import JobSearch from "@/views/jobs/JobSearch";
import JobRecommend from "@/views/jobs/JobRecommend";
import JobScan from "@/views/jobs/JobScan";
import Job from "@/views/jobs/Job";
import JobCollection from "@/views/jobs/JobCollection";

const routes = [

  {
    path: '/',
    name: 'layout',
    component: Layout,
    // 重定向 自动跳转到/home
    redirect: "/login",
    children:[
      {
        path: '/home',
        name: 'home',
        component: Home
      },{
        path: '/jobs',
        name: 'jobs',
        component: Jobs
      }, {
        path: '/recommend',
        name: 'recommend',
        component: JobRecommend
      }, {
        path: '/updatecv',
        name: 'updatecv',
        component: UpdateCV
      },{
        path: '/search',
        name: 'search',
        component: JobSearch
      },
      {
        path: '/scan',
        name: 'scan',
        component: JobScan
      },
      {
        path: '/collections',
        name: 'collections',
        component: JobCollection
      },
      {
        path: '/job',
        name: 'job',
        component: Job
      },
    ]
  },{
    path: '/register',
    name: 'register',
    component: Register
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/about',
    name: 'about',
    component: About
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
