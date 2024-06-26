import React, { useState } from 'react';

const HtmlFileParser = () => {
  
  const [fileContent, setFileContent] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [filteredResults, setFilteredResults] = useState(null);
const [categoryCounts, setCategoryCounts] = useState({
    demo: 0,
    bio: 0,
    m100: 0,
    m000: 0,
    new: 0,
    others: 0,
    totalDeposite: 0
  });

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

    // Extract data based on provided HTML structure
    const date = doc.querySelector('.first_view td:nth-child(2) span')?.innerText;
    // const registrar = doc.querySelector('.first_view td:nth-child(4) span')?.innerText;
    // const agency = doc.querySelector('.first_view td:nth-child(6) span')?.innerText;
    // const operator = doc.querySelector('.first_view td:nth-child(8) span')?.innerText;
    // const stationId = doc.querySelector('.first_view td:nth-child(10) span')?.innerText;
    // const lastRegistered = doc.querySelector('.second_view td:nth-child(2) span')?.innerText;
    // const lastSynch = doc.querySelector('.second_view td:nth-child(4) span')?.innerText;
    // const versionNo = doc.querySelector('.second_view td:nth-child(6) span')?.innerText;
    // const reportGeneratedDate = doc.querySelector('.pick_date h3')?.innerText;

    const enrolments = Array.from(doc.querySelectorAll('.pick_date tbody tr')).map(row => {
      const cells = row.querySelectorAll('td');
      return {
        date: cells[0]?.innerText,
        enrolments: cells[1]?.innerText,
        updates: cells[2]?.innerText,
        total: cells[3]?.innerText
      };
    });

    const details = Array.from(doc.querySelectorAll('.details_view tbody tr')).map(row => {
      const cells = row.querySelectorAll('td');
      return {
        sNo: cells[0]?.innerText,
        enrolmentNo: cells[1]?.innerText,
        // appointmentId: cells[2]?.innerText,
        type: cells[3]?.innerText,
        mandatoryBiometricUpdate: cells[4]?.innerText,
        // isNri: cells[5]?.innerText,
        // tinNumber: cells[6]?.innerText,
        // operatorId: cells[7]?.innerText,
        // reviewerId: cells[8]?.innerText,
        // introducer: cells[9]?.innerText,
        // proof: cells[10]?.innerText,
        resident: cells[11]?.innerText,
        status: cells[12]?.innerText,
        // introducerReviewStatus: cells[13]?.innerText,
        // userReviewStatus: cells[14]?.innerText,
        // gstApplied: cells[15]?.innerText,
        // amountChargedNew: cells[16]?.innerText,
        // amountChargedUpdate: cells[17]?.innerText,
        totalAmountCharged: cells[18]?.innerText,
      };
    });

    setExtractedData({
      date,
    //   registrar,
    //   agency,
    //   operator,
    //   stationId,
    //   lastRegistered,
    //   lastSynch,
    //   versionNo,
    //   reportGeneratedDate,
      enrolments,
      details
    });

    filterData(details);
  };

 // Filter data with updated logic
 const filterData = (details) => {
    // Ensure extractedData and enrolments are available
  
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
  
    setFilteredResults(filtered);
  
    // Calculate category counts
    const counts = {
      demo: 0,
      bio: 0,
      m100: 0,
      m000: 0,
      new: 0,
      others: 0,
      totalDeposite: 0 // Initialize totalDeposite count
    };
  
    // Calculate totalDeposite
    let totalDeposite = 0;

    details.map((item => {
        totalDeposite += parseFloat(item.totalAmountCharged);
        return totalDeposite
    }))

  
    counts.totalDeposite = totalDeposite;
  
    // Count categories
    filtered.forEach((item) => {
      counts[item.category]++;
    });
  
    setCategoryCounts(counts);
  };
  
  

  console.log("CategoryCounts", categoryCounts);
  console.log("FilteredResults", filteredResults);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-700">
          Upload HTML File
        </label>
        <input 
          type="file" 
          id="file-upload" 
          accept=".html"
          onChange={handleFileChange}
          className="border border-gray-300 rounded p-2"
        />
      </div>

      {extractedData && (
        <div className="mt-8">
          <h2 className="text-center text-2xl font-bold mb-4">Extracted Data</h2>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Enrolments</h3>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">New</th>
                  <th className="border border-gray-300 px-4 py-2">Demo</th>
                  <th className="border border-gray-300 px-4 py-2">bio</th>
                  <th className="border border-gray-300 px-4 py-2">m100</th>
                  <th className="border border-gray-300 px-4 py-2">m000</th>
                  {/* <th className="border border-gray-300 px-4 py-2">No. of Updates</th> */}
                  <th className="border border-gray-300 px-4 py-2">Total</th>
                  <th className="border border-gray-300 px-4 py-2">Total Deposite</th>
                </tr>
              </thead>
              <tbody>
                {extractedData.enrolments.map((enrolment, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{enrolment.date}</td>
                    <td className="border border-gray-300 px-4 py-2">{enrolment.enrolments}</td>
                    <td className="border border-gray-300 px-4 py-2">{categoryCounts.demo}</td>
                    <td className="border border-gray-300 px-4 py-2">{categoryCounts.bio}</td>
                    <td className="border border-gray-300 px-4 py-2">{categoryCounts.m100}</td>
                    <td className="border border-gray-300 px-4 py-2">{categoryCounts.m000}</td>
                    {/* <td className="border border-gray-300 px-4 py-2">{enrolment.updates}</td> */}
                    <td className="border border-gray-300 px-4 py-2">{enrolment.total}</td>
                    <td className="border border-gray-300 px-4 py-2">{categoryCounts.totalDeposite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Filtered Detailed Enrolment Information</h3>
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">S. No.</th>
                  <th className="border border-gray-300 px-4 py-2">Enrolment No.</th>
                  {/* <th className="border border-gray-300 px-4 py-2">Appointment ID</th> */}
                  <th className="border border-gray-300 px-4 py-2">Type</th>
                  <th className="border border-gray-300 px-4 py-2">Mandatory Biometric Update</th>
                  {/* <th className="border border-gray-300 px-4 py-2">Is NRI</th> */}
                  {/* <th className="border border-gray-300 px-4 py-2">TIN Number</th> */}
                  {/* <th className="border border-gray-300 px-4 py-2">Operator ID</th> */}
                  {/* <th className="border border-gray-300 px-4 py-2">Reviewer ID</th> */}
                  {/* <th className="border border-gray-300 px-4 py-2">Introducer</th> */}
                  {/* <th className="border border-gray-300 px-4 py-2">Proof</th> */}
                  <th className="border border-gray-300 px-4 py-2">Resident</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                  {/* <th className="border border-gray-300 px-4 py-2">Introducer Review Status</th> */}
                  {/* <th className="border border-gray-300 px-4 py-2">User Review Status</th> */}
                  {/* <th className="border border-gray-300 px-4 py-2">GST Applied</th> */}
                  {/* <th className="border border-gray-300 px-4 py-2">Amount Charged New</th> */}
                  {/* <th className="border border-gray-300 px-4 py-2">Amount Charged Update</th> */}
                  <th className="border border-gray-300 px-4 py-2">Total Amount Charged</th>
                  <th className="border border-gray-300 px-4 py-2">Category</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults?.map((detail, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{detail.sNo}</td>
                    <td className="border border-gray-300 px-4 py-2">{detail.enrolmentNo}</td>
                    {/* <td className="border border-gray-300 px-4 py-2">{detail.appointmentId}</td> */}
                    <td className="border border-gray-300 px-4 py-2">{detail.type}</td>
                    <td className="border border-gray-300 px-4 py-2">{detail.mandatoryBiometricUpdate}</td>
                    {/* <td className="border border-gray-300 px-4 py-2">{detail.isNri}</td> */}
                    {/* <td className="border border-gray-300 px-4 py-2">{detail.tinNumber}</td> */}
                    {/* <td className="border border-gray-300 px-4 py-2">{detail.operatorId}</td> */}
                    {/* <td className="border border-gray-300 px-4 py-2">{detail.reviewerId}</td> */}
                    {/* <td className="border border-gray-300 px-4 py-2">{detail.introducer}</td> */}
                    {/* <td className="border border-gray-300 px-4 py-2">{detail.proof}</td> */}
                    <td className="border border-gray-300 px-4 py-2">{detail.resident}</td>
                    <td className="border border-gray-300 px-4 py-2">{detail.status}</td>
                    {/* <td className="border border-gray-300 px-4 py-2">{detail.introducerReviewStatus}</td> */}
                    {/* <td className="border border-gray-300 px-4 py-2">{detail.userReviewStatus}</td> */}
                    {/* <td className="border border-gray-300 px-4 py-2">{detail.gstApplied}</td> */}
                    {/* <td className="border border-gray-300 px-4 py-2">{detail.amountChargedNew}</td> */}
                    {/* <td className="border border-gray-300 px-4 py-2">{detail.amountChargedUpdate}</td> */}
                    <td className="border border-gray-300 px-4 py-2">{detail.totalAmountCharged}</td>
                    <td className="border border-gray-300 px-4 py-2">{detail.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
};

export default HtmlFileParser;






////////////////////////////////////////////////////////////////////////////////

// import React, { useState } from 'react';

// const HtmlFileParser = () => {
//   const [fileContent, setFileContent] = useState(null);
//   const [extractedData, setExtractedData] = useState({
//     date: null,
//     registrar: null,
//     agency: null,
//     operator: null,
//     stationId: null,
//     lastRegistered: null,
//     lastSynch: null,
//     versionNo: null,
//     reportGeneratedDate: null,
//     enrolments: [],
//     details: []
//   });
//   const [filteredResults, setFilteredResults] = useState(null);
//   const [categoryCounts, setCategoryCounts] = useState({
//     demo: 0,
//     bio: 0,
//     m100: 0,
//     m000: 0,
//     new: 0,
//     others: 0
//   });

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setFileContent(event.target.result);
//         extractData(event.target.result);
//       };
//       reader.readAsText(file);
//     }
//   };

//   const extractData = (html) => {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');

//     // Extract data based on provided HTML structure
//     const date = doc.querySelector('.first_view td:nth-child(2) span')?.innerText;
//     const registrar = doc.querySelector('.first_view td:nth-child(4) span')?.innerText;
//     const agency = doc.querySelector('.first_view td:nth-child(6) span')?.innerText;
//     const operator = doc.querySelector('.first_view td:nth-child(8) span')?.innerText;
//     const stationId = doc.querySelector('.first_view td:nth-child(10) span')?.innerText;
//     const lastRegistered = doc.querySelector('.second_view td:nth-child(2) span')?.innerText;
//     const lastSynch = doc.querySelector('.second_view td:nth-child(4) span')?.innerText;
//     const versionNo = doc.querySelector('.second_view td:nth-child(6) span')?.innerText;
//     const reportGeneratedDate = doc.querySelector('.pick_date h3')?.innerText;

//     const enrolments = Array.from(doc.querySelectorAll('.pick_date tbody tr')).map(row => {
//       const cells = row.querySelectorAll('td');
//       return {
//         date: cells[0]?.innerText,
//         enrolments: cells[1]?.innerText,
//         updates: cells[2]?.innerText,
//         total: cells[3]?.innerText
//       };
//     });

//     const details = Array.from(doc.querySelectorAll('.details_view tbody tr')).map(row => {
//       const cells = row.querySelectorAll('td');
//       return {
//         sNo: cells[0]?.innerText,
//         enrolmentNo: cells[1]?.innerText,
//         appointmentId: cells[2]?.innerText,
//         type: cells[3]?.innerText,
//         mandatoryBiometricUpdate: cells[4]?.innerText,
//         isNri: cells[5]?.innerText,
//         tinNumber: cells[6]?.innerText,
//         operatorId: cells[7]?.innerText,
//         reviewerId: cells[8]?.innerText,
//         introducer: cells[9]?.innerText,
//         proof: cells[10]?.innerText,
//         resident: cells[11]?.innerText,
//         status: cells[12]?.innerText,
//         introducerReviewStatus: cells[13]?.innerText,
//         userReviewStatus: cells[14]?.innerText,
//         gstApplied: cells[15]?.innerText,
//         amountChargedNew: cells[16]?.innerText,
//         amountChargedUpdate: cells[17]?.innerText,
//         totalAmountCharged: cells[18]?.innerText,
//       };
//     });

//     setExtractedData({
//       date,
//       registrar,
//       agency,
//       operator,
//       stationId,
//       lastRegistered,
//       lastSynch,
//       versionNo,
//       reportGeneratedDate,
//       enrolments,
//       details
//     });

//     filterData(details);
//   };

//   const filterData = (details) => {
//     const filtered = details.map((item) => {
//       const mandatoryBiometricUpdate = item.mandatoryBiometricUpdate?.trim().toLowerCase();
//       const totalAmountCharged = parseFloat(item.totalAmountCharged);
//       const type = item.type?.trim();

//       if (mandatoryBiometricUpdate === 'no' && totalAmountCharged === 50) {
//         return { ...item, category: 'demo' };
//       } else if (mandatoryBiometricUpdate === 'no' && totalAmountCharged === 100) {
//         return { ...item, category: 'bio' };
//       } else if (mandatoryBiometricUpdate === 'yes' && totalAmountCharged === 100) {
//         return { ...item, category: 'm100' };
//       } else if (mandatoryBiometricUpdate === 'yes' && totalAmountCharged === 0) {
//         return { ...item, category: 'm000' };
//       } else if (type === 'E' && totalAmountCharged === 0) {
//         return { ...item, category: 'new' };
//       } else {
//         return { ...item, category: 'others' };
//       }
//     });

//     setFilteredResults(filtered);

//     const counts = {
//       demo: 0,
//       bio: 0,
//       m100: 0,
//       m000: 0,
//       new: 0,
//       others: 0
//     };

//     filtered.forEach((item) => {
//       counts[item.category]++;
//     });

//     setCategoryCounts(counts);
//   };

//   console.log('categoryCounts', categoryCounts);

//   return (
//     <div className="container mx-auto p-4">
//       <div className="mb-4">
//         <label htmlFor="file-upload" className="block mb-2 text-sm font-medium text-gray-700">
//           Upload HTML File
//         </label>
//         <input 
//           type="file" 
//           id="file-upload" 
//           accept=".html"
//           onChange={handleFileChange}
//           className="border border-gray-300 rounded p-2"
//         />
//       </div>

//       {extractedData && (
//         <div className="mt-8">
//           <h2 className="text-center text-2xl font-bold mb-4">Extracted Data</h2>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Details</h3>
//               <p><b>Date:</b> {extractedData.date}</p>
//               <p><b>Registrar:</b> {extractedData.registrar}</p>
//               <p><b>Enrolment Agency:</b> {extractedData.agency}</p>
//               <p><b>Operator:</b> {extractedData.operator}</p>
//               <p><b>Station ID:</b> {extractedData.stationId}</p>
//             </div>
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Other Information</h3>
//               <p><b>Last Registered:</b> {extractedData.lastRegistered}</p>
//               <p><b>Last Synch:</b> {extractedData.lastSynch}</p>
//               <p><b>Version no. of Client:</b> {extractedData.versionNo}</p>
//               <p><b>Report Generated for Date:</b> {extractedData.reportGeneratedDate}</p>
//             </div>
//           </div>
//           <div className="mt-8">
//             <h3 className="text-xl font-semibold mb-2">Enrolments</h3>
//             <table className="min-w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr>
//                   <th className="border border-gray-300 px-4 py-2">Date</th>
//                   <th className="border border-gray-300 px-4 py-2">New</th>
//                   <th className="border border-gray-300 px-4 py-2">No. of Updates</th>
//                   <th className="border border-gray-300 px-4 py-2">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {extractedData.enrolments.map((enrolment, index) => (
//                   <tr key={index}>
//                     <td className="border border-gray-300 px-4 py-2">{enrolment.date}</td>
//                     <td className="border border-gray-300 px-4 py-2">{enrolment.enrolments}</td>
//                     <td className="border border-gray-300 px-4 py-2">{enrolment.updates}</td>
//                     <td className="border border-gray-300 px-4 py-2">{enrolment.total}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="mt-8">
//             <h3 className="text-xl font-semibold mb-2">Filtered Detailed Enrolment Information</h3>
//             <table className="min-w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr>
//                   <th className="border border-gray-300 px-4 py-2">S. No.</th>
//                   <th className="border border-gray-300 px-4 py-2">Enrolment No.</th>
//                   <th className="border border-gray-300 px-4 py-2">Type</th>
//                   <th className="border border-gray-300 px-4 py-2">Mandatory Biometric Update</th>
//                   <th className="border border-gray-300 px-4 py-2">Proof</th>
//                   <th className="border border-gray-300 px-4 py-2">Resident</th>
//                   <th className="border border-gray-300 px-4 py-2">Status</th>
//                   <th className="border border-gray-300 px-4 py-2">Total Amount Charged</th>
//                   <th className="border border-gray-300 px-4 py-2">Category</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredResults?.map((detail, index) => (
//                   <tr key={index}>
//                     <td className="border border-gray-300 px-4 py-2">{detail.sNo}</td>
//                     <td className="border border-gray-300 px-4 py-2">{detail.enrolmentNo}</td>
//                     <td className="border border-gray-300 px-4 py-2">{detail.type}</td>
//                     <td className="border border-gray-300 px-4 py-2">{detail.mandatoryBiometricUpdate}</td>
//                     <td className="border border-gray-300 px-4 py-2">{detail.proof}</td>
//                     <td className="border border-gray-300 px-4 py-2">{detail.resident}</td>
//                     <td className="border border-gray-300 px-4 py-2">{detail.status}</td>
//                     <td className="border border-gray-300 px-4 py-2">{detail.totalAmountCharged}</td>
//                     <td className="border border-gray-300 px-4 py-2">{detail.category}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HtmlFileParser;


