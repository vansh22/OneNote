import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const Addnote = ({ showAlert }) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Added successfully", "success");
  };
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <i className="fa-solid fa-pen me-2" style={{fontSize: "1.5rem"}}></i>
        <h2 className="my-3">Make a Note</h2>
      </div>
      <form className="my-3" onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={handleOnChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={handleOnChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={handleOnChange}
          />
        </div>
        <button type="submit" className="custom-btn">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
