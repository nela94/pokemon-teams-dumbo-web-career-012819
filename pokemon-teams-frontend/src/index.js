const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let buttonTag = null
let mainTag = document.querySelector('main')

document.addEventListener('DOMContentLoaded',() => {
  trainerCards()
  })


buttonTag =  document.querySelector('button')

mainTag.addEventListener('click', (e) => {
  if (e.target.innerText === 'Add Pokemon'){

    trainerId = parseInt(e.target.parentElement.dataset.id)
    addPokemon(trainerId)
    .then((pokemon) => {
      let ulTag = e.target.parentElement.querySelector('ul')
      return ulTag.innerHTML += renderPokemon(pokemon)
      })
    }
  else if (e.target.innerText === 'Release'){
      console.log(something)
       deletePokemon(e.target.dataset.pokemonId).then(e.target.parentElement.remove())

      }
})


const trainerCards = () => {
  return fetch(TRAINERS_URL)
  .then(response => response.json())
  .then((parsedReponse) => {
    parsedReponse.forEach((trainer) => {
    return mainTag.innerHTML += renderTrainer(trainer)
    })
  })
}

const renderTrainer = (trainer) => {
  // const ulTag = document.createElement('ul')
  let divTag = `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
                    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
                    <ul>`
  let pokemonArray = trainer.pokemons.forEach((pokemon) => {
  divTag += `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
  })
  divTag += `</ul></div>`
  return divTag
}

const renderPokemon = (pokemon) => {
  return `<li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
}




const addPokemon = (id) => {
  const configObj = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'trainer_id': id
    })
  }

  return fetch(POKEMONS_URL, configObj)
    .then((response) => {
      return response.json()
    })
}

const deletePokemon = (id) => {
  return fetch(`http://localhost:3000/pokemons/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
 // .then(response => response.json())
}
