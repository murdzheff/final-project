const PORT = 8080
const express = require('express')
const { MongoClient } = require('mongodb')
const { v1: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})

const uri =
  'mongodb+srv://anjelostoqnov:tinderpassword@cluster1.qy0pp21.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient(uri)
client.connect()

app.post('/signup', async (req, res) => {
    // const client = new MongoClient(uri);
    const { email, password } = req.body

    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        // await client.connect()
        const databaseName = client.db('app-data')
        const users = databaseName.collection('users')


        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return res.status(409).send('User already exists. Plaeace login')
        }
        const sanitizedEmail = email.toLowerCase()

        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail,
            hashes_password: hashedPassword
        }
        const insertedUser = await users.insertOne(data)

        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24
            // token id-то ще си замине след   expiresIn:60*24
        })
        res.status(201).json({ token , userId : generatedUserId})
    } catch (err) {
        res.status(500).send(err)
    }
})

app.post('/login', async (req, res) => {
    // const client = new MongoClient(uri);
    const { email, password } = req.body

    try {
        // await client.connect()
        const databaseName = client.db('app-data')
        const users = databaseName.collection('users')

        const user = await users.findOne({ email })
        const correctPassword = await bcrypt.compare(password, user.hashes_password)

        if (user && correctPassword) {
            const token = jwt.sign(user, email, {
                expiresIn: 60 * 24
            })
            res.status(200).json({ token , userId: user.user_id})

        }
        res.status(400).send('Invalid Credentials')
    } catch (err) {
        console.log(err)
    }


})

app.get('/users', async (req, res) => {
    // const client = new MongoClient(uri);
     try {
         const databaseName = client.db('app-data')
         const users = databaseName.collection('users')
 
         const returnedUsers= await users.find().toArray()
         res.send(returnedUsers)
 
     }finally{
         // await client.close()
     }
 }) 

// USERS BY GANDER
app.get('/gendared-users', async (req, res) => {
    // const client = new MongoClient(uri);
    const gender = req.query.gender
    try {
        // await client.connect()
        const databaseName = client.db('app-data')
        const users = databaseName.collection('users')
        const query ={ gender_identity: {$eq :gender}}
        const foundUsers = await users.find(query).toArray()
      
        res.send(foundUsers)

    }finally{
        // await client.close()
    }
})

// GETTING USER BY ID
app.get('/user', async (req, res) => {
    // const client = new MongoClient(uri);
    const userId = req.query.userId

    try {
        // await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')

        const query = { user_id: userId }
        const user = await users.findOne(query)
        console.log(user)
        res.send(user)

    } finally {
        // await client.close()
    }
})


// CHANGE USERS CHARACTERISTICS
app.put('/user',async (req,res)=>{
    // const client = new MongoClient(uri);
    const formData = req.body.formData
    
    try{
        // await client.connect()
        const databaseName = client.db('app-data')
        const users = databaseName.collection('users')

        const queary = { user_id: formData.user_id  }
        const updateDocument = {
            $set:{
                first_name:formData.first_name,
                dob_day : formData.dob_day,
                dob_month : formData.dob_month,
                dob_year : formData.dob_year,
                show_gender: formData.show_gender,
                gender_identity:formData.gender_identity,
                gender_interest:formData.gender_interest,
                photos: formData.photos,
                about : formData.about,
                mathes : formData.matches

            },
        }
       const insertedUser=  await users.updateOne(queary, updateDocument)
       res.send(insertedUser)
    } finally{
        // await client.close()
    }


})

// MATCHES
app.put('/addmatch', async (req, res)=>{
    //    const client = new MongoClient(uri) 
       const {userId, matchedUserId}=req.body
       try{
        // await client.connect()
        const database=client.db('app-data')
        const users = database.collection('users')
    
        const query = {user_id : userId}
        const updateDocument = {
            $push: {matches: {user_id: matchedUserId}},
        }
       const user =  await users.updateOne(query, updateDocument)
     req.send(user)
       } finally{
    
        // await client.close()
       }
    })
    

// GET ALL USERS BY USER ID
app.get('/users', async (req, res) => {
    // const client = new MongoClient(uri)

    const userIds = JSON.parse(req.query.userIds)

    try {
        // await client.connect()
        const database = client.db('app-data')
        const users = database.collection('users')
        const pipeline =
            [
                {
                    '$match': {
                        'user_id': {
                            '$in': userIds
                        }
                    }
                }
            ]

        const foundUsers = await users.aggregate(pipeline).toArray()

        res.json(foundUsers)

    } finally {
        // await client.close()
    }
})

// MESSAGES BY from_userId and to_userId
app.get('/messages', async (req, res) => {
  const { userId, correspondingUserId } = req.query
  try {
    const database = client.db('app-data')
    const messages = database.collection('messages')
    const query = { from_userId: userId, to_userId: correspondingUserId }
    const foundMessages = await messages.find(query).toArray()
    io.emit("messages", foundMessages)
    res.send(foundMessages)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal server error')
  }
})

// ADD MESSAGES Database
app.post('/message', async (req, res) => {
    const message = req.body.message ;
    console.log(message);
  try {
    const database = client.db('app-data')
    const messages = database.collection('messages')

    const insertedMessage = await messages.insertOne(message)
    console.log(insertedMessage)
//    io.emit('message', insertedMessage) // Emit the new message to all connected clients
    res.send(insertedMessage)

    
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal server error')
  }
})

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`)

  socket.on('message', (data) => {
    io.sockets.emit("messageRes", data);
    console.log(data)
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`)
  })
})

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`)
})
