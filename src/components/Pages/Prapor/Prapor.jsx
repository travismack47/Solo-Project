import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestItem from "../../QuestItem/QuestItem";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function Prapor() {
  const dispatch = useDispatch();
  const traderId = 1;

  useEffect(() => {
    dispatch({ type: "FETCH_TRADER_QUESTS", payload: traderId });
  }, []);

  const quests = useSelector((store) => store.quests);

  return (
    <>
      <div>
        <h1>Prapor's Quests</h1>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Mark Complete</TableCell>
                <TableCell>Completed?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quests.map((quest) => (
                <QuestItem key={quest.id} quest={quest} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
