import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();
  const [newNoteTitle, setNewNoteTitle] = useState(note.title);
  const [newNoteDesc, setNewNoteDesc] = useState(note.description);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => { // Runs on page re-render and fetches user notes, re-renders when a new action is dispatched //
    dispatch({ type: 'FETCH_NOTES' })
  }, [dispatch]);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleUpdate = () => { // Function to handle the submitting of an updated existing note //
    dispatch({ type: "UPDATE_NOTE", payload: { title: newNoteTitle, description: newNoteDesc, noteId: note.id } });
    setIsEditable(false);
    setNewNoteTitle('');
    setNewNoteDesc('');
  };

  const handleDelete = () => { // Function to handle deleting an existing note //
    dispatch({ type: "DELETE_NOTE", payload: { noteId: note.id } });
  };

  return (
    <div>
      {isEditable ? (
        <>
          <input type="text" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} />
          <input type="text" value={newNoteDesc} onChange={(e) => setNewNoteDesc(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <p>{note.title}</p>
          <p>{note.description}</p>
          <p>{moment(note.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default NoteItem;
