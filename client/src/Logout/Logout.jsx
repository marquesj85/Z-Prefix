import { useManager } from '../Context'
import { useNavigate } from 'react-router-dom';

export default function Logout() {

  const {loggedIn, setLoggedin} = useManager()
  const moveto = useNavigate()

  const logOut = () => {
    setLoggedin('')
    localStorage.removeItem('loggedIn')
    moveto('/')
  }

  if (loggedIn == '') return null

  return <button onClick={logOut}> Logout</button>
}