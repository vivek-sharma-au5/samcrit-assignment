var express = require("express");
var router = express.Router();
const notesCRUD = require("../controllers/notes_CRUD");

router.post("/getNotes", async (req, res) => {
  try {
    let notes = await notesCRUD.getNote(req.body);
    res.status(200).json({ status: true, notes: notes });
  } catch (err) {
    res.status(409).json({ status: false });
  }
});

router.post("/getSearchNotes", async (req, res) => {
  try {
    let notes = await notesCRUD.getSearchNote(req.body);
    res.status(200).json({ status: true, notes: notes });
  } catch (err) {
    res.status(409).json({ status: false });
  }
});

router.get("/getAllNotes", async (req, res) => {
  try {
    let notes = await notesCRUD.getAllNotes();
    res.status(200).json({ status: true, notes: notes });
  } catch (err) {
    res.status(409).json({ status: false });
  }
});

router.post("/saveNewNote", async (req, res) => {
  try {
    let notes = await notesCRUD.saveNewNote(req.body);
    res.status(200).json({ status: true, notes: notes });
  } catch (err) {
    res.status(409).json({ status: false, message: "Note Creation Failed" });
  }
});

module.exports = router;
