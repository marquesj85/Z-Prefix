import {useManager} from '../Context'
import {useState, useEffect} from 'react'
import Logout from '../Logout/Logout'
import { Link } from 'react-router-dom';

export default function Items() {

  const {loggedIn} = useManager()
  const [itemlist, setItemlist] = useState([])


  useEffect(() => {
    fetch(`http://localhost:3000/items/${loggedIn}`)
      .then(res=>res.json())
      .then(data => {
        // console.log('fetched data:', data)
        setItemlist(data)
  })
      .catch(err=>console.error(err))
  }, [loggedIn])

  return (
    <>
       <div className="loggedin">
       <button><Link to={'/'}>HOME</Link></button>
      <p>Logged in as: {loggedIn}</p>
      {Logout()}
      </div>
      <h1>{loggedIn} Item List</h1>
      <button><Link to={'/additem'}>Add Item</Link></button>
      <div>
        <ul>
          {itemlist.map(item => (
            <li key={item.Id}>
              Item Name: {item.Item_Name}<br>
              </br>
              Description: {item.Description}<br>
              </br>
              Quantity: {item.Quantity}<br>
              </br>
              </li>
          ))}
        </ul>
      </div>
    </>
  )
}