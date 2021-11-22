import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  try {
    res.json({ message: 'Hello Cat Sitters!' });
  } catch (error) {
    next(error);
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);
