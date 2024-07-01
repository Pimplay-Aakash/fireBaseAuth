import React, { useState } from 'react';
import MyTable from './table';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';

const ReportsContent = ({ data, loading, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDataId, setCurrentDataId] = useState(null);

  const navigate = useNavigate();

  // const openModal = (dataId) => {
  //   setCurrentDataId(dataId);
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentDataId(null);
  };

  const handleDeleteConfirm = () => {
    if (currentDataId) {
      onDelete(currentDataId);
      closeModal();
    }
  };

  const columns = [
    { label: 'S.No', key: 's.no', render: (name, index) => <div>{index + 1}</div> },
    { label: "Date", key: "date" },
    { label: "New", key: "new" },
    { label: "Demo", key: "demo" },
    { label: "Bio", key: "bio" },
    { label: "M100", key: "m100" },
    { label: "M000", key: "m000" },
    { label: "Others", key: "others" },
    { label: "Deposite", key: "totalDeposite" },
    { label: "Ibrahim", 
      key: "ibrahim",
      render: (name, index, row) => (
        <span key={index}>{name}&emsp;{(row.topaid === 0) ? 'paid' : 'Not paid'}</span>
      )
    },
    { label: "Total Collation", key: "earnings" },
    {
      label: "Action",
      key: "action",
      render: (name, index, row) => (
        <span key={index} className="flex gap-2">
          <button 
            onClick={() => navigate(`/EnrolmentForm/${row.dataId}`)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition">
            Update
          </button>
          <button
            onClick={() => {
              setCurrentDataId(row.dataId);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition"
          >
            Delete
          </button>
        </span>
      )
    }
  ];

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <main className="flex-grow p-4 overflow-auto">
      <h1 className="text-3xl font-semibold mb-4">Reports</h1>
      <MyTable
        data={data}
        columns={columns}
        perPageLimit={10}
        pageBtnLimit={5}
      />
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDeleteConfirm}
      />
    </main>
  );
};

export default ReportsContent;
