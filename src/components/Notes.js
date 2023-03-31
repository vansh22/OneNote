import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
import noteicon from "../images/note-icon.png";

function Notes({ showAlert }) {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    // if search parameter is not given then all notes will be fetched
    return notes?.filter(
      (note) =>
        note.title.toLowerCase().includes(search.toLowerCase()) || // includes() is used to check whether a string contains a substring
        note.description.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleOnSubmit = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Updated successfully", "success");
  };
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control edit-input"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={handleOnChange}
                    value={note.etitle}
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
                    className="form-control edit-input"
                    id="edescription"
                    name="edescription"
                    onChange={handleOnChange}
                    value={note.edescription}
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
                    className="form-control edit-input"
                    id="etag"
                    name="etag"
                    onChange={handleOnChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={handleOnSubmit}
                type="button"
                className="custom-btn"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="d-flex p-2 justify-content-between align-items-center ">
          <div className="d-flex align-items-center">
            <img
              src={noteicon}
              className="note-icon me-1"
              alt="logo"
              style={{ width: "40px", height: "40px" }}
            />
            <h2 className="my-3">My-Notes</h2>
          </div>
          <form
            className="search-box"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <button type="submit">Search</button>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search your notes..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              className="focus"
            />
          </form>
        </div>
        <div className="container ">
          {notes?.length === 0 && "No notes to display."}
        </div>
        {handleSearch()?.map((note) => {
          return (
            <Noteitem
              key={note._id}
              updateNote={updateNote}
              showAlert={showAlert}
              note={note}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
