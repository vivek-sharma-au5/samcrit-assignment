const NotesSchema = require("../models/notes_schema");

const notesCRUD = {
  async saveNewNote(obj) {
    try {
      let res = new NotesSchema({
        url: obj.url,
        username: obj.username,
        title: obj.title,
        notes: obj.notes,
      });
      await res.save();
      console.log(res);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
  async getNote(obj) {
    try {
      let res = await NotesSchema.findOne({ url: obj.url });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
  async getSearchNote(obj) {
    try {
      let title = obj.title;
      let pattern = title
        .split("")
        .map((x) => {
          return `(?=.*${x})`;
        })
        .join("");
      let regex = new RegExp(`${pattern}`, "gi");
      let res = await NotesSchema.find({
        title: { $regex: regex },
      });
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
  async getAllNotes(obj) {
    try {
      let res = await NotesSchema.find();
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
  async updateNote(obj) {
    try {
      let res = await NotesSchema.findByIdAndUpdate(
        obj._id,
        {
          $set: {
            username: obj.username,
            title: obj.title,
            notes: obj.notes,
          },
        },
        { new: true }
      );
      console.log(res);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  },
};

module.exports = notesCRUD;
