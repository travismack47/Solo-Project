import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TableRow, TableCell, TextField, Button, Modal, Box } from "@mui/material"; // Material-UI imports //
import moment from "moment"; // Moment.js import for displaying formatted timestamps
import Swal from "sweetalert2";

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();
  const [newNoteTitle, setNewNoteTitle] = useState(note.title);
  const [newNoteDesc, setNewNoteDesc] = useState(note.description);
  const [isEditable, setIsEditable] = useState(false); // Default edit state is set to false //
  const [isModalOpen, setIsModalOpen] = useState(false); // Default modal open display is set to false //

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

  const swal = () => { // Sweet alert function that pops up when the delete button is clicked asking user to confirm if they want
    // to delete that note. If they click yes, a success alert pops up and the note is deleted //
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your note has been deleted.',
          'success',
          handleDelete() // Handles deleting the note if user confirms the delete on the alert //
        );
      };
    });
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
          {isEditable ? ( // Displays these buttons when the note is in edit mode //
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
          ) : ( // Displays these buttons when the note is not in edit mode //
            <>
              {/* Edit button */}
              <Button variant="contained" color="primary" onClick={handleEdit}> {/* Handles switching to edit mode on a note */}
                Edit
              </Button>{" "}
              {/* Delete button */}
              <Button variant="contained" color="error" onClick={swal}> {/* Handles deleting an existing note */}
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
            onChange={(e) => setNewNoteTitle(e.target.value)} // Handles the text of the newly edited note title //
            fullWidth
            sx={{ mb: 2 }} // Adds margin bottom to the input field // 
          />
          {/* Description input field */}
          <TextField
            multiline
            rows={3}
            label="Description"
            value={newNoteDesc}
            onChange={(e) => setNewNoteDesc(e.target.value)} // Handles the text of the newly edited note description //
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
