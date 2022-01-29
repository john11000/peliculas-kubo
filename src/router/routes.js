
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/bebidas.vue') }
    ]
  },
  {
    path: '/pelicula/:id',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/peliculaInfo/pelicula.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/administracion/login.vue'),
  
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
