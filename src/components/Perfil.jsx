import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actualizarUsuarioAccion, editarFotoAccion } from '../redux/usuarioDuks'

const Perfil = () => {
    const usuario = useSelector(store => store.usuario.user)
    const { loading } = useSelector(store => store.usuario)

    const dispatch = useDispatch()

    const [nombreUsuario, setNombreUsuario] = useState(usuario.displayName)
    const [activarFormulario, setActivarFormulario] = useState(false)
    const [error, setError] = useState(null)

    const actualizarUsuario = () => {
        if (!nombreUsuario.trim()) {
            setError('Llene los campos')
            return
        }
        dispatch(actualizarUsuarioAccion(nombreUsuario))
        setActivarFormulario(false)
        setError(null)
    }

    const seleccionarArchivo = (e) => {
        console.log('e', e.target.files[0])
        const imagen = e.target.files[0]
        if (imagen === undefined) {
            console.log('selecciona un archivo')
            return
        }
        if (imagen.type === 'image/jpeg') {
            dispatch(editarFotoAccion(imagen))
        } else {
            setError('selecciona una imagen')
            return
        }
        setError(null)
    }


    return (
        <div className='text-center mt-5 card'>
            <div className="card-body">
                <img className='img-fluid' src={usuario.photoURL} alt="" />
                <h5 className="card-title">Nombre: {usuario.displayName}</h5>
                <p className="card-text">Correo: {usuario.email}</p>
                <button
                    className="btn btn-dark"
                    disabled={loading}
                    onClick={() => setActivarFormulario(true)}
                >
                    Editar nombre usuario
                </button>
                <input
                    type="file" className="form-control"
                    id="inputGroupFile04"
                    style={{ display: 'none' }}
                    onChange={(e) => seleccionarArchivo(e)}
                    disabled={loading}
                />
                <label
                    className="btn btn-dark ms-4"
                    htmlFor="inputGroupFile04"
                >
                    Actualizar imagen
                    </label>
                {
                    loading &&
                    <div className="spinner-border m-5" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
                {
                    error &&
                    <div className="alert alert-warning">
                        {error}
                    </div>
                }
            </div>
            {
                activarFormulario &&
                <div className="card-body" >
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="input-group mb-3">
                                <input
                                    value={nombreUsuario}
                                    type="text"
                                    className="form-control"
                                    placeholder="Recipient's username"
                                    aria-describedby="button-addon2"
                                    disabled={loading}
                                    onChange={(e) => setNombreUsuario(e.target.value)}
                                />
                                <button
                                    className="btn btn-dark"
                                    type="button"
                                    id="button-addon2"
                                    disabled={loading}
                                    onClick={() => actualizarUsuario()}
                                >
                                    actualizar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Perfil
