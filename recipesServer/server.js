const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRoutes = require("./routes/users");
const recipesRoutes = require("./routes/recipes");
const nutrientsRoutes = require("./routes/nutrients");
const ingredientsRoutes = require("./routes/ingredients");
const cautionsRoutes = require("./routes/cautions");
const digestsRoutes = require("./routes/digests");
const linkedRoutes = require("./routes/linkeds");

const jwt = require("jsonwebtoken");
const secretKey = "H6nv=WN!?d85[/7;bCBr'~{KL*9";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/users", usersRoutes);
app.use("/recipes", recipesRoutes);
app.use("/nutrients", nutrientsRoutes);
app.use("/ingredients", ingredientsRoutes);
app.use("/cautions", cautionsRoutes);
app.use("/digests", digestsRoutes);
app.use("/linked", linkedRoutes);

app.get("/protected", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Токен не предоставлен" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Неверный токен" });
    }

    res.json({ message: "Доступ разрешен", userId: decoded.userId });
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Сервер успешно работает на порту: ${PORT}`);
});
