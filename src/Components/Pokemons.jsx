import { useContext, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';
import { Link } from "react-router-dom";
import '../styles/Pokemons.css'

const imgHttps = (num) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ num }.png`

function Pokemons() {
  const {pokemons, fetchPokemon} = useContext(ThemeContext);
  useEffect(() => {fetchPokemon("")}, [])

  const criateCard = () => {
    return pokemons.results.map((pokemon) => {
      const name = pokemon.name[0].toUpperCase() + pokemon.name.substr(1)
      const number = pokemon.url.slice(34, -1)
      return (
        <Link 
          to={`/pokedex/${number}`}
          className='PokemonCard'
          key={name} 
        >
          <h4>{number} - {name}</h4>
          <img src={imgHttps(pokemon.url.slice(34, -1))} alt={`${name} imagem`}/>
        </Link>
      )
    })
  }
  
  return (
    Object.keys(pokemons).includes('results')? 
      <div>
        <h2>PokeDex</h2>
          <div className='PokemonsColction'>
            {criateCard()}
          </div>
        {pokemons.previous? <button onClick={() => fetchPokemon(pokemons.previous.slice(34))}>Pagina anterior</button> : null}
        <button onClick={() => fetchPokemon(pokemons.next.slice(34))}>Proxima pagina</button>

      </div>
    : <p>Loading...</p>
  );
}

export default Pokemons;