// import React from 'react';

// const EnrolmentFormPart2 = ({
//   formData,
//   handleChange,
//   handleAddReferral,
//   handleReferralChange,
//   handleRemoveReferral,
//   handleAddExpense,
//   handleExpenseChange,
//   handleRemoveExpense,
//   handleSubmit,
// }) => {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Enter Today's Data (Part 2)</h2>
      
//       {/* Pending Referral Details */}
//       <div className='flex justify-between items-baseline'>
//         <h2>Today Pending Collection</h2>
//         <button type="button" onClick={() => handleAddReferral('pending')} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mb-4">
//           Add Referral
//         </button>
//       </div>
//       {formData.pendingReferralDetails.map((referral, index) => (
//         <div key={index} className="mb-4 border p-4 rounded-md">
//           <h2 className='font-medium mb-2'>{index + 1} Referral</h2>
//           <div className="flex flex-wrap gap-4">
//             {/* First Row */}
//             <div className="flex gap-4 w-full">
//               <div className="flex flex-col flex-grow">
//                 <label className="block text-gray-700 mb-2">Referral Name:</label>
//                 <input
//                   type="text"
//                   name="referralName"
//                   value={referral.referralName}
//                   onChange={(e) => handleReferralChange(e, index, 'pending')}
//                   className="p-2 border rounded"
//                 />
//               </div>
//               <div className="flex flex-col flex-grow">
//                 <label className="block text-gray-700 mb-2">Amount per Card:</label>
//                 <input
//                   type="number"
//                   name="amountPerCard"
//                   value={referral.amountPerCard}
//                   onChange={(e) => handleReferralChange(e, index, 'pending')}
//                   className="p-2 border rounded"
//                 />
//               </div>
//             </div>
            
//             {/* Second Row */}
//             <div className="flex gap-4 w-full">
//               <div className="flex flex-col flex-grow">
//                 <label className="block text-gray-700 mb-2">Number of Cards:</label>
//                 <input
//                   type="number"
//                   name="numberOfCards"
//                   value={referral.numberOfCards}
//                   onChange={(e) => handleReferralChange(e, index, 'pending')}
//                   className="p-2 border rounded"
//                 />
//               </div>
//               <div className="flex flex-col flex-grow">
//                 <label className="block text-gray-700 mb-2">Comment:</label>
//                 <input
//                   type="text"
//                   name="comment"
//                   value={referral.comment}
//                   onChange={(e) => handleReferralChange(e, index, 'pending')}
//                   className="p-2 border rounded"
//                 />
//               </div>
//             </div>

//             {/* Third Row */}
//             <div className="flex justify-center w-full mt-4">
//               <button
//                 type="button"
//                 onClick={() => handleRemoveReferral(index, 'pending')}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Received Referral Details */}
//       <div className='flex justify-between items-baseline'>
//         <h2>Today Received Collection</h2>
//         <button type="button" onClick={() => handleAddReferral('received')} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mb-4">
//           Add Referral
//         </button>
//       </div>
//       {formData.receivedReferralDetails.map((referral, index) => (
//         <div key={index} className="mb-4 border p-4 rounded-md">
//           <h2 className='font-medium mb-2'>{index + 1} Referral</h2>
//           <div className="flex flex-wrap gap-4">
//             {/* First Row */}
//             <div className="flex gap-4 w-full">
//               <div className="flex flex-col flex-grow">
//                 <label className="block text-gray-700 mb-2">Referral Name:</label>
//                 <input
//                   type="text"
//                   name="referralName"
//                   value={referral.referralName}
//                   onChange={(e) => handleReferralChange(e, index, 'received')}
//                   className="p-2 border rounded"
//                 />
//               </div>
//               <div className="flex flex-col flex-grow">
//                 <label className="block text-gray-700 mb-2">Amount per Card:</label>
//                 <input
//                   type="number"
//                   name="amountPerCard"
//                   value={referral.amountPerCard}
//                   onChange={(e) => handleReferralChange(e, index, 'received')}
//                   className="p-2 border rounded"
//                 />
//               </div>
//             </div>
            
