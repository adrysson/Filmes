export function setFilmes (state, filmes) {
  state.filmes = filmes
  localStorage.assistirDepois = JSON.stringify(state.filmes)
}
