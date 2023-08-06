import { useState } from 'react'
import './assets/styles/App.css'
import { Auth } from './Components/Auth';
import { Board } from './Components/Board'
import Cookies from "universal-cookie"

const cookies = new Cookies()

function App() {
  const[isAuth, setIsAuth] = useState(cookies.get('auth_token'))

  if (!isAuth) {
    return (
      <div className='container'>
        <Auth setIsAuth={setIsAuth} />
      </div>
    )
  } else {
    return (
      <Board />
    )
  }
}

export default App
