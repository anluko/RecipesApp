const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = "H6nv=WN!?d85[/7;bCBr'~{KL*9";

const getUsers = async (req, res) => {
  const users = await Users.findAll();
  res.status(201).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) return res.status(400).json({ error: 'ID должен быть числом' });

  const user = await Users.findByPk(id);
  if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

  res.status(200).json(user);
};

const addUser = async (req, res) => {
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
};

const login = async (req, res) => { 
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

    const token = jwt.sign({ userId: user.Id }, secretKey, { expiresIn: '1h' });

    res.json({ token });
    console.log(token);
  } catch (error) {
    console.log('Ошибка сервера', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

const protected = (req, res) => {
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
};

module.exports = { getUsers, getUserById, addUser, login, protected };