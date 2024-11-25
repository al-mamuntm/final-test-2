import React, { useState, useEffect } from 'react';

const DataFetchingComponent = () => {
  // State variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Fetch data from public API
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setData(data); // Update the state with the fetched data
      } catch (err) {
        setError(err.message); // Set error state if something goes wrong
      } finally {
        setLoading(false); // Set loading to false once the request is finished
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {data.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetchingComponent;
npx create-react-app my-app
cd my-app
import React from 'react';
import DataFetchingComponent from './DataFetchingComponent';

function App() {
  return (
    <div className="App">
      <DataFetchingComponent />
    </div>
  );
}

export default App;
npm start
