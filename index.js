const express = require('express')
const app = express()

const fs = require('fs')
const _ = require('lodash')
const users = []

fs.readFile('users.json', {encoding: 'utf8'}, (err,data) => {
    if (err) throw err
    
    JSON.parse(data).forEach((user) => {
        user.name.full = _.startCase(`${user.name.first} ${user.name.last}`)
        users.push(user)
    })
})

app.set('views', './views')
app.set('view engine', 'jade')

app.get('/', (req, res) => {
  res.render('index', {users: users})
})

app.get(/big.*/, (req,res, next) => {
    console.log('BIG USER ACCESS')
    next()
})

app.get(/.*dog.*/, (req, res, next) => {
    console.log('DOG GOES WOOF')
    next()
})

app.get('/:username', (req, res) => {
    const username = req.params.username
    res.send(username)
})

var server = app.listen(3000, () => {
    console.log(`Server running at http://localhost ${server.address().port}`)
})