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
  }, [dispatch]);

  const handleNote = () => {
    dispatch({ type: "ADD_NOTE", payload: { title: newNoteTitle, description: newNoteDesc } });
    setNewNoteTitle("");
    setNewNoteDesc("");
  };

  return (
    <Container className="mt-4">
      <h1>Create a Note</h1>
      <form>
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
        />
        <Button variant="contained" color="primary" onClick={handleNote}>
          Save Note
        </Button>
      </form>

      <h2 className="mt-4">Notes</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes.map((note) => (
              <NoteItem key={note.id} note={note} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Notes;
