import { useManager } from '../Context'
import { useNavigate } from 'react-router-dom';
import './Logout.css';
export default function Logout() {

  const {loggedIn, setLoggedin} = useManager()
  const moveto = useNavigate()

  const logOut = () => {
    setLoggedin('')
    localStorage.removeItem('loggedIn')
    moveto('/')
  }

  if (loggedIn == '') return null

  return <button className="logout-button" onClick={logOut}> Logout</button>
}