export function getFilmes (state) {
  if (state.filmes.length) {
    return state.filmes
  }

  const filmes = localStorage.assistirDepois

  if (filmes) {
    return JSON.parse(filmes)
  }

  return []
}
