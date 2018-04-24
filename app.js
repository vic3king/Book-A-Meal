import express from 'express';
import bodyParser from 'body-parser';

import MealRoutes from './server/routes/mealRoutes';


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const apiPrefix = '/api/v1';

// ..Routes
app.use(`${apiPrefix}/meals`, MealRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Book-A-Meal');
});

app.listen(3000);
