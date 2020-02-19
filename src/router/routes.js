
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'Filmes', path: '/', component: () => import('pages/Index.vue') },
      { name: 'Detalhe', path: '/detalhe/:titulo', component: () => import('pages/Detalhe.vue') },
      { name: 'Assistir Depois', path: '/assistir-depois', component: () => import('pages/AssistirDepois.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
