import React, { useState } from 'react';
import { request, gql } from 'graphql-request';

function ItemSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const query = gql`
        {
          items(name: "${searchTerm}") {
            id
            name
            basePrice
            baseImageLink
          }
        }
      `;
      const data = await request('https://api.tarkov.dev/graphql', query);
      setItems(data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={searchTerm} 
          onChange={handleInputChange}
          placeholder="Search for an item..."
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {items.map(item => (
          <li key={item.id}> <img src={item.baseImageLink} alt={item.name} /> {item.name} ₽{item.basePrice}</li>
        ))}
      </ul>
    </div>
  );
}

export default ItemSearch;