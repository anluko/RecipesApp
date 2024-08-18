const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Users = require('./models/Users');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const secretKey = "H6nv=WN!?d85[/7;bCBr'`~{KL*9";

app.get('/users', async (req, res) => {
  const users = await Users.findAll();
  res.status(201).json(users);
});

app.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByPk(id);
  res.status(200).json(user);
});

// Регистрация
app.post('/addUser', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    const newUser = await Users.create({
      ...req.body,
      Password: hashedPassword,
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Ошибка при добавлении пользователя' });
  }
});

// Логин
app.post('/login', async (req, res) => {
  const { Login, Password } = req.body;

  try {
    const user = await Users.findOne({ where: { Login } });

    if (!user) {
      console.log('Неверный логин');
      return res.status(400).json({ error: 'Неверный логин' });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);

    if (!isPasswordValid) {
      console.log('Неверный пароль');
      return res.status(400).json({ error: 'Неверный пароль' });
    }

    // Генерация JWT
    const token = jwt.sign({ userId: user.Id }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.log('Ошибка сервера', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Пример защищенного маршрута
app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Токен не предоставлен' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Неверный токен' });
    }

    res.json({ message: 'Доступ разрешен', userId: decoded.userId });
  });
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
console.log(`Сервер успешно работает на порту: ${PORT}`);
});