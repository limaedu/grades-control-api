import express from 'express';
import { promises as fs } from 'fs';
import { verifyJWT } from './index.js';

const router = express.Router();
export default router;

const { readFile, writeFile } = fs;

router.post('/', verifyJWT, async (req, res, next) => {
  try {
    const grades = JSON.parse(await readFile(global.fileName));
    let data = req.body;

    if (!data.student || !data.subject || !data.type || !data.value) {
      throw new Error('Student, subject, type and value are required.');
    }

    data = {
      id: grades.nextId++,
      student: data.student,
      subject: data.subject,
      type: data.type,
      value: data.value,
      timestamp: new Date(),
    };

    grades.grades.push(data);

    await writeFile(global.fileName, JSON.stringify(grades, null, 2));
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const grades = JSON.parse(await readFile(global.fileName));

    res.send(grades.grades);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', verifyJWT, async (req, res, next) => {
  try {
    const grades = JSON.parse(await readFile(global.fileName));
    const id = req.params.id;
    const data = req.body;
    const index = grades.grades.findIndex((grade) => grade.id == id);

    if (index === -1) {
      throw new Error('ID not found.');
    }

    if (!data.student || !data.subject || !data.type || !data.value) {
      throw new Error('Student, subject, type and value are required.');
    }

    if (data.timestamp) {
      throw new Error('Timestamp is not required.');
    }

    grades.grades[index].student = data.student;
    grades.grades[index].subject = data.subject;
    grades.grades[index].type = data.type;
    grades.grades[index].value = data.value;
    grades.grades[index].timestamp = new Date();

    await writeFile(global.fileName, JSON.stringify(grades, null, 2));
    res.send(grades.grades[index]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', verifyJWT, async (req, res, next) => {
  try {
    const grades = JSON.parse(await readFile(global.fileName));
    const id = req.params.id;

    grades.grades = grades.grades.filter((grade) => grade.id != id);

    await writeFile(global.fileName, JSON.stringify(grades, null, 2));

    res.end();
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, _next) => {
  try {
    const grades = JSON.parse(await readFile(global.fileName));
    const id = req.params.id;

    const data = grades.grades.filter((grade) => grade.id == id);

    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get('/totalGrade/:student/:subject', async (req, res, next) => {
  try {
    const grades = JSON.parse(await readFile(global.fileName));
    const student = req.params.student;
    const subject = req.params.subject;

    const data = grades.grades.filter(
      (grade) => grade.student == student && grade.subject == subject
    );

    const totalGrade = data.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);

    res.send(JSON.stringify(`Total Grade: ${totalGrade}`));
  } catch (err) {
    next(err);
  }
});

router.get('/average/:subject/:type', async (req, res, next) => {
  try {
    const grades = JSON.parse(await readFile(global.fileName));
    const subject = req.params.subject;
    const type = req.params.type;

    const data = grades.grades.filter(
      (grade) => grade.subject == subject && grade.type == type
    );

    console.log(data);
    const average =
      data.reduce((acc, curr) => {
        return acc + curr.value;
      }, 0) / data.length;

    res.send(JSON.stringify(`Average: ${average}`));
  } catch (err) {
    next(err);
  }
});

router.get('/threeBest/:subject/:type', async (req, res, next) => {
  try {
    const grades = JSON.parse(await readFile(global.fileName));
    const subject = req.params.subject;
    const type = req.params.type;

    const data = grades.grades.filter(
      (grade) => grade.subject == subject && grade.type == type
    );

    const threeBest = data
      .sort((a, b) => {
        a = a.value;
        b = b.value;
        return b - a;
      })
      .splice(0, 3);

    res.send(threeBest);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(400).send({ error: err.message });
});
