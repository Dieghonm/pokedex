import { Link, useLocation } from "react-router-dom";
import ThemeContext from '../context/ThemeContext';
import { useContext, useEffect, useState } from "react";
import "../styles/PokemonStats.css"

function PokemonStats() {
  const [pokemonNumber, setPokemonNumber] = useState()
  const {pokemons, fetchPokemon} = useContext(ThemeContext);
  const number = useLocation().pathname.slice(9)

  useEffect(() => {
    setPokemonNumber(number);
    fetchPokemon(number)
  }, [])
  
  const nextPokemon = (num) => {
    const numberNextPokemon = +pokemonNumber + num
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
        <tr key={stat.stat.name}>
          <td>{stat.stat.name}</td>
          <td>{stat.base_stat}</td> 
        </tr>
      )});
      return (
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {data}
          </tbody>
        </table>
      )
    }

    const Abilities = () => {
      let answer = ''
      abilities.forEach((abilitie) => answer = answer + ` / ${abilitie.ability.name[0].toUpperCase() + abilitie.ability.name.substr(1)}`);
      return (<div>
        <h4>Habilidades</h4>
        <p>{answer.slice(2)}</p>
        </div>)
    }

    return (
      <div className="pokemonStatsDiv">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <div className="PokemonImgDiv">
          <div className="BeforeDiv">
            <span onClick={() => nextPokemon(-1)} className="material-symbols-outlined">arrow_back_ios</span>
          </div>
          <img src={sprites.front_default} alt="imagem do pokemon" className="PokemonImg" />
          <div>
            <h3>  {`Nº ${id} - ${name[0].toUpperCase() + name.substr(1)}`}</h3>
            <p>Tipo - {Types()}</p>
            <p>Peso - {weight/10}kg</p>
          </div>
          <div className="NextDiv">
            <span onClick={() => nextPokemon(1)} className="material-symbols-outlined">arrow_forward_ios</span>
          </div>
        </div>
        <div className="PokemonStats">
          {Stats()}
          {Abilities()}
        </div>
          <button className="VoltarButton" ><Link to={`/pokedex`}>Voltar ao album</Link></button>
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