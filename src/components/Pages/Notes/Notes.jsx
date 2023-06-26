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
    dispatch({ type: "FETCH_NOTES" }); // Fetches the notes from the server when the component mounts //
  }, []);

  const handleNote = () => {
    dispatch({ type: "ADD_NOTE", payload: { title: newNoteTitle, description: newNoteDesc } }); // Dispatches ADD_NOTE action with title and description as the payload //
    setNewNoteTitle(""); // Resets input fields when a new note is added and action is dispatched //
    setNewNoteDesc("");
  };

  return (
    <>
      <Container className="mt-4">
        <h1>Create a Note</h1>
        <form>
          {/* Input field for note title */}
          <TextField
            label="Title"
            variant="outlined"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)} // Handles the input text for the new note's title //
            placeholder="Enter note title"
            fullWidth
            margin="normal"
          />
          {/* Input field for note description */}
          <TextField
            label="Description"
            variant="outlined"
            value={newNoteDesc}
            onChange={(e) => setNewNoteDesc(e.target.value)} // Handles the input text for the new note's description //
            placeholder="Enter note description"
            multiline
            rows={5}
            fullWidth
            margin="normal"
          />
          {/* Button for saving the new note */}
          <Button variant="contained" color="primary" onClick={handleNote}>
            Save Note
          </Button>
        </form>

        <h2 className="mt-4">Notes</h2>
        {/* Table for displaying the list of notes */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {/* Table columns */}
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Mapping over the notes array and rendering NoteItem for each note */}
              {notes.map((note) => (
                <NoteItem key={note.id} note={note} /> // Passing note as a prop to NoteItem component //
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Notes;
