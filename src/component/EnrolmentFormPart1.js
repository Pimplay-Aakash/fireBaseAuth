import React, { useEffect } from "react";

const EnrolmentFormPart1 = ({
  formData,
  setIbrahim,
  ibrahim,
  setFormData,
  categoryCounts,
  handleFileChange,
  calculateAmount,
  setIsConfirmedPart1,
  setCategoryCounts,
}) => {
  // Function to calculate the total amount for Ibrahim entries with a given status
  const calculateIbrahimTotal = (ibrahimData, status) => {
    return ibrahimData.reduce((total, entry) => {
      if (entry.paymentStatus === status) {
        const noOfCards = parseFloat(entry.noOfCards) || 0;
        const amountPerCard = parseFloat(entry.amountPerCard) || 0;
        return total + noOfCards * amountPerCard;
      }
      return total;
    }, 0);
  };

  // Update categoryCounts.ibrahim and categoryCounts.topaid when ibrahim data changes
  useEffect(() => {
    const totalPaidAmount = calculateIbrahimTotal(ibrahim, "paid");
    const totalNotPaidAmount = calculateIbrahimTotal(ibrahim, "notPaid");
  
    setCategoryCounts((prevCounts) => ({
      ...prevCounts,
      ibrahim: totalPaidAmount,
      topaid: totalNotPaidAmount,
      date: prevCounts.date || '' // Ensure the date remains unchanged
    }));
  }, [ibrahim, setCategoryCounts]);

  // Sync categoryCounts with formData
  useEffect(() => {
    if (categoryCounts) {
      setFormData((prevData) => ({
        ...prevData,
        newEnrolment: categoryCounts.new ?? prevData.newEnrolment,
        demographicUpdate: categoryCounts.demo ?? prevData.demographicUpdate,
        bioUpdate: categoryCounts.bio ?? prevData.bioUpdate,
        m100Update: categoryCounts.m100 ?? prevData.m100Update,
        m000Update: categoryCounts.m000 ?? prevData.m000Update,
        others: categoryCounts.others ?? prevData.others,
        depositeamount: categoryCounts.totalDeposite ?? prevData.cashCollected,
        // date: categoryCounts.date, // Commented out to avoid overwriting the date
      }));
    }
  }, [categoryCounts, setFormData]);

  const handleCheckboxChange = (e) => {
    setIsConfirmedPart1(e.target.checked);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setCategoryCounts((prevCounts) => ({
      ...prevCounts,
      date: selectedDate,
    }));
  };

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    const { index } = dataset;

    if (index !== undefined) {
      setIbrahim((prevData) => {
        const updatedData = [...prevData];
        updatedData[index] = {
          ...updatedData[index],
          [name]: value,
        };
        return updatedData;
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Enter Today's Data (Part 1)</h2>
      <div className="flex gap-2 items-baseline">
        <div className="mb-4 flex items-center">
          <label className="block text-gray-700 mr-1">Select Date:</label>
          <input
            type="date"
            value={categoryCounts.date}
            onChange={handleDateChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            id="file-upload"
            accept=".html"
            onChange={handleFileChange}
            className="border border-gray-300 rounded p-2 max-w-60"
          />
        </div>
      </div>

      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 flex-shrink-0">
          New Enrolment:
        </label>
        <input
          type="number"
          name="newEnrolment"
          value={formData.newEnrolment}
          onChange={handleChange}
          className="flex-grow p-2 border rounded"
        />
        <span className="ml-4 bg-gray-200 font-medium py-1 px-2 rounded border shadow-md shadow-gray-400">
          {calculateAmount("newEnrolment", formData.newEnrolment || 0).toFixed(
            2
          )}
        </span>
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 flex-shrink-0">
          Demographic Update:
        </label>
        <input
          type="number"
          name="demographicUpdate"
          value={formData.demographicUpdate}
          onChange={handleChange}
          className="flex-grow p-2 border rounded"
        />
        <span className="ml-4 bg-gray-200 font-medium py-1 px-2 rounded border shadow-md shadow-gray-400">
          {calculateAmount(
            "demographicUpdate",
            formData.demographicUpdate || 0
          ).toFixed(2)}
        </span>
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 flex-shrink-0">
          Bio Update:
        </label>
        <input
          type="number"
          name="bioUpdate"
          value={formData.bioUpdate}
          onChange={handleChange}
          className="flex-grow p-2 border rounded"
        />
        <span className="ml-4 bg-gray-200 font-medium py-1 px-2 rounded border shadow-md shadow-gray-400">
          {calculateAmount("bioUpdate", formData.bioUpdate || 0).toFixed(2)}
        </span>
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 flex-shrink-0">
          M100 Update:
        </label>
        <input
          type="number"
          name="m100Update"
          value={formData.m100Update}
          onChange={handleChange}
          className="flex-grow p-2 border rounded"
        />
        <span className="ml-4 bg-gray-200 font-medium py-1 px-2 rounded border shadow-md shadow-gray-400">
          {calculateAmount("m100Update", formData.m100Update || 0).toFixed(2)}
        </span>
      </div>
      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 flex-shrink-0">
          M000 Update:
        </label>
        <input
          type="number"
          name="m000Update"
          value={formData.m000Update}
          onChange={handleChange}
          className="flex-grow p-2 border rounded"
        />
        <span className="ml-4 bg-gray-200 font-medium py-1 px-2 rounded border shadow-md shadow-gray-400">
          {calculateAmount("m000Update", formData.m000Update || 0).toFixed(2)}
        </span>
      </div>

      <div className="mb-4 flex items-center">
        <label className="block text-gray-700 mr-4 flex-shrink-0">Others:</label>
        <input
          type="number"
          name="others"
          value={formData.others}
          onChange={handleChange}
          className="flex-grow p-2 border rounded max-w-36"
        />
        <input
          type="number"
          name="othersAmount"
          value={formData.othersAmount}
          onChange={handleChange}
          className="ml-4 p-2 border rounded max-w-36"
          placeholder="Amount"
        />
        <span className="ml-4 bg-gray-200 font-medium py-1 px-2 rounded border shadow-md shadow-gray-400 ">
          {calculateAmount("others", formData.others || 0).toFixed(2)}
        </span>
      </div>

      <h2 className="font-semibold">Ibrahim</h2>
      {ibrahim.map((entry, index) => (
        <div key={index} className="mb-4">
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-4 flex-shrink-0">
              No of cards:
            </label>
            <input
              type="number"
              name="noOfCards"
              value={entry.noOfCards}
              onChange={handleChange}
              data-index={index}
              className="flex-grow p-2 border rounded"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-4 flex-shrink-0">
              Amount per card:
            </label>
            <input
              type="number"
              name="amountPerCard"
              value={entry.amountPerCard}
              onChange={handleChange}
              data-index={index}
              className="flex-grow p-2 border rounded"
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 mr-4 flex-shrink-0">
              Payment Status:
            </label>
            <select
              name="paymentStatus"
              value={entry.paymentStatus}
              onChange={handleChange}
              data-index={index}
              className="flex-grow p-2 border rounded"
            >
              <option value="paid">Paid</option>
              <option value="notPaid">Not Paid</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mr-4">Comment:</label>
            <textarea
              name="comment"
              value={entry.comment}
              onChange={handleChange}
              data-index={index}
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Enter your comment here..."
            />
          </div>
        </div>
      ))}

      <div className="mt-4 flex">
        <input
          type="checkbox"
          id="confirmation"
          onChange={handleCheckboxChange}
          className="mr-2 w-4 bg-blue-400"
        />
        <label htmlFor="confirmation" className="font-bold">
          I confirm that I have filled all required fields
        </label>
      </div>
    </div>
  );
};

export default EnrolmentFormPart1;