//             {/* Second Row */}
//             <div className="flex gap-4 w-full">
//               <div className="flex flex-col flex-grow">
//                 <label className="block text-gray-700 mb-2">Number of Cards:</label>
//                 <input
//                   type="number"
//                   name="numberOfCards"
//                   value={referral.numberOfCards}
//                   onChange={(e) => handleReferralChange(e, index, 'received')}
//                   className="p-2 border rounded"
//                 />
//               </div>
//               <div className="flex flex-col flex-grow">
//                 <label className="block text-gray-700 mb-2">Comment:</label>
//                 <input
//                   type="text"
//                   name="comment"
//                   value={referral.comment}
//                   onChange={(e) => handleReferralChange(e, index, 'received')}
//                   className="p-2 border rounded"
//                 />
//               </div>
//             </div>

//             {/* Third Row */}
//             <div className="flex justify-center w-full mt-4">
//               <button
//                 type="button"
//                 onClick={() => handleRemoveReferral(index, 'received')}
//                 className="bg-red-500 text-white px-4 py-2 rounded-lg"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Expense Details */}
//       <div className='flex justify-between items-baseline'>
//         <h2>Today's Expenses</h2>
//         <button type="button" onClick={handleAddExpense} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mb-4">
//           Add Expense
//         </button>
//       </div>
//       {formData.expenseDetails.map((expense, index) => (
//         <div key={index} className="mb-4 border p-4 rounded-md">
//           <h2 className='font-medium mb-2'>{index + 1} Expense</h2>
//           <div className="flex flex-wrap gap-4">
//             {/* First Row */}
//             <div className="flex gap-4 w-full">
//               <div className="flex flex-col flex-grow">
//                 <label className="block text-gray-700 mb-2">Expense Name:</label>
//                 <input
//                   type="text"
//                   name="expenseName"
//                   value={expense.expenseName}
//                   onChange={(e) => handleExpenseChange(e, index)}
//                   className="p-2 border rounded"
//                 />
//               </div>
//               <div className="flex flex-col flex-grow">
//                 <label className="block text-gray-700 mb-2">Amount:</label>
//                 <input
//                   type="number"
//                   name="amount"
//                   value={expense.amount}
//                   onChange={(e) => handleExpenseChange(e, index)}
//                   className="p-2 border rounded"
//                 />
//               </div>
//             </div>
            
//             {/* Second Row */}
//             <div className="flex gap-4 w-full">
//               <div className="flex flex-col flex-grow">
//                 <label className="block text-gray-700 mb-2">Comment:</label>
//                 <input
//                   type="text"
//                   name="comment"
//                   value={expense.comment}
//                   onChange={(e) => handleExpenseChange(e, index)}
//                   className="p-2 border rounded"
//                 />
//               </div>
//               <div className="flex justify-center items-center w-full mt-4">
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveExpense(index)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Cash Collected */}
//       <div className="mb-4 flex items-center">
//         <label className="block text-gray-700 mr-4 flex-shrink-0">Cash Collected:</label>
//         <input
//           type="number"
//           name="cashCollected"
//           value={formData.cashCollected}
//           onChange={handleChange}
//           className="flex-grow p-2 border rounded"
//         />
//       </div>
      
//       {/* Online Cash Collected */}
//       <div className="mb-4 flex items-center">
//         <label className="block text-gray-700 mr-4 flex-shrink-0">Online Collected:</label>
//         <input
//           type="number"
//           name="onlineCashCollected"
//           value={formData.onlineCashCollected}
//           onChange={handleChange}
//           className="flex-grow p-2 border rounded"
//         />
//       </div>
//     </div>
//   );
// };

// export default EnrolmentFormPart2;


//////////////////////////////////////////

import React, { useState } from 'react';

