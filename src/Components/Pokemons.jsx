import { useContext, useEffect } from 'react';
import ThemeContext from '../context/ThemeContext';
import { Link } from "react-router-dom";
import '../styles/Pokemons.css'

const imgHttps = (num) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ num }.png`
const ENDPOINT = (value) => `?offset=${value}&limit=20`

function Pokemons() {
  const {pokemons, fetchPokemon} = useContext(ThemeContext);

  useEffect(() => {fetchPokemon("")}, [])

  const criateCard = () => {
    const {results} = pokemons
    return results.map((pokemon) => {
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

  const changePage = () => {
    const {results, previous} = pokemons
    const last = +results[results.length -1].url.slice(34, -1)
    const links = []

    if (last === 20) {
      for (let index = 0; index < 5; index++) {
        if (index === 0) {
          links.push(<p className='CurrentPage' key={`page ${index}`}>1</p>)
        } else {
          links.push(<p key={`page ${index}`} onClick={() => fetchPokemon(ENDPOINT(index * 20))}>{1 + index }</p>)
        }
      }
    } else if (last === 40) {
      for (let index = 0; index < 5; index++) {
        if (index === 0) {
          links.push(<p key={`page ${index}`} onClick={() => fetchPokemon(ENDPOINT(0))}>1</p>)
        } else if (index === 1) {
          links.push(<p className='CurrentPage' key={`page ${index}`}>2</p>)
        } else {
          links.push(<p  key={`page ${index}`} onClick={() => fetchPokemon(ENDPOINT(index * 20))}>{index + 1}</p>)
        }
      }
    } else {
      if (last > 60) {
        links.push(<h5>...</h5>)
      }
      for (let index = 0; index < 5; index++) {
        if (last > 40 && index === 2) {
          links.push(<p className='CurrentPage' key={`page ${index}`}>{last / 20}</p>)
        } else {
          links.push(<p key={`page ${index}`} onClick={() => fetchPokemon(ENDPOINT(((last / 20) - 3 + index) * 20))}>{(last / 20) - 2 + index }</p>)
        }
      }
    }

    return (
      <div className='pagesDiv'>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        {previous? <span onClick={ () => fetchPokemon(ENDPOINT(last - 40))} className="material-symbols-outlined">arrow_back_ios</span>
         : null}
        {links}
        {last >=900 ? null: <h5>...</h5>}
        {last === 980? null: (<span  onClick={ () => fetchPokemon(ENDPOINT(last))} className="material-symbols-outlined">arrow_forward_ios</span>)}

        
      </div>
    )
  }
  
  return (
    Object.keys(pokemons).includes('results')? 
      <div>
        <h2>PokeDex</h2>
        <div className='PokemonsColction'>
          {criateCard()}
        </div>
        {changePage()}
      </div>
    : <h5>Loading...</h5>
  );
}

export default Pokemons;