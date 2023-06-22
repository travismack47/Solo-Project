import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TableRow, TableCell, TextField, Button } from "@mui/material";
import moment from "moment";

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();
  const [newNoteTitle, setNewNoteTitle] = useState(note.title);
  const [newNoteDesc, setNewNoteDesc] = useState(note.description);
  const [isEditable, setIsEditable] = useState(false);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleUpdate = () => {
    dispatch({
      type: "UPDATE_NOTE",
      payload: {
        title: newNoteTitle,
        description: newNoteDesc,
        noteId: note.id,
      },
    });
    setIsEditable(false);
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_NOTE", payload: { noteId: note.id } });
  };

  return (
    <TableRow>
      <TableCell>{note.id}</TableCell>
      <TableCell>
        {isEditable ? (
          <TextField
            type="text"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
          />
        ) : (
          note.title
        )}
      </TableCell>
      <TableCell>
        {isEditable ? (
          <TextField
            multiline
            rows={3}
            value={newNoteDesc}
            onChange={(e) => setNewNoteDesc(e.target.value)}
          />
        ) : (
          note.description
        )}
      </TableCell>
      <TableCell>{moment().subtract(10, 'days').calendar()}</TableCell>
      <TableCell>
        {isEditable ? (
          <Button variant="contained" color="success" onClick={handleUpdate}>
            Save
          </Button>
        ) : (
          <>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit
            </Button>{" "}
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default NoteItem;
