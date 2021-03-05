import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { cerrarCesionAccion } from '../redux/usuarioDuks'

const Navbar = (props) => {
    const dispatch = useDispatch()
    const { activo } = useSelector(store => store.usuario)
    const cerrarCesion = () => {
        dispatch(cerrarCesionAccion())
        props.history.push('/login')
    }

    // const usuario = useSelector(state => state.usuario)
    

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className='ms-3 navbar-brand' to='/' >APP Poke</Link>
            <div>
                <div className="d-flex">
                {   !activo ?
                        <NavLink className='btn btn-dark me-2' to='/login'>Login</NavLink>
                        :
                        <>
                            <NavLink className='btn btn-dark me-2' to='/' exact>Inicio</NavLink>
                            <NavLink className='btn btn-dark me-2' to='/perfil' exact>perfil</NavLink>
                            <button 
                            onClick = { cerrarCesion }
                            className="btn btn-dark me-2">Cerrar sesion</button>
                        </>
                }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)
