<template>
  <q-page class="flex flex-center page">
    <div v-if="filmes.length" class="row flex-center">
      <div class="my-card-container" :key="`filme-${key}`" v-for="(filme, key) in filmes">
        <q-card class="my-card">
          <q-img
            height="305px"
            :src="filme.poster"
            basic
          >
            <div class="absolute-bottom text-h6">
              {{ filme.titulo }}
            </div>
          </q-img>

          <div class="sinopse">
            <q-card-section>
              {{ filme.sinopse }}
            </q-card-section>
          </div>

          <q-card-actions>
            <q-btn :to="{name: 'Detalhe', params: { titulo: filme.titulo }}" flat>Detalhe</q-btn>
            <q-space/>
            <q-btn
              @click="excluir(filme)"
              icon="delete"
              color="red"
              flat
            ></q-btn>
            <q-btn
              @click="check(filme)"
              icon="playlist_add_check"
              :color="filme.assistido ? 'primary' : 'grey'"
              flat
            ></q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div v-else>
      <p class="text-red-4" v-if="error">
        Ocorreu um erro ao buscar os filmes marcados para assistir depois. Tente novamente.
      </p>
      <p v-else class="text-grey-4">
        Não há filmes marcados para assistir depois.
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageAssistirDepois',
  watch: {
    filmes (list) {
      localStorage.assistirDepois = JSON.stringify(list)
    }
  },
  data () {
    return {
      error: false,
      filmes: []
    }
  },
  created () {
    this.filmes = this.getFilmes()
  },
  methods: {
    getFilmes () {
      if (localStorage.assistirDepois) {
        return JSON.parse(localStorage.assistirDepois)
      }
      return []
    },
    excluir (filme) {
      if (confirm('Tem certeza que deseja apagar?')) {
        const filmes = this.filmes

        filmes.splice(filme, 1)

        this.filmes = filmes

        this.$q.notify({
          position: 'top',
          message: 'Filme removido da lista de assistir depois',
          type: 'warning'
        })
      }
    },
    check (filmeClicado) {
      const messageProperties = {
        position: 'top'
      }

      const filmes = this.filmes

      this.filmes = filmes.map(filme => {
        if (filme.titulo === filmeClicado.titulo) {
          filme.assistido = !filme.assistido
          if (filme.assistido) {
            messageProperties.message = 'Filme marcado como assistido'
            messageProperties.type = 'positive'
          } else {
            messageProperties.message = 'Filme desmarcado como assistido'
            messageProperties.type = 'warning'
          }
        }
        return filme
      })

      this.$q.notify(messageProperties)
    }
  }
}
</script>

<style lang="stylus">
.my-card
  width 100%
  max-width 305px

.my-card-container, .page
  padding 10px

.sinopse
  display inline-block
  max-height 10px

</style>
