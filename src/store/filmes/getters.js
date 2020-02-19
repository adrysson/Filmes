export function getFilmes (state) {
  if (state.filmes.length) {
    return state.filmes
  }

  const filmes = localStorage.filmes

  if (filmes) {
    return JSON.parse(filmes)
  }

  return []
}
