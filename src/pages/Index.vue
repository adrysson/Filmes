<template>
  <q-page class="flex flex-center page">
    <div v-if="filmes.length" class="row">
      <div class="my-card-container" :key="`filme-${key}`" v-for="(filme, key) in filmes">
        <q-card class="my-card">
          <q-img
            height="220px"
            :src="filme.poster"
            basic
          >
            <div class="absolute-bottom text-h6">
              {{ filme.titulo }}
            </div>
          </q-img>

          <q-card-section>
            {{ filme.sinopse }}
          </q-card-section>

          <q-card-actions>
            <q-btn flat>Detalhe</q-btn>
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
  data () {
    return {
      filmes: [],
      error: false
    }
  },
  async created () {
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
</script>

<style lang="stylus">
.my-card
  width 100%
  max-width 225px

.my-card-container, .page
  padding 10px
</style>
