const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("src/pages/home.vue") }],
  },
  {
    path: "/pelicula/:id",
    component: () => {
      if (JSON.parse(localStorage.getItem("usuario"))) {
        if (JSON.parse(localStorage.getItem("usuario")).rol == "c") {
          return import("layouts/adminLayout.vue");
        } else if (SON.parse(localStorage.getItem("usuario")).rol == "i") {
          return import("layouts/usuarioPanel.vue");
        } else {
          return import(`layouts/MainLayout.vue`);
        }
      } else {
        return import(`layouts/MainLayout.vue`);
      }
    },

    children: [
      { path: "", component: () => import("pages/peliculaInfo/pelicula.vue") },
    ],
  },
  {
    path: "/categoria/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/categorias/categoria.vue") },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/administracion/login.vue"),
  },
  {
    path: "/register",
    component: () => import("pages/administracion/register.vue"),
  },
  {
    path: "/administracion/panel",
    component: () => import("layouts/adminLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/home.vue") },
      {
        path: "pelicula/:id",
        component: () => import("src/pages/peliculaInfo/pelicula.vue"),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: "/administracion/panel/movie/create",
    component: () => import("layouts/adminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/administracion/panel/movies/add.vue"),
      },
    ],
  },
  {
    path: "/administracion/panel/user/create",
    component: () => import("layouts/adminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/administracion/panel/movies/add.vue"),
      },
    ],
  },
  {
    path: "/administracion/panel/category/create",
    component: () => import("layouts/adminLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/administracion/panel/movies/add.vue"),
      },
    ],
  },
  {
    path: "/panel",
    component: () =>
      "s" == "jhon"
        ? import("layouts/adminLayout.vue")
        : import("layouts/usuarioPanel.vue"),
    children: [
      { path: "", component: () => import("src/pages/home.vue") },
      {
        path: "categoria/:id",
        component: () => import("src/pages/categorias/categoria.vue"),
      },
    ],
  },
  {
    path: "/administracion/panel/categoria/:id",
    component: () => import("layouts/adminLayout.vue"),
    children: [
      { path: "", component: () => import("pages/categorias/categoria.vue") },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
