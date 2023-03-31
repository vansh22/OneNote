const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult, check } = require("express-validator");
const router = express.Router();

// ROUTE 1 : Fetch all notes of the user using GET "api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const fetchedNotes = await Note.find({ user: req.user.id });
    res.json({ fetchedNotes });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE 2 : Add a New Note using POST "api/notes/addnote". Login required.
router.post(
  "/addnote",
  fetchuser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // bad request: 400 (client side error)
      }

      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json({ savedNote });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// ROUTE 3 : Update an existing note using PUT "api/notes/updatenote" .Login required.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    let newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Not found");

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({ note });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ROUTE 4 : Delete an existing note using DELETE "api/notes/deletenote" .Login required.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // Find the note to be deleted and delete it
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).send("Not found");

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
