<template>
  <q-page class="flex">
    <div v-if="filme">
      <q-card>
        <q-img
          :src="filme.poster"
          basic
        >
        </q-img>

          <q-card-section>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ filme.titulo }}</div>
            <q-card-actions>
              <div class="text-overline text-orange-9">
                  {{ filme.genero }}
              </div>
              <q-space></q-space>
              <q-btn
                color="grey"
                flat
                dense
                label="Salvar"
                icon="playlist_add"
              ></q-btn>
            </q-card-actions>
            <div class="text-caption text-grey text-justify">
              {{ filme.sinopseFull }}
            </div>
          </q-card-section>

      </q-card>
    </div>
    <div v-else>
      <p class="text-red-4" v-if="error">
        Ocorreu um erro ao buscar o filme. Tente novamente.
      </p>
      <p v-else class="text-grey-4">
        Filme não encontrado.
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  computed: {
    filmes: {
      get () {
        if (localStorage.filmes) {
          return JSON.parse(localStorage.filmes)
        }
        return []
      },
      set (list) {
        localStorage.filmes = JSON.stringify(list)
      }
    }
  },
  data () {
    return {
      error: false,
      filme: {}
    }
  },
  created () {
    if (localStorage.filmes) {
      this.error = true
    }

    const paramKey = parseInt(this.$route.params.key)

    this.filme = this.filmes.find((filme, key) => {
      return key === paramKey
    })

    if (!this.filme) {
      this.error = true
    }
  }
}
</script>
