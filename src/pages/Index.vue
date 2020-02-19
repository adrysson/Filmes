<template>
  <q-page class="flex flex-center page-index">
    <div v-if="filmes.length" class="row flex-center">
      <div class="index-card-container" :key="`filme-${key}`" v-for="(filme, key) in filmes">
        <q-card class="index-card">
          <q-img
            height="305px"
            :src="filme.poster"
            basic
          >
            <div class="absolute-bottom text-h6">
              {{ filme.titulo }}
            </div>
          </q-img>

          <div class="sinopse-index">
            <q-card-section>
              {{ filme.sinopse }}
            </q-card-section>
          </div>

          <q-card-actions>
            <q-btn :to="{name: 'Detalhe', params: { titulo: filme.titulo }}" flat>Detalhe</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div v-else>
      <p class="text-red-4" v-if="error">
        Ocorreu um erro ao buscar os filmes em cartaz. Tente novamente.
      </p>
      <p v-else class="text-grey-4">
        Não há filmes em cartaz.
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
        return this.$store.getters['cartaz/getFilmes']
      },
      set (list) {
        this.$store.commit('cartaz/setFilmes', list)
      }
    }
  },
  data () {
    return {
      error: false
    }
  },
  async created () {
    if (!this.filmes.length) {
      try {
        this.error = false
        this.$q.loading.show({
          delay: 400
        })
        const response = await this.$axios.get('https://api.myjson.com/bins/194h2g')
        this.filmes = response.data.filmes
      } catch (xhr) {
        this.error = true
      } finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.index-card
  width 100%
  max-width 305px

.index-card-container, .page-index
  padding 10px

.sinopse-index
  display inline-block
  max-height 10px

</style>
