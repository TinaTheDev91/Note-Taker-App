const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET route for reading the currently stored notes
notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
      res.json(JSON.parse(data))
    });
  });

// POST route for new note
notes.post('/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (!title || !text) {
      res.json('Error in adding note, please confirm that there is content in both available fields');
    } else {
      
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully! 🚀`);
    }
  });

notes.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        
        const result = json.filter((notes) => notes.id !== id);
  
        writeToFile('./db/db.json', result);
  
        res.json(`Item ${id} has been deleted 🗑️`);
      });
  });

  module.exports = notes;