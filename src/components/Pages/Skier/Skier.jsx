import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestItem from "../../QuestItem/QuestItem";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"; // Importing MaterialUI for styling


export default function Skier() {
    const dispatch = useDispatch();
    const traderId = 3; // Set the trader ID for Skier //

    useEffect(() => { // Runs the FETCH_TRADER_QUESTS action using trader ID to filter quests upon page re-render //
        dispatch({ type: "FETCH_TRADER_QUESTS", payload: traderId });
      }, []);
    
      const quests = useSelector((store) => store.quests); // Pulling quests from the Redux store // 
    
      const handleComplete = (questId) => { // Dispatching the MARK_COMPLETE action when a quest is marked complete //
        dispatch({ type: "MARK_COMPLETE", payload: { questId: questId } });
      };
    
      const handleUndo = (questId) => {
        dispatch({ type: 'UNDO_COMPLETION', payload: { questId: questId } });
      };

    return (
        <>
            <div>
                <h1>Skier's Quests</h1>
                <TableContainer>
                    <Table> {/* Table element for displaying quests */}
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell> {/* Headers for the table */}
                                <TableCell>Description</TableCell>
                                <TableCell>Mark Complete</TableCell>
                                <TableCell>Completed?</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quests.map((quest) => ( // Mapping over quests and using the item ID as a key when rendering 
                            // QuestItem component //
                                <QuestItem key={quest.id} quest={quest} handleComplete={handleComplete} handleUndo={handleUndo}
                                traderId={traderId}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}