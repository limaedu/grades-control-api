// npm init -y
// npm install express
// npm install winston
// npm install -g nodemon

import express from 'express';
import { promises as fs } from 'fs';
import gradesRouter from './grades.js';
import { swaggerDocument } from './documentation.js';
import swaggerUi from 'swagger-ui-express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { readFile, writeFile } = fs;

const app = express();

app.use(express.json());
app.use('/grades', gradesRouter);

global.fileName = 'grades.json';

app.post('/api/login', (req, res) => {
  const body = req.body;

  const user = {
    username: process.env.USER,
    password: process.env.PASSWORD,
  };

  if (user.username === body.username && user.password === body.password) {
    const token = jwt.sign({ user }, process.env.KEY, { expiresIn: 1000 });

    res.send({ token });
  } else {
    res.status(401).send('Login and password are incorrect');
  }
});

export function verifyJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader)
    return res.status(401).json({ auth: false, message: 'No token provided.' });

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).send({ error: 'Token error.' });
  }
  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatted.' });
  }

  jwt.verify(token, process.env.KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Token invalid.' });
    }
    return next();
  });
}

//prettier-ignore
app.use('/grades-control-api/doc',swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Para servir a documentação

// Abrindo a porta do servidor local
app.listen(process.env.PORT || 1000, async () => {
  try {
    await fs.readFile(global.fileName);
    console.log('Door open and File ready to go');
  } catch (err) {
    console.log(err);
  }
});
