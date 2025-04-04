import {useManager} from '../Context'
import {useState, useEffect} from 'react'
import Logout from '../Logout/Logout'
import { Link } from 'react-router-dom';
import './Items.css'

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
       <p className="title">INVENTORY MANAGER</p>
       <button className="button"><Link to={'/'}>HOME</Link></button>
      <p className="log">Logged in as: {loggedIn}</p>
      {Logout()}
      </div>
      <h1>{loggedIn} Item List</h1>
      <button><Link to={'/additem'}>Add Item</Link></button>
      <div className="box">
        <ul>
          {itemlist.length == 0 ? (
            <li>No Items Found</li>
          ) : (
          itemlist.map(item => (
            <li key={item.Id} className="item">
              Item Name: {item.Item_Name}<br />
              Description: {item.Description}<br />
              Quantity: {item.Quantity}<br />
              </li>
          ))
        )}
        </ul>
      </div>
    </>
  )
}