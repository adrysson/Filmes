<template>
  <q-page class="flex">
    <div v-if="filme" class="detalhe-card-container">
      <q-card class="detalhe-card" flat bordered>
        <q-card-section horizontal>
          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              :src="filme.poster"
            />
          </q-card-section>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">
                {{ filme.genero }}
            </div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ filme.titulo }}</div>
            <div class="text-caption text-grey text-justify sinopse-detalhe">
              {{ filme.sinopseFull }}
            </div>
          </q-card-section>
        </q-card-section>
        <q-separator></q-separator>
        <q-card-actions>
            <q-btn
              :color="filmeIsSaved ? 'primary' : 'grey'"
              flat
              dense
              label="Salvar"
              icon="playlist_add"
              @click="salvar"
            ></q-btn>
        </q-card-actions>
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
  name: 'PageDetalhe',
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
      if (list) {
        return list.find(filme => {
          return filme.titulo === this.$route.params.titulo
        })
      }
      return false
    },
    salvar () {
      const messageProperties = {
        position: 'top'
      }
      const filmes = this.assistirDepois

      if (!this.isSaved()) {
        filmes.push(this.filme)
        messageProperties.message = 'Filme marcado para assistir depois'
        messageProperties.type = 'positive'
        this.filmeIsSaved = true
      } else {
        filmes.splice(this.filme, 1)
        messageProperties.message = 'Filme removido da lista de assistir depois'
        messageProperties.type = 'warning'
        this.filmeIsSaved = false
      }
      this.assistirDepois = filmes

      this.$q.notify(messageProperties)
    }
  }
}
</script>

<style lang="stylus" scoped>
.detalhe-card-container
  padding 10px

.sinopse-detalhe
  height 400px
  overflow auto
</style>
