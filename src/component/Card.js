import React from 'react';

const Card = ({ totalSum, date }) => {
  // Example data for the graph (replace with actual graph data)
  const graphData = [5, 10, 8, 15, 12, 7, 10];

  // Example styling for the graph (replace with your graph library or component)
  const graphStyle = {
    height: '200px', // Adjust as needed
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '0 10px',
  };

  const barStyle = {
    width: `${100 / graphData.length}%`,
    backgroundColor: '#4a90e2', // Example color
    margin: '0 2px',
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Total Sum: {totalSum}</h2>
        {/* <p className="text-gray-500">{date}</p> */}
      </div>
      <div className="mb-4" style={graphStyle}>
        {graphData.map((value, index) => (
          <div key={index} style={{ ...barStyle, height: `${value * 10}px` }}></div>
        ))}
      </div>
      {/* Example: You can add more details or actions here */}
    </div>
  );
};

export default Card;
