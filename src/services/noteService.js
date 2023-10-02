const Note = require('../models/notesModel');

exports.createNote = async (noteData, authorId) => {
    const { title, content, status, description } = noteData;
    try {
        const newNote = await Note.create({
            title,
            description,
            content,
            status,
            author: authorId
        });
        return newNote;

    } catch (err) {
        throw new Error('Error creating note');
    }
};


exports.getNotes = async (authorId, query) => {
    try {
        let notes = await Note.find({ author: authorId, isDeleted: query ? query : false });

        // Đảo ngược mảng
        notes.reverse();

        // Sắp xếp lại mảng theo thời gian tạo mới nhất lên trước
        notes.sort((a, b) => b.createdAt - a.createdAt);

        return notes;
    } catch (err) {
        throw new Error('Error retrieving notes for the user');
    }
};


exports.getNoteById = async (noteId, authorId) => {
    try {
        const note = await Note.findOne({ _id: noteId, author: authorId });
        return note;

    } catch (err) {
        throw new Error('Error retrieving notes for the user');
    }
};





exports.updateNote = async (noteId, updatedNoteData) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(noteId, updatedNoteData, { new: true });

        return updatedNote;
    } catch (error) {
        throw new Error('Error updating note');
    }
};



exports.deleteNote = async (noteId) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(noteId);
        return deletedNote;

    } catch (error) {
        throw new Error('Error deleting note');
    }
};



exports.deleteNoteTemporarily = async (noteId) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(noteId, { isDeleted: true }, { new: true });

        return updatedNote;
    } catch (error) {
        throw new Error('Error temporarily deleting note');
    }
};



exports.restoreNote = async (noteId) => {
    try {
        const restoredNote = await Note.findByIdAndUpdate(noteId, { isDeleted: false }, { new: true });
        return restoredNote;
    } catch (error) {
        throw new Error('Error restoring note');
    }
};



exports.searchNotes = async (keyword) => {
    try {
        const searchResults = await Note.find({ title: new RegExp(`^${keyword}`, 'i') });
        return searchResults;
    } catch (error) {
        throw new Error('Error searching notes');
    }
};



exports.filterNotes = async (status) => {
    try {
        const filteredNotes = await Note.find({ status: status });
        return filteredNotes;
    } catch (error) {
        throw new Error('Error searching notes');
    }
};
