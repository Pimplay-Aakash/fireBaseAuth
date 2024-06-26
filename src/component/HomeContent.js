import React from 'react';
import LineGraphCard from './LineGraph'; // Adjust the import path based on your project structure

const HomeContent = ({ data, loading }) => {
  // Assuming data is sorted by date and latestItem is the first item
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-xl font-semibold">No data available.</div>
      </div>
    );
  }

  const latestItem = data[0];
  console.log('data', data);

  console.log('latestItem',latestItem);

  // Prepare data for the line graph
  const graphData = {
    labels: ['Bio', 'New', 'Demo', 'M100', 'M000', 'Others'], // Labels for the x-axis
    data: [latestItem.bio, latestItem.new, latestItem.demo, latestItem.m100, latestItem.m000, latestItem.others], // Data points for the y-axis
  };
  // Calculate total sum for display
  const totalSum = latestItem.bio + latestItem.new + latestItem.demo +
                   latestItem.m100 + latestItem.m000 + latestItem.others;

  return (
    <div className='m-10'>
      {/* <div className="border p-4 mb-4">
        <h2>Date: {latestItem.date}</h2>
        <p>Bio: {latestItem.bio}</p>
        <p>New: {latestItem.new}</p>
        <p>Demo: {latestItem.demo}</p>
        <p>M100: {latestItem.m100}</p>
        <p>M000: {latestItem.m000}</p>
        <p>Others: {latestItem.others}</p>
        <p>Earnings: {latestItem.earnings}</p>
        <p>Total Deposit: {latestItem.totalDeposite}</p>
        <p>Topaid: {latestItem.topaid}</p>
      </div> */}

      <LineGraphCard
        totalSum={totalSum}
        date={latestItem.date}
        graphData={graphData}
      />
    </div>
  );
};

export default HomeContent;
