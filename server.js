const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')



const app = express()

app.set("view engine", "ejs")

//loading static folder
app.use('/static', express.static(path.join(__dirname, "public")))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 3000

app.use(cookieParser())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 
  }
}))

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

// Define a router for /login route
const router = require('./router');

// Use the router for /route/login route
app.use('/route',router); // Updated the route

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/route/home')
  } else {
    res.render('login', { message: '', errmsg: "" })
  }
})

app.use((req,res)=>{
    res.status(404).render('error.ejs',  {title : '404'})
})

app.listen(port, () => {
    console.log("Listening to the server at port 3000")
})