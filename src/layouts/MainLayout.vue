<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-9">
    <q-header elevated>
      <q-toolbar class="bg-grey-8">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          {{ $route.name }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-indigo-12 text-white"
    >
      <q-list>
        <q-item-label align="center" class="image-white" header>
          <img alt="Filmes logo" width="100px" src="~assets/film.png">
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Home',
          caption: 'Página inicial',
          icon: 'home',
          link: '#/'
        },
        {
          title: 'Assistir depois',
          caption: 'Filmes marcados para assistir depois',
          icon: 'view_list',
          link: '#/assistir-depois'
        }
      ]
    }
  },
  created () {
    console.log(this.$route)
  }
}
</script>
