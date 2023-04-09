const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET route for reading the currently stored notes
notes.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => {
      res.json(JSON.parse(data))
    });
  });

// POST route for new note
notes.post('/api/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (!title || !text) {
      res.json('Error in adding note, please confirm that there is content in both available fields');
    } else {
      
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully! 🚀`);
    }
  });

  module.exports = notes;