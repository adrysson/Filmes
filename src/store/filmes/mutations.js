export function setFilmes (state, filmes) {
  state.filmes = filmes
  localStorage.filmes = JSON.stringify(state.filmes)
}
