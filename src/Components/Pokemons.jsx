import { useContext, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';
import '../styles/Pokemons.css'

const imgHttps = (num) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ num }.png`

function Pokemons() {
  const {pokemons, fetchPokemon} = useContext(ThemeContext);
  useEffect(() => {fetchPokemon()}, [])

  const pokemonChoice = (num) => {
    console.log(num);
  }

  const criateCard = () => {
    return pokemons.results.map((pokemon) => {
      const name = pokemon.name[0].toUpperCase() + pokemon.name.substr(1)
      const number = pokemon.url.slice(34, -1)
      return (
        <div className='PokemonCard' key={name} onClick={() => pokemonChoice(number)}>
          <h4>{number} - {name}</h4>
          <img src={imgHttps(pokemon.url.slice(34, -1))} alt={`${name} imagem`}/>
        </div>
      )
    })
  }
  
  return (
    <div>
      <h2>PokeDex</h2>
      {pokemons? 
        <div className='PokemonsColction'>
          {criateCard()}
        </div>
      : <p>Loading...</p>}
      {pokemons.previous? <button onClick={() => fetchPokemon(pokemons.previous)}>Pagina anterior</button> : null}
      <button onClick={() => fetchPokemon(pokemons.next)}>Proxima pagina</button>
      {console.log(pokemons)}
    </div>
  );
}

export default Pokemons;