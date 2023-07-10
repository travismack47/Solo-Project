import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TableRow, TableCell, TextField, Button, Modal, Box, IconButton } from "@mui/material"; // Material-UI imports //
import moment from "moment";
import Swal from "sweetalert2"; // Importing Sweet Alert //
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./NoteItem.css";

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState(note.title);
  const [newNoteDesc, setNewNoteDesc] = useState(note.description);

  const handleEdit = () => { // Function to handle opening of Modal when editing note //
    setIsModalOpen(true);
  };

  const handleCancel = () => { // Function to handle closing of a Modal when editing note //
    setIsModalOpen(false);
  };

  const handleDelete = () => { // Function to handle deleting a note // 
    dispatch({ type: "DELETE_NOTE", payload: { noteId: note.id } });
  };

  const handleUpdate = () => { // Function to handle updating a note // 
    dispatch({
      type: "UPDATE_NOTE",
      payload: {
        title: newNoteTitle,
        description: newNoteDesc,
        noteId: note.id,
      },
    });
    swal2(); // Call the Swal2 function to display a success message //
  };

  const swal = () => { // Function to handle the delete confirmation alert using Sweet Alert //
    Swal.fire({
      title: 'Are you sure?', // Alert title
      text: "You won't be able to revert this!", // Alert text //
      icon: 'warning', // Alert icon // 
      showCancelButton: true, // Show cancel button //
      confirmButtonColor: '#f50000', // Confirm button color // 
      cancelButtonColor: '#0021f5', // Cancel button color // 
      confirmButtonText: 'Yes, delete it!' // Confirm button text // 
    }).then((result) => { // Handle user's choice // 
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!', // Success message title // 
          'Your note has been deleted.', // Success message text //
          'success', // Success message icon // 
          handleDelete() // Call handleDelete() function if user confirms // 
        );
      };
    });
  };

  const swal2 = () => { // Function to display a success message when note is updated using Sweet Alert //
    let timerInterval;
    Swal.fire({
      title: "Note has been updated!", // Success message title //
      html: 'I will close in <b></b> milliseconds.', // Success message HTML content //
      timer: 1200, // Timer duration in milliseconds //
      timerProgressBar: true, // Show timer progress bar //
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    setIsModalOpen(false); // Closes the note edit modal //
  };

  return (
    <>
      <TableRow>
        <TableCell align="center">{note.title}</TableCell>
        <TableCell align="center">{note.description}</TableCell>
        <TableCell align="center">{moment(note.timestamp).calendar()}</TableCell>
        <TableCell>
          <div className="edit-delete-btns">
            <IconButton onClick={handleEdit}>
              <EditIcon /> {/* Edit icon */}
            </IconButton>
            <IconButton onClick={swal}>
              <DeleteIcon /> {/* Delete icon */}
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
      <Modal
        open={isModalOpen}
        onClose={handleCancel}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box sx={{ bgcolor: "blanchedalmond", p: 4 }}>
          <p>Edit Note</p>
          <TextField
            type="text"
            label="Title"
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            multiline
            rows={3}
            label="Description"
            value={newNoteDesc}
            onChange={(e) => setNewNoteDesc(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="secondary" onClick={handleCancel} id="cancel-btn">
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdate} id="save-btn">
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default NoteItem;
