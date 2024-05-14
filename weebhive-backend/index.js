import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from WeebHive backend!');
});

app.get('/api/users', (req, res) => {
  res.send({marci: admin})
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
