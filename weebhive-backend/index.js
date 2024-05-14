import express from 'express';
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const __dirname = dirname(fileURLToPath(import.meta.url));

const usersJsonPath = join(__dirname, 'users.json');

app.get('/', (req, res) => {
  res.send('Hello from WeebHive backend!');
});

app.get('/api/users', async (req, res) => {
  const users = await readFile(usersJsonPath, 'utf-8');
  res.send(users)
})

app.post('/api/users', async (req, res) => {
  try {
    const request = req.body;
    const data = await readFile(usersJsonPath, 'utf-8');
    const users = await JSON.parse(data);
    const id = users.users[users.users.length-1].id + 1;
    request.id = id;

    users.users.push(request);  

    const saveData = JSON.stringify(users, null, 2);

    await writeFile(usersJsonPath, saveData, 'utf-8');

    res.status(201).send({ message: 'Write complete', request });
  } catch (error) {
    console.error('Error handling the request:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  } 
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
