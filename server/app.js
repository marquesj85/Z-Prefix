const express = require('express');

const app = express();
const PORT = 3000
const knex = require('knex')(require ('./knexfile.js')['development']);
const cors = require('cors')

app.use(cors())
app.use(express.json())

//----------------Basic Functionality-------------

app.get('/', (req, res) => {
  res.send("Application is up and running")
})

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});

//---------------GET Section----------------------

app.get('/items', (req, res) => {
  knex('item_table')
    .select('*' )
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message: 'Data not found'
      })
    )
})

app.get('/users', (req, res) => {
  knex('user_table')
    .select('First_Name', 'Last_Name')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message: 'Data not found'
      })
    )
})

// app.get('/items/:id', (req, res) => {
//   let getId = req.params.id
//   knex('item_table')
//     .select('*')
//     .where({'Id': parseInt(getId)})
//     .then(items => res.json(items))
// })

app.get('/items/:Username', (req, res) => {
  let {Username} = req.params;
  console.log('Username param:', Username);
    knex('item_table')
    .join('user_table', 'item_table.UserId', '=', 'user_table.Id')
    .select('item_table.*')
    .where('user_table.Username', Username)
    .then(items => res.json(items))
    .catch(err =>
      res.status(404).json({
        message: 'Data not found'
      })
    )
})

app.get('/users/:Username', (req, res) => {
  let {Username} = req.params;
  console.log('Username param:', Username);
  knex('user_table')
    .select('Id')
    .where({Username: Username})
    .first()
    .then(id => res.json(id))
    .catch(err =>
      res.status(404).json({
        message: 'Data not found'
      })
    )
})
//-------------POST Section-----------------------

app.post('/users', (req, res) => {
  const {First_Name, Last_Name, Username, Password} = req.body
  knex('user_table')
    .insert({First_Name, Last_Name, Username, Password})
    .then(() => {
      res.json({success: true, message: 'user created'})
    })
})

app.post('/items', (req, res) => {
  const {UserId, Item_Name, Description, Quantity} = req.body
  knex('item_table')
    .insert({UserId, Item_Name, Description, Quantity})
    .then(() => {
      res.json({success: true, message: 'item created'})
    })
})

app.post('/login', (req, res) => {
  const {Username, Password} = req.body;

  const manager = knex('user_table')
                  .where("Username", Username)
                  .first();
  const managerpw = knex('user_table')
                    .where("Password", Password)
                    .first()
  if (!manager || !managerpw) {
    return res.status(400).json({success: false, message: "Incorrect username and/or password"})
  }

  res.json({success: true, message: "Credentials verified, login successful"})
})

//---------------PATCH Section----------------------

app.patch('/items/:id', (req, res) => {
  let getId = req.params.id
  const {Item_Name, Description, Quantity} = req.body;
  knex('item_table')
    .where({"Id": parseInt(getId)})
    .update({Item_Name, Description, Quantity})
    .then(() => {
      res.json({success: true, message: 'item modified'})
    })
    .catch(err => {
      res.json(err)
    })
})

//----------------DELETE Section--------------------

app.delete('/items/:id', (req, res) => {
  let getId = req.params.id
  knex('item_table')
    .where({"Id": parseInt(getId)})
    .del()
    .then(() => {
      res.json({success: true, message: 'item deleted'})
    })
})