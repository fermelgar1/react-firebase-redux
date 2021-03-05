import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ingresarUsuarioAccion } from '../redux/usuarioDuks'

const Login = (props) => {
    const dispatch = useDispatch()
    const { loading, activo } = useSelector(store => store.usuario)

    useEffect(() => {
        activo && props.history.push('/')
    }, [activo, props.history])

    return (
        <div className='text-center mt-5'>
            <h3>Ingreso con Google</h3>
            <hr />
            <button
                disabled={loading}
                onClick={() => dispatch(ingresarUsuarioAccion())}
                className="btn btn-dark">acceder</button>
            {
                loading &&
                <div className="spinner-border m-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            }
        </div>
    )
}

export default withRouter(Login)
