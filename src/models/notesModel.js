const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        content: { type: String },
        status: { type: String, enum: ['pending', 'completed', 'postponed'], default: 'pending' },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
