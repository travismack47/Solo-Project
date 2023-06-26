import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TableRow, TableCell, TextField, Button, Modal, Box } from "@mui/material";
import moment from "moment"; // Moment.js import for displaying formatted timestamps

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();
  const [newNoteTitle, setNewNoteTitle] = useState(note.title);
  const [newNoteDesc, setNewNoteDesc] = useState(note.description);
  const [isEditable, setIsEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsModalOpen(true); // Handles opening the modal when the Edit button is clicked //
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Handles closing the modal when the Cancel button is clicked //
  };

  const handleUpdate = () => {
    dispatch({ 
      type: "UPDATE_NOTE",
      payload: { // Sending the new title, new description, and note ID as the payload //
        title: newNoteTitle,
        description: newNoteDesc,
        noteId: note.id,
      },
    });
    setIsEditable(false);
    setIsModalOpen(false); // Dispatches the update action and closes the modal/ changes edit state when the Save button is clicked //
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_NOTE", payload: { noteId: note.id } }); // Dispatches the delete action when the Delete button is clicked
  };

  return (
    <>
      <TableRow>
        <TableCell>
          {isEditable ? ( 
            <TextField
              type="text"
              value={newNoteTitle} // Displays existing note's title text //
              onChange={(e) => setNewNoteTitle(e.target.value)} // Handles the input text for the updated title //
            />
          ) : (
            note.title // Displays the note's title when not in edit mode //
          )}
        </TableCell>
        <TableCell>
          {isEditable ? (
            <TextField
              multiline
              rows={3}
              value={newNoteDesc} // Displays existing notes description text //
              onChange={(e) => setNewNoteDesc(e.target.value)} // Handles the input text for the updated description //
            />
          ) : (
            note.description // Displays the note's description when not in edit mode //
          )}
        </TableCell>
        <TableCell>{moment(note.timestamp).calendar()}</TableCell> {/* Displays the formatted timestamp using Moment.js */}
        <TableCell>
          {isEditable ? (
            <>
              {/* Cancel button */}
              <Button variant="contained" color="secondary" onClick={handleCancel}> {/* Handles canceling a note edit */}
                Cancel
              </Button>
              {/* Save button */}
              <Button variant="contained" color="primary" onClick={handleUpdate}> {/* Handles submitting an updated note */}
                Save
              </Button>
            </>
          ) : (
            <>
              {/* Edit button */}
              <Button variant="contained" color="primary" onClick={handleEdit}> {/* Handles switching to edit mode on a note */}
                Edit
              </Button>{" "}
              {/* Delete button */}
              <Button variant="contained" color="error" onClick={handleDelete}> {/* Handles deleting an existing note */}
                Delete
              </Button>
            </>
          )}
        </TableCell>
      </TableRow>
      {/* Modal for editing note */}
      <Modal
  open={isModalOpen}
  onClose={handleCancel}
  sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} // Styles the modal to be centered both horizontally 
  // and vertically on the page //
>
  <Box sx={{ bgcolor: "background.paper", p: 4 }}> {/* Sets the background color of the modal */}
    {/* Title input field */}
    <TextField
      type="text"
      label="Title"
      value={newNoteTitle}
      onChange={(e) => setNewNoteTitle(e.target.value)}
      fullWidth
      sx={{ mb: 2 }} // Adds margin bottom to the input field // 
    />
    {/* Description input field */}
    <TextField
      multiline
      rows={3}
      label="Description"
      value={newNoteDesc}
      onChange={(e) => setNewNoteDesc(e.target.value)}
      fullWidth
      sx={{ mb: 2 }} // Adds margin bottom to the input field //
    />
    {/* Cancel button */}
    <Button variant="contained" color="secondary" onClick={handleCancel} sx={{ mr: 2 }}> {/* Styles the cancel button */}
      Cancel
    </Button>
    {/* Save button */}
    <Button variant="contained" color="primary" onClick={handleUpdate}> {/* Styles the save button */}
      Save
    </Button>
  </Box>
</Modal>
    </>
  );
};

export default NoteItem;
