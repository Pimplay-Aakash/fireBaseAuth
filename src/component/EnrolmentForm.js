import React, { useState } from 'react';
import FileUpload from './FileUpload';

const EnrolmentForm = () => {
  const [data, setData] = useState({
    newEnrolment: '',
    demographicUpdate: '',
    bioUpdate: '',
    m100Update: '',
    m000Update: '',
    others: '',
    othersAmount: '',
    cashCollected: '',
    onlineCashCollected: '',
    pendingReferralDetails: [],
    receivedReferralDetails: [],
    expenseDetails: [], // Array for today's expenses
  });

  const baseAmounts = {
    newEnrolment: 0,
    demographicUpdate: 50,
    bioUpdate: 100,
    m100Update: 100,
    m000Update: 0,
  };

  const calculateAmount = (key, value) => {
    if (key === 'others') {
      return parseFloat(data.othersAmount) || 0;
    }
    return (baseAmounts[key] || 0) * (parseFloat(value) || 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleAddReferral = (type) => {
    const referralDetails = type === 'pending' ? 'pendingReferralDetails' : 'receivedReferralDetails';
    setData({
      ...data,
      [referralDetails]: [
        ...data[referralDetails],
        { referralName: '', amountPerCard: '', numberOfCards: '' },
      ],
    });
  };

  const handleReferralChange = (e, index, type) => {
    const { name, value } = e.target;
    const referralDetails = type === 'pending' ? 'pendingReferralDetails' : 'receivedReferralDetails';
    const updatedReferrals = [...data[referralDetails]];
    updatedReferrals[index][name] = value;
    setData({
      ...data,
      [referralDetails]: updatedReferrals,
    });
  };

  const handleRemoveReferral = (index, type) => {
    const referralDetails = type === 'pending' ? 'pendingReferralDetails' : 'receivedReferralDetails';
    const updatedReferrals = data[referralDetails].filter((_, i) => i !== index);
    setData({
      ...data,
      [referralDetails]: updatedReferrals,
    });
  };

  const handleAddExpense = () => {
    setData({
      ...data,
      expenseDetails: [
        ...data.expenseDetails,
        { expenseName: '', amount: '', comment: '' },
      ],
    });
  };

  const handleExpenseChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExpenses = [...data.expenseDetails];
    updatedExpenses[index][name] = value;
    setData({
      ...data,
      expenseDetails: updatedExpenses,
    });
  };

  const handleRemoveExpense = (index) => {
    const updatedExpenses = data.expenseDetails.filter((_, i) => i !== index);
    setData({
      ...data,
      expenseDetails: updatedExpenses,
    });
  };

  const handleFileSelect = (file) => {
    console.log('Selected File:', file);
    // Handle file upload logic here, if needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Data:', data);
    // Perform any additional logic for submitting data, e.g., sending to backend
  };

  return (
    <div className='bg-gray-100 h-full p-5'>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-10 py-10 px-10 border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Enter Today's Data</h2>
        <div className='flex gap-2'>
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-1">Select Date:</label>
            <input type='date' className="p-2 border rounded" />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-4 flex-shrink-0">File Upload:</label>
            <FileUpload onFileSelect={handleFileSelect} />
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 mr-4 flex-shrink-0">New Enrolment:</label>
          <input
            type="number"
            name="newEnrolment"
            value={data.newEnrolment}
            onChange={handleChange}
            className="flex-grow p-2 border rounded"
          />
          <span className="ml-4">{calculateAmount('newEnrolment', data.newEnrolment).toFixed(2)}</span>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 mr-4 flex-shrink-0">Demographic Update:</label>
          <input
            type="number"
            name="demographicUpdate"
            value={data.demographicUpdate}
            onChange={handleChange}
            className="flex-grow p-2 border rounded"
          />
          <span className="ml-4">{calculateAmount('demographicUpdate', data.demographicUpdate).toFixed(2)}</span>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 mr-4 flex-shrink-0">Bio Update:</label>
          <input
            type="number"
            name="bioUpdate"
            value={data.bioUpdate}
            onChange={handleChange}
            className="flex-grow p-2 border rounded"
          />
          <span className="ml-4">{calculateAmount('bioUpdate', data.bioUpdate).toFixed(2)}</span>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 mr-4 flex-shrink-0">M100 Update:</label>
          <input
            type="number"
            name="m100Update"
            value={data.m100Update}
            onChange={handleChange}
            className="flex-grow p-2 border rounded"
          />
          <span className="ml-4">{calculateAmount('m100Update', data.m100Update).toFixed(2)}</span>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 mr-4 flex-shrink-0">M000 Update:</label>
          <input
            type="number"
            name="m000Update"
            value={data.m000Update}
            onChange={handleChange}
            className="flex-grow p-2 border rounded"
          />
          <span className="ml-4">{calculateAmount('m000Update', data.m000Update).toFixed(2)}</span>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 mr-4 flex-shrink-0">Others:</label>
          <input
            type="number"
            name="others"
            value={data.others}
            onChange={handleChange}
            className="flex-grow p-2 border rounded"
          />
          <input
            type="number"
            name="othersAmount"
            value={data.othersAmount}
            onChange={handleChange}
            className="ml-4 p-2 border rounded"
            placeholder="Amount"
          />
          <span className="ml-4">{calculateAmount('others', data.others).toFixed(2)}</span>
        </div>
        <h2>Today Pending Collection</h2>
        {data.pendingReferralDetails.map((referral, index) => (
          <div key={index} className="mb-4">
            <h2 className='font-medium mb-2'>{index + 1} Referral</h2>
            <div className="flex flex-wrap gap-4">
              <div className='flex gap-6'>
                <div className="flex items-center">
                  <label className="block text-gray-700 mr-4 flex-shrink-0">Referral Name:</label>
                  <input
                    type="text"
                    name="referralName"
                    value={referral.referralName}
                    onChange={(e) => handleReferralChange(e, index, 'pending')}
                    className="flex-grow p-2 border rounded"
                  />
                </div>
                <div className="flex items-center">
                  <label className="block text-gray-700 mr-4 flex-shrink-0">Amount per Card:</label>
                  <input
                    type="number"
                    name="amountPerCard"
                    value={referral.amountPerCard}
                    onChange={(e) => handleReferralChange(e, index, 'pending')}
                    className="p-2 w-28 border rounded"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="block text-gray-700 mr-4 flex-shrink-0">Number of Cards:</label>
                <input
                  type="number"
                  name="numberOfCards"
                  value={referral.numberOfCards}
                  onChange={(e) => handleReferralChange(e, index, 'pending')}
                  className="p-2 border rounded"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveReferral(index, 'pending')}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => handleAddReferral('pending')} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mb-4">Add Referral</button>

        <h2>Today Received Collection</h2>
        {data.receivedReferralDetails.map((referral, index) => (
          <div key={index} className="mb-4">
            <h2 className='font-medium mb-2'>{index + 1} Referral</h2>
            <div className="flex flex-wrap gap-4">
              <div className='flex gap-6'>
                <div className="flex items-center">
                  <label className="block text-gray-700 mr-4 flex-shrink-0">Referral Name:</label>
                  <input
                    type="text"
                    name="referralName"
                    value={referral.referralName}
                    onChange={(e) => handleReferralChange(e, index, 'received')}
                    className="flex-grow p-2 border rounded"
                  />
                </div>
                <div className="flex items-center">
                  <label className="block text-gray-700 mr-4 flex-shrink-0">Amount per Card:</label>
                  <input
                    type="number"
                    name="amountPerCard"
                    value={referral.amountPerCard}
                    onChange={(e) => handleReferralChange(e, index, 'received')}
                    className="p-2 w-28 border rounded"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="block text-gray-700 mr-4 flex-shrink-0">Number of Cards:</label>
                <input
                  type="number"
                  name="numberOfCards"
                  value={referral.numberOfCards}
                  onChange={(e) => handleReferralChange(e, index, 'received')}
                  className="p-2 border rounded"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveReferral(index, 'received')}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={() => handleAddReferral('received')} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mb-4">Add Referral</button>

        <h2>Today's Expenses</h2>
        {data.expenseDetails.map((expense, index) => (
          <div key={index} className="mb-4">
            <h2 className='font-medium mb-2'>{index + 1} Expense</h2>
            <div className="flex flex-wrap gap-4">
              <div className='flex gap-6'>
                <div className="flex items-center">
                  <label className="block text-gray-700 mr-4 flex-shrink-0">Expense Name:</label>
                  <input
                    type="text"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={(e) => handleExpenseChange(e, index)}
                    className="flex-grow p-2 border rounded"
                  />
                </div>
                <div className="flex items-center">
                  <label className="block text-gray-700 mr-4 flex-shrink-0">Amount:</label>
                  <input
                    type="number"
                    name="amount"
                    value={expense.amount}
                    onChange={(e) => handleExpenseChange(e, index)}
                    className="p-2 w-28 border rounded"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="block text-gray-700 mr-4 flex-shrink-0">Comment:</label>
                <input
                  type="text"
                  name="comment"
                  value={expense.comment}
                  onChange={(e) => handleExpenseChange(e, index)}
                  className="p-2 border rounded"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveExpense(index)}
                className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddExpense} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mb-4">Add Expense</button>

        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 mr-4 flex-shrink-0">Cash Collected:</label>
          <input
            type="number"
            name="cashCollected"
            value={data.cashCollected}
            onChange={handleChange}
            className="flex-grow p-2 border rounded"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 mr-4 flex-shrink-0">Online Collected:</label>
          <input
            type="number"
            name="onlineCashCollected"
            value={data.onlineCashCollected}
            onChange={handleChange}
            className="flex-grow p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default EnrolmentForm;