const EnrolmentFormPart2 = ({
  formData,
  handleChange,
  handleAddReferral,
  handleReferralChange,
  handleRemoveReferral,
  handleAddExpense,
  handleExpenseChange,
  handleRemoveExpense,
  handleSubmit,
  setIsConfirmedPart2,
  setCategoryCounts,
  categoryCounts,
  errors,
}) => {

  // Function to calculate earnings
  const calculateEarnings = () => {
    let totalPendingEarnings = 0;
    let totalReceivedEarnings = 0;
    let totalExpenses = 0;

    // Calculate total pending referral earnings
    formData.pendingReferralDetails.forEach(referral => {
      totalPendingEarnings += parseFloat(referral.amountPerCard) * parseInt(referral.numberOfCards);
    });

    // Calculate total received referral earnings
    formData.receivedReferralDetails.forEach(referral => {
      totalReceivedEarnings += parseFloat(referral.amountPerCard) * parseInt(referral.numberOfCards);
    });

    // Calculate total expenses
    formData.expenseDetails.forEach(expense => {
      totalExpenses += parseFloat(expense.amount);
    });

    // Calculate net earnings
    const netEarnings = (totalPendingEarnings + totalReceivedEarnings) - totalExpenses;

    // Update state with the calculated earnings
    setCategoryCounts(prevCounts => ({
      ...prevCounts,
      earnings: netEarnings,
    }));
  };

  // Calculate earnings when form data changes or on button click (optional)
  React.useEffect(() => {
    calculateEarnings();
  }, [formData]);

  // For handling checkbox change (existing functionality)
  const handleCheckboxChange2 = (e) => {
    setIsConfirmedPart2(e.target.checked);
  };


  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Enter Today's Data (Part 2)</h2>
      
       {/* Pending Referral Details */}
     <div className='flex justify-between items-baseline'>
    <h2>Today Pending Collection</h2>
     <button type="button" onClick={() => handleAddReferral('pending')} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mb-4">
           Add Referral
         </button>
       </div>
       {formData.pendingReferralDetails.map((referral, index) => (
        <div key={index} className="mb-4 border p-4 rounded-md">
          <h2 className='font-medium mb-2'>{index + 1} Referral</h2>
          <div className="flex flex-wrap gap-4">
            {/* First Row */}
            <div className="flex gap-4 w-full">
              <div className="flex flex-col flex-grow">
                <label className="block text-gray-700 mb-2">Referral Name:</label>
                <input
                  type="text"
                  name="referralName"
                  value={referral.referralName}
                  onChange={(e) => handleReferralChange(e, index, 'pending')}
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="block text-gray-700 mb-2">Amount per Card:</label>
                <input
                  type="number"
                  name="amountPerCard"
                  value={referral.amountPerCard}
                  onChange={(e) => handleReferralChange(e, index, 'pending')}
                  className="p-2 border rounded"
                />
              </div>
            </div>
            
            {/* Second Row */}
            <div className="flex gap-4 w-full">
              <div className="flex flex-col flex-grow">
                <label className="block text-gray-700 mb-2">Number of Cards:</label>
                <input
                  type="number"
                  name="numberOfCards"
                  value={referral.numberOfCards}
                  onChange={(e) => handleReferralChange(e, index, 'pending')}
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="block text-gray-700 mb-2">Comment:</label>
                <input
                  type="text"
                  name="comment"
                  value={referral.comment}
                  onChange={(e) => handleReferralChange(e, index, 'pending')}
                  className="p-2 border rounded"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="flex justify-center w-full mt-4">
              <button
                type="button"
                onClick={() => handleRemoveReferral(index, 'pending')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Received Referral Details */}
      <div className='flex justify-between items-baseline'>
        <h2>Today Received Collection</h2>
        <button type="button" onClick={() => handleAddReferral('received')} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mb-4">
          Add Referral
        </button>
      </div>
      {formData.receivedReferralDetails.map((referral, index) => (
        <div key={index} className="mb-4 border p-4 rounded-md">
          <h2 className='font-medium mb-2'>{index + 1} Referral</h2>
          <div className="flex flex-wrap gap-4">
            {/* First Row */}
            <div className="flex gap-4 w-full">
              <div className="flex flex-col flex-grow">
                <label className="block text-gray-700 mb-2">Referral Name:</label>
                <input
                  type="text"
                  name="referralName"
                  value={referral.referralName}
                  onChange={(e) => handleReferralChange(e, index, 'received')}
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="block text-gray-700 mb-2">Amount per Card:</label>
                <input
                  type="number"
                  name="amountPerCard"
                  value={referral.amountPerCard}
                  onChange={(e) => handleReferralChange(e, index, 'received')}
                  className="p-2 border rounded"
                />
              </div>
            </div>
            
            {/* Second Row */}
            <div className="flex gap-4 w-full">
              <div className="flex flex-col flex-grow">
                <label className="block text-gray-700 mb-2">Number of Cards:</label>
                <input
                  type="number"
                  name="numberOfCards"
                  value={referral.numberOfCards}
                  onChange={(e) => handleReferralChange(e, index, 'received')}
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="block text-gray-700 mb-2">Comment:</label>
                <input
                  type="text"
                  name="comment"
                  value={referral.comment}
                  onChange={(e) => handleReferralChange(e, index, 'received')}
                  className="p-2 border rounded"
                />
              </div>
            </div>

            {/* Third Row */}
            <div className="flex justify-center w-full mt-4">
              <button
                type="button"
                onClick={() => handleRemoveReferral(index, 'received')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Expense Details */}
      <div className='flex justify-between items-baseline'>
        <h2>Today's Expenses</h2>
        <button type="button" onClick={handleAddExpense} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mb-4">
          Add Expense
        </button>
      </div>
      {formData.expenseDetails.map((expense, index) => (
        <div key={index} className="mb-4 border p-4 rounded-md">
          <h2 className='font-medium mb-2'>{index + 1} Expense</h2>
          <div className="flex flex-wrap gap-4">
            {/* First Row */}
            <div className="flex gap-4 w-full">
              <div className="flex flex-col flex-grow">
                <label className="block text-gray-700 mb-2">Expense Name:</label>
                <input
                  type="text"
                  name="expenseName"
                  value={expense.expenseName}
                  onChange={(e) => handleExpenseChange(e, index)}
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <label className="block text-gray-700 mb-2">Amount:</label>
                <input
                  type="number"
                  name="amount"
                  value={expense.amount}
                  onChange={(e) => handleExpenseChange(e, index)}
                  className="p-2 border rounded"
                />
              </div>
            </div>
            
            {/* Second Row */}
            <div className="flex gap-4 w-full">
              <div className="flex flex-col flex-grow">
                <label className="block text-gray-700 mb-2">Comment:</label>
                <input
                  type="text"
                  name="comment"
                  value={expense.comment}
                  onChange={(e) => handleExpenseChange(e, index)}
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex justify-center items-center w-full mt-4">
                <button
                  type="button"
                  onClick={() => handleRemoveExpense(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Cash Collected */}
      <div className="mb-4 flex flex-col">
        <label className="block text-gray-700 mr-4">Cash Collected:</label>
        <input
          type="number"
          name="cashCollected"
          value={formData.cashCollected}
          onChange={handleChange}
          className={`flex-grow p-2 border rounded ${errors.cashCollected ? 'border-red-500' : ''}`}
        />
        {errors.cashCollected && (
          <span className="text-red-500">{errors.cashCollected}</span>
        )}
      </div>
      
      {/* Online Cash Collected */}
      <div className="mb-4 flex flex-col">
        <label className="block text-gray-700 mr-4">Online Collected:</label>
        <input
          type="number"
          name="onlineCashCollected"
          value={formData.onlineCashCollected}
          onChange={handleChange}
          className={`flex-grow p-2 border rounded ${errors.onlineCashCollected ? 'border-red-500' : ''}`}
        />
        {errors.onlineCashCollected && (
          <span className="text-red-500">{errors.onlineCashCollected}</span>
        )}
      </div>

      <div className="mt-4 flex">
        <input
          type="checkbox"
          id="confirmation"
          onChange={handleCheckboxChange2}
          className="mr-2 w-4 bg-blue-400"
        />
        <label htmlFor="confirmation" className="font-bold">
          I confirm that I have filled all required fields
        </label>
      </div>
      
      {/* Submit Button */}
      {/* <button
        type="button"
        onClick={handleFormSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Submit
      </button> */}
    </div>
  );
};

export default EnrolmentFormPart2;
