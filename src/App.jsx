import React, { useEffect, useState } from "react";
import Pokemon from "./components/Pokemon";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";


function App() {
  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(() => {
    const fetchUser = () => {
        auth.onAuthStateChanged(user => {
        console.log('user', user)
        if (user) {
          setFirebaseUser(user)
        } else {
          setFirebaseUser(null)
        }
      })    
    }
    fetchUser()
    
  }, [])

  const RutaProtegida = ({component, path, ...res}) => {
    if (localStorage.getItem('usuario') && firebaseUser ) {
      const usuarioStorage = JSON.parse(localStorage.getItem('usuario'))
      if (usuarioStorage.uid === firebaseUser.uid) {
        return <Route component = { component } path={ path } { ...res } />
      }
    } else {
      return<Redirect to='/login'{ ...res } />
    }
  }
  

  return firebaseUser !== false ? (
    <Router>
      <div className="container mt-3">
        <Navbar/>
        <Switch>
          <RutaProtegida component={ Pokemon } path='/' exact/>
          <Route component={ Login } path='/login' exact/>
        </Switch>
      </div>
    </Router>
  ):(
    <div>Cargando...</div>
  )
}

export default App;
