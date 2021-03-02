import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { pokeDetalleAccion } from '../redux/pokeDucks';

const Detalle = () => {
    const dsipatch = useDispatch()
    useEffect(() => {
        const fetchData = () => {
            dsipatch(pokeDetalleAccion())
        }
        fetchData()
    }, [dsipatch])
    const pokemones = useSelector((store) => store.pokemones.unPokemon)
    return (
        <div className='card mt-4 text-center' >
            {
                pokemones && 
                    <div className="card-body">
                    <img src={pokemones.foto} alt='imagen de pokemon' className='img-fluid'/>
                        <div className="card-title">
                            {pokemones.nombre}
                        </div>
                        <p className="card-text">
                            alto: { pokemones.alto } || ancho: { pokemones.ancho }
                        </p>
                    </div>
            }
        </div>
    )
}

export default Detalle
