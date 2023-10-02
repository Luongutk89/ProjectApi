const noteService = require('../services/noteService');

exports.createNote = async (req, res) => {
    const noteData = req.body;

    try {
        const authorId = req.user._id;
        const newNote = await noteService.createNote(noteData, authorId);

        return res.status(200).json({
            error: false,
            message: "Note created successfully!",
            data: newNote
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};



exports.getNotes = async (req, res) => {
    try {
        const query = req.query.isDeleted;
        const authorId = req.user;

        const notes = await noteService.getNotes(authorId, query);
        return res.status(200).json({
            error: false,
            message: "Successfully retrieved notes!",
            data: notes
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};

exports.getNoteById = async (req, res) => {
    try {
        // const query = req.query.isDeleted;
        const noteId = req.params.noteId;
        const authorId = req.user;
        const note = await noteService.getNoteById(noteId, authorId);

        if (!note) {
            return res.status(404).json({
                error: true,
                message: 'Không tìm thấy ghi chú hoặc bạn không có quyền truy cập.'
            });
        }

        return res.status(200).json({
            error: false,
            message: 'Successfully retrieved note details!',
            data: note
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};




exports.updateNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const updatedNoteData = req.body;

        const updatedNote = await noteService.updateNote(noteId, updatedNoteData);

        if (!updatedNote) {
            return res.status(404).json({
                error: true,
                message: "Note not found.",
            });
        }

        return res.status(200).json({
            error: false,
            message: "Note updated successfully!",
            data: updatedNote,
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};



exports.deleteNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const deletedNote = await noteService.deleteNote(noteId);

        if (!deletedNote) {
            return res.status(404).json({
                error: true,
                message: "Note not found.",
            });
        }

        return res.status(200).json({
            error: false,
            message: "Note deleted successfully!",
            data: deletedNote,
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};


exports.deleteNoteTemporarily = async (req, res) => {
    try {
        const noteId = req.params.noteId;

        const deletedNote = await noteService.deleteNoteTemporarily(noteId);

        if (!deletedNote) {
            return res.status(404).json({
                error: true,
                message: "Note not found.",
            });
        }

        return res.status(200).json({
            error: false,
            message: "Note temporarily deleted successfully!",
            data: deletedNote,
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};



exports.restoreNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;
        const restoredNote = await noteService.restoreNote(noteId);

        if (!restoredNote) {
            return res.status(404).json({
                error: true,
                message: "Note not found.",
            });
        }

        return res.status(200).json({
            error: false,
            message: "Note restored successfully!",
            data: restoredNote,
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};



exports.searchNotes = async (req, res) => {
    try {
        const keyword = req.query.keyword;
        const searchResults = await noteService.searchNotes(keyword);

        return res.status(200).json({
            error: false,
            message: "Search results retrieved successfully!",
            data: searchResults,
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};


exports.filterNotes = async (req, res) => {
    try {
        const status = req.query.status;
        const filteredNotes = await noteService.filterNotes(status);

        return res.status(200).json({
            error: false,
            message: "Filter results retrieved successfully!",
            data: filteredNotes,
        });
    } catch (err) {
        return res.status(500).json({
            error: true,
            message: err.message,
        });
    }
};




