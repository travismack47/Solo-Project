import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();
  const [newNoteTitle, setNewNoteTitle] = useState(note.title);
  const [newNoteDesc, setNewNoteDesc] = useState(note.description);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_NOTES' })
  }, [dispatch]);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleUpdate = () => {
    dispatch({ type: "UPDATE_NOTE", payload: { title: newNoteTitle, description: newNoteDesc, noteId: note.id } });
    setIsEditable(false);
    setNewNoteTitle('');
    setNewNoteDesc('');
  };

  const handleDelete = () => {
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
