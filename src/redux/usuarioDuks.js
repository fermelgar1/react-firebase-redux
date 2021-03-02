import { auth, firebase } from "../firebase";

//-----data inicial
const dataInicial = {
    loading: false,
    activo:false
}
//-----types

const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_CESION = 'CERRAR_CESION'

//-----reducer
const usuarioReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case USUARIO_ERROR:
            return { ...dataInicial  }
        case USUARIO_EXITO:
            return { ...state, loading:false, activo:true ,user: action.payload }
        case CERRAR_CESION:
            return { ...dataInicial  }
        default:
            return { ...state }
    }

}

export default usuarioReducer

//-----acciones
export const ingresarUsuarioAccion = () => async(dispatch, getSatae) => {
    try {
        dispatch({
            type: LOADING
        })
        const provider = new firebase.auth.GoogleAuthProvider()
        const res = await auth.signInWithPopup(provider)  
        dispatch({
            type: USUARIO_EXITO, 
            payload: {
                uid : res.user.uid,
                email: res.user.email
            }
        })   
        localStorage.setItem('usuario',JSON.stringify({uid : res.user.uid, email: res.user.email}))
    } catch (e) {
        console.log('e', e)
        dispatch({
            type: USUARIO_ERROR
        })
    }
     
 }
 export const leerUsuarioAccion = () => (dispatch, getSatae) => {
     try {
         if (localStorage.getItem('usuario')) {
             dispatch({
                 type: USUARIO_EXITO, 
                 payload:JSON.parse(localStorage.getItem('usuario'))
             })
             return
         }
        
     } catch (error) {
         console.log('error', error)
     }
 }
 
 export const cerrarCesionAccion = () => async(dispatch) => {
    try {
        await auth.signOut()
        localStorage.removeItem('usuario')
        dispatch({
            type : CERRAR_CESION
        })
    } catch (error) {
        console.log('error', error)
    }
 }
 
