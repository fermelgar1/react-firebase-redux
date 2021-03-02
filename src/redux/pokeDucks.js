import axios from "axios";

//-----constatntes-----//
const dataInical = {
   count: 0,
   next: null,
   previous: null,
   results: []
}

const OBTENER_POKEMON_EXITO = 'OBTENER_POKEMON_EXITO'
const OBTENER_INFO_POKEMON_EXITO = 'OBTENER_INFO_POKEMON_EXITO'

//-----reducer-----//
export default function pokeReducer (state = dataInical, action){
    switch (action.type) {
        case OBTENER_POKEMON_EXITO:
            return { ...state, ...action.payload } 
        case OBTENER_INFO_POKEMON_EXITO:
            return { ...state, unPokemon: action.payload }
            default:
                return state
            }
        }


//-----acciones-----/
export const obtenerPokemonAccion = () => async(dispatch) => {
    if (localStorage.getItem('offset=0')) {
        dispatch({
            type: OBTENER_POKEMON_EXITO, 
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    }
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)
        dispatch({
            type: OBTENER_POKEMON_EXITO, 
            payload: res.data
        })
        localStorage.setItem('offset=0', JSON.stringify(res.data))
    } catch (error) {
        console.log('error', error)
    }
}

export const siguientePokemonAccion = () => async(dispatch, getState) =>{
    const { next } = getState().pokemones
    try {
        const res = await axios.get(`${next}`)
        dispatch({
            type: OBTENER_POKEMON_EXITO, 
            payload: res.data
        })
        
    } catch (errorT) {
        console.log('errorT', errorT)
    }    
}

export const anteriorPokemonAccion = ()=> async(dispatch, getState) => {
    const { previous } = getState().pokemones
    try {
        const res = await axios.get(previous)
        dispatch({
            type: OBTENER_POKEMON_EXITO,
            payload: res.data
        })
    } catch (errort) {
        console.log('errort', errort)
    }
}

export const pokeDetalleAccion = (url = 'https://pokeapi.co/api/v2/pokemon/ditto') => async(dispatch, getState) => {

    if (url==='https://pokeapi.co/api/v2/pokemon/ditto' && localStorage.getItem('https://pokeapi.co/api/v2/pokemon/ditto')) {
        dispatch(
            {
                type: OBTENER_INFO_POKEMON_EXITO,
                payload: JSON.parse(localStorage.getItem('https://pokeapi.co/api/v2/pokemon/ditto'))
            }
        )   
        return
    }

    try {
        const res = await axios.get(url)
        console.log('res', res.data)
        dispatch(
            {
                type: OBTENER_INFO_POKEMON_EXITO,
                payload:{
                    nombre: res.data.name,
                    ancho: res.data.weight,
                    alto:res.data.height,
                    foto: res.data.sprites.front_default
                }
            }
        )
        if(url==='https://pokeapi.co/api/v2/pokemon/ditto'){
            const data  = {
                nombre: res.data.name,
                ancho: res.data.weight,
                alto:res.data.height,
                        foto: res.data.sprites.front_default
            }
            localStorage.setItem('https://pokeapi.co/api/v2/pokemon/ditto', JSON.stringify(data))
        }
    } catch (e) {
        console.log('e', e)    
    }
}

