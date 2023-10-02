const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const authenticateUser = require('../middlewares/authenticateUser');


router.get('/search', authenticateUser, noteController.searchNotes);
router.get('/filter', authenticateUser, noteController.filterNotes);
router.get('/', authenticateUser, noteController.getNotes);
router.post('/', authenticateUser, noteController.createNote);
router.get('/:noteId', authenticateUser, noteController.getNoteById);
router.put('/:noteId', authenticateUser, noteController.updateNote);
router.delete('/:noteId', noteController.deleteNote);
router.patch('/temporary/:noteId', authenticateUser, noteController.deleteNoteTemporarily);
router.patch('/restore/:noteId', authenticateUser, noteController.restoreNote);


module.exports = router;

