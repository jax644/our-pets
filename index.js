const express = require('express')
const app = express()
app.use(express.json())

const PORT = 4000

app.use(express.static('public'))

let pets = [ 
    {
        "name": "Evie",
        "species": "Cat",
        "human(s)": "Jacqueline & John",
        "image": "images/evie.png"
    },
    {
        "name": "Bear",
        "species": "Cat",
        "human(s)": "Jacqueline & John",
        "image": "images/bear.png"
    },
    {
        "name": "Artemis",
        "species": "Cat",
        "human(s)": "Pom",
        "image": "images/artemis.png"
    },
    {
        "name": "Luna",
        "species": "Cat",
        "human(s)": "Pom",
        "image": "images/luna.png"
    },
    {
        "name": "Kona",
        "species": "Dog",
        "human(s)": "Scott",
        "image": "images/kona.png"
    }
]

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html")
})

app.get('/api/pets', (request, response) => {
    response.json(pets)
})

app.get('/api/pets/:name', (request, response) => {
    const name = request.params.name
    const pet = pets.find(pet => pet.name === name)

    if (pet) {
        response.json(pet)
    } else {
        response.status(404).end()
    }
})

app.get('/api/pets/species/:species', (request,response) => {
    const species = request.params.species
    const speciesMembers = pets.filter(pet => pet.species === species)

    if (speciesMembers.length > 0) {
        response.json(speciesMembers)
    } else {
        response.status(404).end()
    }

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})