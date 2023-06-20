import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Therapist() {
  const dispatch = useDispatch();
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    dispatch({ type: 'FETCH_TRADER_QUESTS' });
    fetchQuests();
  }, [dispatch]);

  const fetchQuests = () => {
    axios
      .get('/api/quests/2')
      .then((response) => {
        setQuests(response.data);
      })
      .catch((error) => {
        console.log('Error fetching quests:', error);
      });
  };

  return (
    <>
    <div>
      <h1>Therapist's Quests</h1>
      {quests.map((quest) => (
        <div key={quest.id}>
          <h3>{quest.name}</h3>
          <p>{quest.description}</p>
          <p>Complete: {quest.is_complete ? 'Yes' : 'No'}</p>
        </div>
      ))}
    </div>
    </>
  );
}
