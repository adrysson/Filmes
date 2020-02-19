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
  computed: {
    filmes: {
      get () {
        return this.$store.getters['assistirDepois/getFilmes']
      },
      set (list) {
        this.$store.commit('assistirDepois/setFilmes', list)
      }
    }
  },
  data () {
    return {
      error: false
    }
  },
  methods: {
    excluir (filme) {
      if (confirm('Tem certeza que deseja apagar?')) {
        this.$store.commit('assistirDepois/removeFilme', filme)

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

      this.$store.commit('assistirDepois/checkFilme', filmeClicado)

      if (filmeClicado.assistido) {
        messageProperties.message = 'Filme marcado como assistido'
        messageProperties.type = 'positive'
      } else {
        messageProperties.message = 'Filme desmarcado como assistido'
        messageProperties.type = 'warning'
      }

      this.$q.notify(messageProperties)
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-card
  width 100%
  max-width 305px

.my-card-container, .page
  padding 10px

.sinopse
  display inline-block
  max-height 10px

</style>
