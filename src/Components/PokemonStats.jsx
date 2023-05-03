import { Link, useLocation } from "react-router-dom";
import ThemeContext from '../context/ThemeContext';
import { useContext, useEffect, useState } from "react";
// import "../styles/PokemonStats.css"

function PokemonStats() {
  const [pokemonNumber, setPokemonNumber] = useState()
  const {pokemons, fetchPokemon} = useContext(ThemeContext);
  const number = useLocation().pathname.slice(9)

  useEffect(() => {
    setPokemonNumber(number);
    fetchPokemon(number)
  }, [])
  
  const nextPokemon = () => {
    const numberNextPokemon = +pokemonNumber + 1
    setPokemonNumber(numberNextPokemon)
    fetchPokemon(numberNextPokemon)
  }

  const pokemonStats = () => {
    const {name, sprites, types, weight, stats, abilities, id} = pokemons

    const Types = () => {
      let answer = ''
      types.forEach((type) => answer = answer + ` / ${type.type.name[0].toUpperCase() + type.type.name.substr(1)}`);
      return answer.slice(2)
    }

    const Stats = () => {
      const data = stats.map((stat) => {return(
        <div key={stat.stat.name}>
          <h6>{stat.stat.name}</h6> 
          <h6>{stat.base_stat}</h6> 
        </div>
      )});
      return (
        <div>
          <h5>Status</h5>
          {data}
        </div>
      )
    }

    const Abilities = () => {
      console.log(abilities);
      let answer = ''
      abilities.forEach((abilitie) => answer = answer + ` / ${abilitie.ability.name[0].toUpperCase() + abilitie.ability.name.substr(1)}`);
      return (<div>
        <h4>Habilidades</h4>
        <h5>{answer.slice(2)}</h5>
        </div>)
    }

    return (
      <div className="pokemonStatsDiv">
        <h3>{`Nº ${id} - ${name[0].toUpperCase() + name.substr(1)}`}</h3>
        <div className="PokemonImgDiv">
          <img src={sprites.front_default} alt="imagem do pokemon" className="PokemonImg" />
          <h5>Tipo</h5> <p>{Types()}</p>
          <h5>Peso</h5> <p>{weight}</p>
        </div>
          {Stats()}
          {Abilities()}
          <button ><Link to={`/pokedex`}>Voltar</Link></button>
          <button onClick={() => nextPokemon()}>Proximo</button>
          {console.log(pokemons)}
        
      </div>
    )
  }


  return(
    Object.keys(pokemons).includes('name') ?
    pokemonStats()
    : <h1>loading...</h1>
  )

}




export default PokemonStats;