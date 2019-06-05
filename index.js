
const express = require('express')
const uuid = require('uuid')
const bodyParser = require('body-parser')


const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 4000

const state = require('./state')

app.get('/', (req, res) => {
  res.send("Hello World")
})

app.get('/users', (req, res)=> {
  res.send(state.users)
})
app.get('/users/:id', (req, res)=> {
  const user = state.users.find(c => c._id === parseInt(req.params.id));

  if(!user) return res.status(404).send('The user with this id, was not found')  

  res.send(user)
    
})

//! POST

app.post('/users', (req, res)=> {
  //! require these params 
  const newUser = {
    _id: uuid.v4(),
    name: req.body.name,
    occupation: req.body.occupation,
  }
  console.log(req.body)

  //! if these params are not met
  if(!newUser.name || !newUser.occupation){
    return res.status(400).json({msg: "Please include name and ocupation"})
  } 

  // const newUser = {
  //   _id: uuid.v4(),
  //   name: "Amber Jones",
  //   occupation: "Software Dev",
  // }
//! If info is valid, push the new user and send back the last one
  state.users.push(newUser);
  res.json(state.users[state.users.length -1]);

});

//! PUT
app.put('/users/:id', (req,res)=> {
 const found = state.users.some(user => user._id === parseInt(req.params.id));

  if(found){
    state.users.forEach(user => {
      if(user._id === parseInt(req.params.id)){
        user.name = "Cameron Jones"

        res.json({msg: "Member has been update", user: user})
      }
    })
  } else {
    res.status(400).json({msg: `No member with the id of ${req.params.id}`})
  }
  })

  //! delete 
  app.delete('/users/:id', (req,res)=> {
    const found = state.users.some(user => user._id === parseInt(req.params.id))

    if(found){
      res.json({
        msg: "member Deleted", 
        users: state.users.filter(user => user._id !== parseInt(req.params.id))})
    } else {
      res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
    })


app.post('/users')
app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))
















      // const updMember = req.body;
