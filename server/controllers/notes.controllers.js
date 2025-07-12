import NotesModel from "../models/notes.model.js";

// Helper function for standardized error responses
const handleServerError = (res, message = "Internal server error") => {
  return res.status(500).json({ message });
};

const getAllNotes = async (_req, res) => {
  try {
    const notes = await NotesModel.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    return handleServerError(res);
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await NotesModel.findById(id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json(note);
  } catch (error) {
    return handleServerError(res);
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newNote = new NotesModel({ title, content });
    const savedNote = await newNote.save();

    return res.status(201).json(savedNote);
  } catch (error) {
    return handleServerError(res, "Failed to create note");
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const updatedNote = await NotesModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json(updatedNote);
  } catch (error) {
    return handleServerError(res, "Failed to update note");
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await NotesModel.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    return handleServerError(res, "Failed to delete note");
  }
};

export { getAllNotes, getNoteById, createNote, updateNote, deleteNote };
