import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { anteriorPokemonAccion, obtenerPokemonAccion, pokeDetalleAccion, siguientePokemonAccion } from "../redux/pokeDucks";
import Detalle from './Detalle';
const Pokemon = () => {
    const dsipatch = useDispatch()
    const pokemones = useSelector((store) => store.pokemones.results)
    const  { next, previous } = useSelector(store => store.pokemones )
    return (
        <div className='row'>
            <div className="col-md-6">
                   <h3>Lista de pokemones</h3> 
                <br/>
                <ul className='list-group mt-3'>
                    {
                        pokemones.map((item,index)=>(
                            <li className='list-group-item ' key = {index}>
                                { item.name }
                                <button onClick={ () => dsipatch(pokeDetalleAccion(item.url)) } className="btn btn-dark btn-sm float-end"> info </button> 
                             </li>
                        ))
                    }
                </ul>
                <div className="d-flex justify-content-between mt-3">
                    {
                        pokemones.length === 0 &&
                            <button onClick={ () => dsipatch(obtenerPokemonAccion()) } className='btn btn-dark'>
                                obtener Pokemon
                            </button>
                    }

                    {
                        previous &&
                            <button onClick={ ()=> dsipatch(anteriorPokemonAccion()) } className='btn btn-dark'>
                                anterior
                            </button>
                    }

                    {
                        next &&
                            <button onClick={ () => dsipatch(siguientePokemonAccion()) } className='btn btn-dark'>
                                siguiente
                            </button>
                    }
                </div>
            </div>
            <div className="col-md-6">
            <h3>Detalle pokemon</h3>
            <Detalle/>
            </div>
        </div>
    )
}

export default Pokemon
