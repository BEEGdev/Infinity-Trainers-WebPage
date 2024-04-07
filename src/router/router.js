import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue"


const routes = [
    {
      path: "/",
      name: "Home",
      component: Home 
    },
    {
      path: "/programs",
      props:true,
      name: "Programs",
      component: () => import('../views/Programs.vue')
    },
    {
        path: "/aboutus",
        props:true,
        name: "AboutUs",
        component: () => import('../views/AboutUs.vue')
      },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;