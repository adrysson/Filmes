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
                :color="filmeIsSaved ? 'primary' : 'grey'"
                flat
                dense
                label="Salvar"
                icon="playlist_add"
                @click="salvar"
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
    },
    assistirDepois: {
      get () {
        if (localStorage.assistirDepois) {
          return JSON.parse(localStorage.assistirDepois)
        }
        return []
      },
      set (list) {
        localStorage.assistirDepois = JSON.stringify(list)
      }
    }
  },
  data () {
    return {
      error: false,
      filme: {},
      filmeIsSaved: false
    }
  },
  created () {
    if (localStorage.filmes) {
      this.error = true
    }

    this.filme = this.getFilme(this.filmes)

    if (!this.filme) {
      this.error = true
    }

    this.filmeIsSaved = this.isSaved()
  },
  methods: {
    isSaved () {
      if (localStorage.assistirDepois) {
        const filme = this.getFilme(this.assistirDepois)
        if (filme) {
          return true
        }
      }
      return false
    },
    getFilme (list) {
      const paramKey = parseInt(this.$route.params.key)

      if (list) {
        return list.find((filme, key) => {
          return key === paramKey
        })
      }
      return false
    },
    salvar () {
      const filmes = this.assistirDepois
      if (!this.isSaved()) {
        filmes.push(this.filme)
      } else {
        filmes.splice(this.filme, 1)
      }
      this.assistirDepois = filmes
      this.filmeIsSaved = this.isSaved()
    }
  }
}
</script>
