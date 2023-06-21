import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Notes() {
    const dispatch = useDispatch();
    const notes = useSelector(store => store.notes);

    useEffect(() => {
        dispatch({ type: 'FETCH_NOTES' });
    }, [dispatch]);

    return (
        <>
            {notes.map((note) => (
                <div key={note.id}>
                    <p>{note.title}</p>
                    <p>{note.description}</p>
                    <p>{note.timestamp}</p>
                </div>
            ))}
        </>
    );
}