const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  username: { type: String },
  url: { type: String },
  title: { type: String },
  notes: { type: String },
});

module.exports = mongoose.model("notes", NotesSchema);
