const express = require('express')
const router = express.Router()

//DATABSE
const langs = ["HTML", "CSS", "JAVASCRIPT", "REACT", "NODEJS", "EXPRESS"]
const students = [
  {
    id: 1,
    name: "John Doe",
    age: 20,
    grade: "A",
    subject: "Math",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 22,
    grade: "B",
    subject: "History",
  },
  {
    id: 3,
    name: "Alice Johnson",
    age: 19,
    grade: "C",
    subject: "English",
  },
  {
    id: 4,
    name: "Bob Wilson",
    age: 21,
    grade: "B+",
    subject: "Science",
  },
  {
    id: 5,
    name: "Eve Davis",
    age: 23,
    grade: "A-",
    subject: "Computer Science",
  },
];
const cards = [
  {
    cardHeader: "Mongo DB",
    cardContent: "Use MongoDB as the database to store and manage data in a flexible, scalable, and schema-less manner.",
    cardFooter: "Learn more"
  },
  {
    cardHeader: "Express",
    cardContent: "Use Express.js as the back-end application framework to handle HTTP requests and responses.",
    cardFooter: "Read more"
  },
  {
    cardHeader: "React",
    cardContent: "React is a powerful and efficient JavaScript library for creating dynamic, interactive, and fast UIs.",
    cardFooter: "Learn more"
  },
  {
    cardHeader: "Node",
    cardContent: "Use Node.js as the server-side runtime ENV to run JS code that allows you to build scalable applications..",
    cardFooter: "Read more"
  }
];

const users = [
  { email: 'admin@gmail.com', password: '123' },
  { email: 'midhun@gmail.com', password: '456' }
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const matchingUser = users.find(user => user.email === email && user.password === password);
  if (matchingUser) {
    req.session.user = matchingUser.email;
    res.redirect('/route/home');
  } else {
    res.render('login', { errmsg: "Invalid credentials", message: "" });
  }
});


router.get('/home', (req, res) => {
  if (req.session.user) {
    const emailParts = req.session.user.split('@');
    const name = emailParts[0];
    res.render('home', { name, cards, students, langs })
  } else {
    res.render('login', { errmsg: "Relogin needed", message: "" })
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
      res.render('error',{title: "404"})
    } else {
      res.render('login', { message: "logout Successfully...!", errmsg: "" })
    }
  })
})



module.exports = router;
