const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// list out the cohorts
server.get('/api/cohorts', async (req, res) => {
  try {
    const cohorts = await db('cohorts'); // gets all of the records from the table
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// list cohort by id
server.get('/api/cohorts/:id', async (req, res) => {
  try {
    const cohort = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

// list students from cohort w the specified id
server.get('/api/cohorts/:id/students', (req, res) => {
  try {
    const cohort = await db('cohorts')
      .innerJoin('students', 'cohorts.id', 'students.cohort_id')
      .select('cohorts.name', 'students.name')
      .where({ cohort_id: req.params.id })

    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

const errors = {
  '19': 'Another record with that value already exists!'
}

// create new cohorts
server.post('/api/cohorts', async (req, res) => {
  try {
    const [id] = await db('cohorts').insert(req.body);
    const cohorts = await db('cohorts')
      .where({ id })
      .first();
    res.status(201).json(cohorts);
  } catch (error) {
    const message = errors[error.errno] || 'We ran into an error';
    res.status(500).json({ message, error });
  }
});

// update cohorts
server.put('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .update(req.body);

    if(count > 0) {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Cohorts not found' });
    }
  } catch (error) {
  } 
});

server.delete('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
    .where({ id: req.params.id })
    .del();
    
    if(count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Cohorts not found!' });
    }
  } catch (error) {
  }
})



const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);

