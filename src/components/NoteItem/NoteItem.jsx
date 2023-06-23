import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TableRow, TableCell, TextField, Button } from "@mui/material"; // MaterialUI imports for styling //
import moment from "moment"; // Moment.js import for displaying formatted timestamps // 

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();
  const [newNoteTitle, setNewNoteTitle] = useState(note.title); 
  const [newNoteDesc, setNewNoteDesc] = useState(note.description);
  const [isEditable, setIsEditable] = useState(false);

  const handleEdit = () => { // Handles the clicking of the edit button //
    setIsEditable(true);
  };

  const handleCancel = () => {
    setIsEditable(false);
  }

  const handleUpdate = () => { // Function dispatching update action when updated note is saved //
    dispatch({
      type: "UPDATE_NOTE",
      payload: { // Sending the updated title and description as the payload so it correctly updates the note. Also sends the note ID
        // to make sure it's updating the correct note //
        title: newNoteTitle,
        description: newNoteDesc,
        noteId: note.id,
      },
    });
    setIsEditable(false);
  };

  const handleDelete = () => { // Function dispatching delete action when a note is deleted by the user //
    dispatch({ type: "DELETE_NOTE", payload: { noteId: note.id } });
  };

  return (
    <TableRow>
      <TableCell>
        {isEditable ? ( // Conditional check to see if note is being edited or not. If it is, a text field will be displayed allowing
        // the user to edit the existing note's title // 
          <TextField
            type="text"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
          />
        ) : ( // If the note is not being edited, it will just display that note's title //
          note.title
        )}
      </TableCell>
      <TableCell>
        {isEditable ? ( // Conditional check to see if note is being edited or not. If it is, a text field will be displayed allowing
        // the user to edit the existing note's description //
          <TextField
            multiline
            rows={3}
            value={newNoteDesc}
            onChange={(e) => setNewNoteDesc(e.target.value)}
          />
        ) : ( // If the note is not being edited, it will just display that note's description //
          note.description
        )}
      </TableCell>
      <TableCell>{moment(note.timestamp).calendar()}</TableCell> {/* Using moment.js to display timestamp in MM/DD/YYYY format */}
      <TableCell>
        {isEditable ? (
          <>
          <Button variant="contained" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Save
          </Button>
          </>
        ) : (
          <>
            <Button variant="contained" color="primary" onClick={handleEdit}> {/* Edit button calling the handleEdit function
            when clicked */}
              Edit
            </Button>{" "}
            <Button variant="contained" color="error" onClick={handleDelete}> {/* Delete button calling the handleDelete
            function when clicked */}
              Delete
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default NoteItem;
