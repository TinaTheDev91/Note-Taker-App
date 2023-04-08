const express = require('express');
const path = require('path');
const fs = require('fs')

const PORT = process.env.PORT || 3001;

const app = express();


// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './develop/public/notes.html'))
);

// GET Route for */index.html (wildcard)
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './develop/public/index.html'))
);

// GET API route *create callback function?
app.get('/api/notes', (req, res) =>
  fs.readFile('/db.json', 'utf8', );

// POST request
app.post('/api/notes', (req, res) => {
    
})

  app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
