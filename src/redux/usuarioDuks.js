import { auth, firebase, db, storage } from "../firebase";

//-----data inicial
const dataInicial = {
    loading: false,
    activo: false
}
//-----types

const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_CESION = 'CERRAR_CESION'
const EDITAR_USUARIO_EXITO = 'EDITAR_USUARIO_EXITO'

//-----reducer
const usuarioReducer = (state = dataInicial, action) => {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true }
        case USUARIO_ERROR:
            return { ...dataInicial }
        case USUARIO_EXITO:
            return { ...state, loading: false, activo: true, user: action.payload }
        case CERRAR_CESION:
            return { ...dataInicial }
        case EDITAR_USUARIO_EXITO:
            return { ...state, loading: false, user: action.payload }
        default:
            return { ...state }
    }

}

export default usuarioReducer

//-----acciones
export const ingresarUsuarioAccion = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LOADING
        })
        const provider = new firebase.auth.GoogleAuthProvider()
        const res = await auth.signInWithPopup(provider)

        const user = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL
        }

        const usuarioDb = await db.collection('usuarios').doc(user.email).get()

        if (usuarioDb.exists) {
            dispatch({
                type: USUARIO_EXITO,
                payload: usuarioDb.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioDb.data()))
        } else {
            await db.collection('usuarios').doc(user.email).set(user)
            dispatch({
                type: USUARIO_EXITO,
                payload: user
            })
            localStorage.setItem('usuario', JSON.stringify(user))
        }

    } catch (e) {
        console.log('e', e)
        dispatch({
            type: USUARIO_ERROR
        })
    }

}
export const leerUsuarioAccion = () => (dispatch, getState) => {
    try {
        if (localStorage.getItem('usuario')) {
            dispatch({
                type: USUARIO_EXITO,
                payload: JSON.parse(localStorage.getItem('usuario'))
            })
            return
        }

    } catch (error) {
        console.log('error', error)
    }
}

export const cerrarCesionAccion = () => async (dispatch) => {
    try {
        await auth.signOut()
        localStorage.removeItem('usuario')
        dispatch({
            type: CERRAR_CESION
        })
    } catch (error) {
        console.log('error', error)
    }
}

export const actualizarUsuarioAccion = (nombreActualizado) => async (dispatch, getState) => {
    try {
        dispatch({
            type: LOADING
        })
        const { user } = getState().usuario
        await db.collection('usuarios').doc(user.email).update({
            displayName: nombreActualizado
        })
        const usuario = {
            ...user,
            displayName: nombreActualizado
        }
        dispatch({
            type: EDITAR_USUARIO_EXITO,
            payload: usuario
        })
        localStorage.setItem('usuario', JSON.stringify(usuario))
    } catch (e) {
        console.log('e', e)
    }
}

export const editarFotoAccion = (imagenEditada) => async (dispatch, getState) => {
    try {
        dispatch({
          type: LOADING
        })
        const { user } = getState().usuario
        const imagenRef = await storage.ref().child(user.email).child('fotoPerfil')
        await imagenRef.put(imagenEditada)
        const imagenURL = await imagenRef.getDownloadURL()

        await db.collection('usuarios').doc(user.email).update({
            photoURL: imagenURL
        })
        const usuario = {
            ...user,
            photoURL: imagenURL
        }
        dispatch(
            {
                type: EDITAR_USUARIO_EXITO,
                payload: usuario
            }
        )
        localStorage.setItem('usuario', JSON.stringify(usuario))
    } catch (error) {
        console.log('error', error)
    }
}

