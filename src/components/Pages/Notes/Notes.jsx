import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoteItem from "../../NoteItem/NoteItem";

export default function Notes() {
  const dispatch = useDispatch();
  const notes = useSelector((store) => store.notes);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteDesc, setNewNoteDesc] = useState('');

    console.log(notes);
  useEffect(() => {
    dispatch({ type: "FETCH_NOTES" });
  }, [dispatch]);

  const handleNote = () => {
    dispatch({ type: "ADD_NOTE", payload: { title: newNoteTitle, description: newNoteDesc } });
    setNewNoteTitle('');
    setNewNoteDesc('');
  };

  return (
    <>
      <div>
        <input type="text" value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} placeholder="Title" />
        <input type="text" value={newNoteDesc} onChange={(e) => setNewNoteDesc(e.target.value)} placeholder="Description" />
        <button onClick={handleNote}>Submit</button>
      </div>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </>
  );
}
