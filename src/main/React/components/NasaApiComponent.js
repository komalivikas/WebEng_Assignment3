import React, { useState, useEffect } from 'react';
import './NasaApiComponent.css'; // Import CSS file for styling


const NasaApiComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [count, setCount] = useState(0);

  
  const fetchData = async () => {
    setLoading(true);
    try {
      // Construct API URL based on selected options
      let apiUrl = 'http://localhost:8080/nasa/apod';
      if (date) {
        apiUrl += `?date=${date}`;
      } else if (startDate && endDate) {
        apiUrl += `?start_date=${startDate}&end_date=${endDate}`;
      } else if (count > 0) {
        apiUrl += `?count=${count}`;
      }

      const response = await fetch(apiUrl);
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date, startDate, endDate, count]); // Update data when inputs change

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchData(); // Fetch data when form is submitted
  };

  const handleClear = () => {
    setDate('');
    setStartDate('');
    setEndDate('');
    setCount(0);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="container">
    <h1>NasaApi</h1>
    <form onSubmit={handleFormSubmit}>
      <div className="center">
        <label htmlFor="date">Select Date:</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="center">
        <label htmlFor="startDate">From Date:</label>
        <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className="center">
        <label htmlFor="endDate">To Date:</label>
        <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <div className="center">
        <label htmlFor="count">Count:</label>
        <input type="number" id="count" value={count} onChange={(e) => setCount(e.target.value)} />
      </div>
      <div className="center">
        <button type="submit">Fetch Data</button>
        <button type="button" onClick={handleClear}>Clear</button>
      </div>
    </form>

    <ul>
      {data.map((item, index) => (
        <li key={index}>
          <h2>{item.title}</h2>
          <p>Date: {item.date}</p>
          <p>Explanation: {item.explanation}</p>
          <img src={item.url} alt={item.title} style={{ maxWidth: '100%' }} />
        </li>
      ))}
    </ul>
  </div>
);
};

export default NasaApiComponent;
