import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import NoteItem from "../../NoteItem/NoteItem";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((store) => store.notes);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDesc, setNewNoteDesc] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_NOTES" });
  }, []);

  const handleNote = () => { // Function that dispatches ADD_NOTE action with title and description as the payload // 
    dispatch({ type: "ADD_NOTE", payload: { title: newNoteTitle, description: newNoteDesc } });
    setNewNoteTitle(""); // Resets input fields when a new note is added and action is dispatched // 
    setNewNoteDesc("");
  };

  return (
    <>
    <Container className="mt-4"> 
      <h1>Create a Note</h1>
      <form>  {/* Creating a form for users to add a new note, input fields are for title/description */}
        <TextField 
          label="Title"
          variant="outlined"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)} 
          placeholder="Enter note title"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          value={newNoteDesc}
          onChange={(e) => setNewNoteDesc(e.target.value)}
          placeholder="Enter note description"
          multiline
          rows={5}
          fullWidth
          margin="normal"
        /> {/* Button that dispatches ADD_NOTE action when clicked and adds new note to the database */}
        <Button variant="contained" color="primary" onClick={handleNote}>
          Save Note
        </Button>
      </form>

      <h2 className="mt-4">Notes</h2>
      <TableContainer> {/* MaterialUI table with ID, Title, Desc, and Timestamp as the table head columns */}
        <Table>
          <TableHead>
            <TableRow> 
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note) => ( // Mapping over all notes, importing NoteItem to display correct user notes form/table //
              <NoteItem key={note.id} note={note} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </>
  );
};

export default Notes;
