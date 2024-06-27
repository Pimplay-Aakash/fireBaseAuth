import React, { useState } from 'react';
import EnrolmentFormPart1 from './EnrolmentFormPart1';
import EnrolmentFormPart2 from './EnrolmentFormPart2';
import { useNavigate } from "react-router-dom"
import { db } from '../config/firebaseConfig';
import { collection, addDoc,serverTimestamp } from "firebase/firestore"; 

import { useAuth } from "../config/AuthContext"


const EnrolmentFormParent = () => {
  const [formData, setFormData] = useState({
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
    expenseDetails: [],
  });
  const [ibrahim,setIbrahim] = useState([
    {
    noOfCards: '',
    amountPerCard: '',
    paymentStatus: 'notPaid',
    comment: ''
  }])

  // console.log("formData for total Earning",formData.pendingReferralDetails);
  // console.log("formData for total Earning",formData.receivedReferralDetails);
  // console.log("formData for total Earning",formData.expenseDetails);
  
  const [fileContent, setFileContent] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [filteredResults, setFilteredResults] = useState(null);
  const [errors, setErrors] = useState({});
  const [categoryCounts, setCategoryCounts] = useState({
    demo: 0,
    bio: 0,
    m100: 0,
    m000: 0,
    new: 0,
    others: 0,
    totalDeposite: 0,
    date:'',
    ibrahim:0,
    topaid:'',
    earnings:0,
  });

  const [isConfirmedPart1, setIsConfirmedPart1] = useState(false);
  const [isConfirmedPart2, setIsConfirmedPart2] = useState(false);

  const { currentUser } = useAuth()
  const navigate =  useNavigate()

  // console.log('formData',formData );
  console.log('categoryCounts',categoryCounts );
  console.log('fileContent',fileContent );
  console.log('fileContent',setFilteredResults );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
        extractData(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const extractData = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const date = doc.querySelector('.first_view td:nth-child(2) span')?.innerText;

    const enrolments = Array.from(doc.querySelectorAll('.pick_date tbody tr')).map((row) => {
      const cells = row.querySelectorAll('td');
      return {
        date: cells[0]?.innerText,
        enrolments: cells[1]?.innerText,
        updates: cells[2]?.innerText,
        total: cells[3]?.innerText,
      };
    });

    const details = Array.from(doc.querySelectorAll('.details_view tbody tr')).map((row) => {
      const cells = row.querySelectorAll('td');
      return {
        sNo: cells[0]?.innerText,
        enrolmentNo: cells[1]?.innerText,
        type: cells[3]?.innerText,
        mandatoryBiometricUpdate: cells[4]?.innerText,
        resident: cells[11]?.innerText,
        status: cells[12]?.innerText,
        totalAmountCharged: cells[18]?.innerText,
      };
    });

    setExtractedData({
      date,
      enrolments,
      details,
    });

    filterData(details);
  };

  const filterData = (details) => {
    const filtered = details.map((item) => {
      const mandatoryBiometricUpdate = item.mandatoryBiometricUpdate?.trim().toLowerCase();
      const totalAmountCharged = parseFloat(item.totalAmountCharged);
      const type = item.type?.trim();
  
      if (mandatoryBiometricUpdate === 'no' && totalAmountCharged === 50) {
        return { ...item, category: 'demo' };
      } else if (mandatoryBiometricUpdate === 'no' && totalAmountCharged === 100) {
        return { ...item, category: 'bio' };
      } else if (mandatoryBiometricUpdate === 'yes' && totalAmountCharged === 100) {
        return { ...item, category: 'm100' };
      } else if (mandatoryBiometricUpdate === 'yes' && totalAmountCharged === 0) {
        return { ...item, category: 'm000' };
      } else if (type === 'E' && totalAmountCharged === 0) {
        return { ...item, category: 'new' };
      } else {
        return { ...item, category: 'others' };
      }
    });
  
    const counts = {
      demo: 0,
      bio: 0,
      m100: 0,
      m000: 0,
      new: 0,
      others: 0,
      totalDeposite: 0,
      date: categoryCounts.date, // Preserve existing date
      ibrahim: categoryCounts.ibrahim,
      topaid: categoryCounts.topaid,
      earnings: categoryCounts.earnings,
    };
  
    let totalDeposite = 0;
  
    details.forEach((item) => {
      totalDeposite += parseFloat(item.totalAmountCharged);
    });
  
    counts.totalDeposite = totalDeposite;
  
    filtered.forEach((item) => {
      counts[item.category]++;
    });
  
    setCategoryCounts(counts);
  };
  

  // console.log('extractedData', extractedData);
  // console.log('filteredResults', filteredResults);
  // console.log('categoryCounts', categoryCounts);
  // console.log('formData', formData);

  const baseAmounts = {
    newEnrolment: 0,
    demographicUpdate: 50,
    bioUpdate: 100,
    m100Update: 100,
    m000Update: 0,
  };

  const calculateAmount = (key, value) => {
    if (key === 'others') {
      return parseFloat(formData.othersAmount) * formData.others || 0;
    }
    return (baseAmounts[key] || 0) * (parseFloat(value) || 0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddReferral = (type) => {
    const referralDetails = type === 'pending' ? 'pendingReferralDetails' : 'receivedReferralDetails';
    setFormData({
      ...formData,
      [referralDetails]: [
        ...formData[referralDetails],
        { referralName: '', amountPerCard: '', numberOfCards: '' },
      ],
    });
  };

  const handleReferralChange = (e, index, type) => {
    const { name, value } = e.target;
    const referralDetails = type === 'pending' ? 'pendingReferralDetails' : 'receivedReferralDetails';
    const updatedReferrals = [...formData[referralDetails]];
    updatedReferrals[index][name] = value;
    setFormData({
      ...formData,
      [referralDetails]: updatedReferrals,
    });
  };

  const handleRemoveReferral = (index, type) => {
    const referralDetails = type === 'pending' ? 'pendingReferralDetails' : 'receivedReferralDetails';
    const updatedReferrals = formData[referralDetails].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [referralDetails]: updatedReferrals,
    });
  };

  const handleAddExpense = () => {
    setFormData({
      ...formData,
      expenseDetails: [
        ...formData.expenseDetails,
        { expenseName: '', amount: '', comment: '' },
      ],
    });
  };

  const handleExpenseChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExpenses = [...formData.expenseDetails];
    updatedExpenses[index][name] = value;
    setFormData({
      ...formData,
      expenseDetails: updatedExpenses,
    });
  };

  const handleRemoveExpense = (index) => {
    const updatedExpenses = formData.expenseDetails.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      expenseDetails: updatedExpenses,
    });
  };

   // Validation function for the from 2
   const validateFields = () => {
    const newErrors = {};
    if (!formData.cashCollected || formData.cashCollected === '') {
      newErrors.cashCollected = 'Cash Collected is required';
    }
    if (!formData.onlineCashCollected || formData.onlineCashCollected === '') {
      newErrors.onlineCashCollected = 'Online Cash Collected is required';
    }
    // Add more validation checks as necessary
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  // Updated handleSubmit to include validation
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateFields()) {
      handleSubmit(event);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to Firestore
    const dataToSend = {
      formData,
      ibrahim,
      extractedData,
      filteredResults,
      categoryCounts,
      userId: currentUser.uid,
      timestamp: serverTimestamp(),
    };

    try {
    // Send data to Firestore
    // const docRef = await db.collection('formSubmissions').addDoc(dataToSend);
    const docRef = await addDoc(collection(db, 'formSubmissions'), dataToSend);
    console.log('Document written with ID: ', docRef.id);

      // Optionally, reset form data after submission
      setFormData({
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
        expenseDetails: [],
      });

      navigate('/')
      // Optionally, show success message or navigate to another page
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('error uploading the to the firebase')
      // Handle error
    }
  };

  const [part, setPart] = useState(1);

  const handleNext = () => {
    if (part === 1) {
      setPart(2);
    }
  };

  const handlePrev = () => {
    if (part === 2) {
      setPart(1);
    }
  };

  const isFormValid = () => {
    const requiredFields = ['newEnrolment', 'demographicUpdate', 'bioUpdate', 'm100Update', 'm000Update', 'others'];
    return requiredFields.every((field) => formData[field] !== '');
  };

  return (
    <div className='bg-gray-100  p-5'>
      <form onSubmit={handleFormSubmit} className="max-w-xl mx-auto mt-10 py-10 px-10 border rounded-lg shadow-md bg-white">
        {part === 1 && (
          <EnrolmentFormPart1
            formData={formData}
            setIbrahim={setIbrahim}
            ibrahim={ibrahim}
            setFormData={setFormData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            calculateAmount={calculateAmount}
            categoryCounts={categoryCounts}
            setCategoryCounts={setCategoryCounts}
            setIsConfirmedPart1={setIsConfirmedPart1}
            isConfirmedPart1={isConfirmedPart1}
          />
        )}
        {part === 2 && (
          <EnrolmentFormPart2
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            calculateAmount={calculateAmount}
            handleAddReferral={handleAddReferral}
            handleReferralChange={handleReferralChange}
            handleRemoveReferral={handleRemoveReferral}
            handleAddExpense={handleAddExpense}
            handleExpenseChange={handleExpenseChange}
            handleRemoveExpense={handleRemoveExpense}
            setIsConfirmedPart2={setIsConfirmedPart2}
            categoryCounts={categoryCounts}
            setCategoryCounts={setCategoryCounts}
            errors={errors}
          />
        )}

        <div className="flex justify-between mt-4">
          {part === 2 && (
            <button type="button" onClick={handlePrev} className="bg-blue-500 text-white px-4 py-2 rounded">
              Previous
            </button>
          )}
          {part === 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className={`bg-blue-500 text-white m-auto font-medium px-52 py-2 rounded ${!(isFormValid() && isConfirmedPart1) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!(isFormValid() && isConfirmedPart1)}
            >
              Next
            </button>
          ) : (
            <button 
              type="submit" 
              className={`bg-blue-500 text-white px-4 py-2 rounded ${!(isFormValid() && isConfirmedPart2) ? 'opacity-50 cursor-not-allowed' : ''}`} 
              disabled={!(isFormValid() && isConfirmedPart2)}    
              >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EnrolmentFormParent;
