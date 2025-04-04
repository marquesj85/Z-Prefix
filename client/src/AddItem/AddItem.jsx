import {useManager} from '../Context';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Logout/Logout';
import { useNavigate } from 'react-router-dom';
import './AddItem.css'

export default function AddItem(){

const {loggedIn} = useManager()
const [userid, setUserid] = useState([])
const [newitem, setNewitem] = useState({
  Item_Name: "",
  Description: "",
  Quantity: ""
})
const moveto = useNavigate()

useEffect(() => {
  fetch(`http://localhost:3000/users/${loggedIn}`)
    .then(res=>res.json())
    .then(data => {
      // console.log('fetched data:', data.Id)
      setUserid(data.Id)
})
    .catch(err=>console.error(err))
}, [loggedIn])

function additem(){
  fetch('http://localhost:3000/items', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        UserId: userid,
        Item_Name: newitem.Item_Name,
        Description: newitem.Description,
        Quantity: newitem.Quantity
      })
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log("server response:", data)
      console.log(data.success)
      if(data.success == true){
        alert('New Item Created! Redirecting to Item List!')
        moveto('/items')
      }else{
        alert('Item Creation Failed')
      }
    })

}


return (
  <>
  <div className="loggedin">
        <button><Link to={'/'}>HOME</Link></button>
        <button><Link to={'/items'}>ALL ITEMS</Link></button>
      {loggedIn && <p>Logged in as: {loggedIn}</p>}
      {Logout()}
      </div>
       <div className="additem-form">
      <h2>Add Item</h2>
      <form onSubmit={(stop) => {
          stop.preventDefault();
          additem();
        }}
      >
        <div>
          <label>Item Name</label>
          <input
            type="text"
            value={newitem.Item_Name}
            onChange={(name) => setNewitem({ ...newitem, Item_Name: name.target.value })}
            required
          />
        </div>
        <div>
          <label>Item Description</label>
          <input
            type="text"
            value={newitem.Description}
            onChange={(desc) => setNewitem({ ...newitem, Description: desc.target.value })}
            required
          />
        </div>
        <div>
          <label>Item Quantity</label>
          <input
            type="text"
            value={newitem.Quantity}
            onChange={(qty) => setNewitem({ ...newitem, Quantity: qty.target.value })}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </>

)


}