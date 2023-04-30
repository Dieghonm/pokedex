import { useContext, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';

const imgHttps = (num) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ num }.png`


function Main() {
  const {pokemons, fetchPokemon} = useContext(ThemeContext);
  useEffect(() => {fetchPokemon()}, [])

  const criateCard = () => {
    console.log(pokemons.results)
    return pokemons.results.map((pokemon) => {
      console.log(pokemon);
      return (
        <div>
          <h4>{pokemon.url.slice(34, -1)} - {pokemon.name}</h4>
          <img src={imgHttps(pokemon.url.slice(34, -1))} alt="" />
        </div>
      )
    })
  }
  



  return (
    <div>
      {pokemons? 
        <div>
          <h2>PokeDex</h2>
          {criateCard()}
          <button onClick={() => fetchPokemon(pokemons.next)}>Proxima pagina</button>
        </div>
      : <p>Loading...</p>}
    </div>
  );
}

export default Main;