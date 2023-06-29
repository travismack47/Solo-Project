import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestItem from "../../QuestItem/QuestItem";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material"; // Material-UI imports //
import { Pagination } from "@mui/material";
import './Jaeger.css';

export default function Jaeger() {
  const dispatch = useDispatch();
  const traderId = 4;
  const [currentPage, setCurrentPage] = useState(1); // Setting initial page for Pagination //
  const questsPerPage = 5;

  useEffect(() => {
    // Fetch trader quests when the page renders //
    dispatch({ type: "FETCH_TRADER_QUESTS", payload: traderId });
  }, []);

  const quests = useSelector((store) => store.quests);

  const indexOfLastQuest = currentPage * questsPerPage; // Logic to handle changing pages with Pagination //
  const indexOfFirstQuest = indexOfLastQuest - questsPerPage;
  const currentQuests = quests.slice(indexOfFirstQuest, indexOfLastQuest);

  const handleChangePage = (event, page) => { // Setting current page for Pagination //
    setCurrentPage(page);
  };

  return (
    <div className="background-jaeger">
      <div className="jaeger-page">
        {/* Table container */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TableContainer component={Paper} elevation={3} sx={{ width: 1300, margin: "0 auto", 
          backgroundColor: "rgba(255, 255, 255, 0.75)" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ maxWidth: 300 }}>Name</TableCell> {/* Quest name column */}
                  <TableCell sx={{ maxWidth: 700 }}>Description</TableCell> {/* Quest description column */}
                  <TableCell sx={{ width: 150 }}>Mark Complete</TableCell> {/* Mark complete column */}
                  <TableCell sx={{ width: 150 }}>Completed?</TableCell> {/* Completed status column */}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Render quest items */}
                {currentQuests.map((quest) => (
                  <QuestItem key={quest.id} quest={quest} traderId={traderId} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination component */}
          <div style={{ marginTop: "1rem", marginLeft: "auto", marginRight: "auto", width: "fit-content" }}>
            <Pagination
              count={Math.ceil(quests.length / questsPerPage)}
              page={currentPage}
              onChange={handleChangePage}
              color="primary"
              sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
