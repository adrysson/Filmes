export function setFilmes (state, filmes) {
  state.filmes = filmes
  localStorage.assistirDepois = JSON.stringify(state.filmes)
}

export function setFilme (state, filme) {
  state.filmes.push(filme)
  localStorage.assistirDepois = JSON.stringify(state.filmes)
}

export function removeFilme (state, filme) {
  state.filmes.splice(filme, 1)
  localStorage.assistirDepois = JSON.stringify(state.filmes)
}

export function checkFilme (state, filmeClicado) {
  state.filmes = state.filmes.map(filme => {
    if (filme.titulo === filmeClicado.titulo) {
      filme.assistido = !filme.assistido
    }
    return filme
  })
  localStorage.assistirDepois = JSON.stringify(state.filmes)
}
