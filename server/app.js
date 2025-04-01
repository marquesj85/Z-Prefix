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
    .select('Item_Name', 'Description', 'Quantity' )
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message: 'Data not found'
      })
    )
})