import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import NoteItem from "../../NoteItem/NoteItem";
import "./Notes.css";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((store) => store.notes);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDesc, setNewNoteDesc] = useState("");

  useEffect(() => {
    dispatch({ type: "FETCH_NOTES" }); // Fetches the notes from the server when the component mounts
  }, []);

  const handleNote = () => {
    dispatch({
      type: "ADD_NOTE",
      payload: { title: newNoteTitle, description: newNoteDesc },
    });
    setNewNoteTitle("");
    setNewNoteDesc("");
  };

  return (
    <>
      <div className="notes-page">
        <div className="background-imagenotes" />
        <div style={{ marginTop: "2rem" }} />
        <Container className="mt-4" style={{ marginTop: "2rem" }}>
          {/* Form container */}
          <Paper elevation={3} className="form-container">
            <form>
              {/* Input field for note title */}
              <TextField
                label="Title"
                variant="filled"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)} // Handles the input text for the new note's title
                placeholder="Enter note title"
                fullWidth
                margin="normal"
              />
              {/* Input field for note description */}
              <TextField
                label="Description"
                variant="filled"
                value={newNoteDesc}
                onChange={(e) => setNewNoteDesc(e.target.value)} // Handles the input text for the new note's description
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
          </Paper>

          <div style={{ marginTop: "2rem" }} />

          {/* Container for the table */}
          <div className="table-container">
            {/* Table for displaying the list of notes */}
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{
                width: "100%",
                margin: "0 auto",
                backgroundColor: "rgba(255, 255, 255, 0.75)",
              }}
            >
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    {/* Table columns */}
                    <TableCell sx={{ maxWidth: 300 }}>Title</TableCell>
                    <TableCell
                    sx={{
                      maxWidth: 300,
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                    }}
                  >
                      Description
                    </TableCell>
                    <TableCell sx={{ width: 150 }}>Timestamp</TableCell>
                    <TableCell sx={{ width: 150 }} align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Mapping over the notes array and rendering NoteItem for each note */}
                  {notes.map((note) => (
                    <NoteItem key={note.id} note={note} /> // Passing note as a prop to NoteItem component
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Notes;
