const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json()); // để xử lý JSON body khi POST

// Đọc dữ liệu từ file
function readData() {
  const data = fs.readFileSync('./data.json', 'utf-8');
  return JSON.parse(data);
}

// GET /users
app.get('/users', (req, res) => {
  const data = readData();
  res.json(data.users);
});

// GET /products
app.get('/products', (req, res) => {
  const data = readData();
  res.json(data.products);
});

// POST /users → thêm user vào file
app.post('/users', (req, res) => {
  const newUser = req.body;
  const data = readData();
  newUser.id = data.users.length + 1;
  data.users.push(newUser);
  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
  res.status(201).json(newUser);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
