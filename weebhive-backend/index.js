import express from 'express'
import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())

const __dirname = dirname(fileURLToPath(import.meta.url))

const usersJsonPath = join(__dirname, 'users.json')

app.get('/', (req, res) => {
  res.send('Hello from WeebHive backend!')
})

app.get('/api/users', async (req, res) => {
  const users = await readFile(usersJsonPath, 'utf-8')
  res.send(users)
})

app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = parseInt(req.params.id)
    const data = await readFile(usersJsonPath, 'utf-8')
    const users = await JSON.parse(data).users
    const user = users.find((user) => user.id === userId)
    if (!user) {
      return res.status(404).send({ message: 'User not found' }) // Send a 404 if no user is found
    }

    res.send(user)
  } catch (err) {
    res.status(500).send({ message: 'An error occurred', error: error.message })
  }
})

app.post('/api/users', async (req, res) => {
  try {
    const request = req.body
    const data = await readFile(usersJsonPath, 'utf-8')
    const users = await JSON.parse(data)
    const id = users.users[users.users.length - 1].id + 1;
    if(users.users.find(user=>user.id === id)){
      request.id = id + 13
    }
    request.id = id


    const favorites = [ ];
    request.favorites = favorites

    users.users.push(request)

    const saveData = JSON.stringify(users, null, 2)

    await writeFile(usersJsonPath, saveData, 'utf-8')

    res.status(201).send({ message: 'Write complete', request })
  } catch (error) {
    console.error('Error handling the request:', error)
    res.status(500).send({ error: 'Internal Server Error' })
  }
})

app.patch('/api/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id)
  const data = await readFile(usersJsonPath, 'utf-8')
  const users = await JSON.parse(data).users
  const anime_id = req.body

  const updateUsers = users.map((user) => {
    if (user.id === userId && !user.favorites.includes(anime_id.favorites)) {

      user.favorites.push(anime_id.favorites)
    }
    return user
  })
  const final = {users: [...updateUsers]}
  const fml = JSON.stringify(final, null, 2)
  const updateJson = await writeFile(usersJsonPath, fml, 'utf-8')

  res.send(updateJson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
