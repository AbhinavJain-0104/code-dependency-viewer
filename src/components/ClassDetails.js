// import React from 'react';
// import './ClassDetails.css';

// const ClassDetails = ({ classData }) => {
//   if (!classData) return null;

//   return (
//     <div className="class-details">
//       <h3>{classData.name}</h3>
//       <p>Package: {classData.packageName}</p>
//       <p>File Path: {classData.filePath}</p>
//       <h4>Methods:</h4>
//       <ul>
//         {classData.methods && classData.methods.map((method, index) => (
//           <li key={index}>{method}</li>
//         ))}
//       </ul>
//       <h4>Fields:</h4>
//       <ul>
//         {classData.fields && classData.fields.map((field, index) => (
//           <li key={index}>{field}</li>
//         ))}
//       </ul>
//       <p>AI Description: {classData.aiDescription}</p>
//     </div>
//   );
// };

// export default ClassDetails;


import React from 'react';
import './ClassDetails.css';

const ClassDetails = ({ classData }) => {
  if (!classData) return null;

  return (
    <div className="class-details">
      <h3>{classData.name}</h3>
      <div className="general-info">
        <p><strong>Package:</strong> {classData.packageName}</p>
        <p><strong>File Path:</strong> {classData.filePath}</p>
      </div>
      <div className="fields-section">
        <h4>Fields:</h4>
        <ul>
          {classData.fields && classData.fields.map((field, index) => (
            <li key={index}>{field}</li>
          ))}
        </ul>
      </div>
      <div className="methods-section">
        <h4>Methods:</h4>
        <ul>
          {classData.methods && classData.methods.map((method, index) => (
            <li key={index}>{method}</li>
          ))}
        </ul>
      </div>
      <div className="ai-description">
        <h4>AI Description:</h4>
        <p>{classData.aiDescription}</p>
      </div>
    </div>
  );
};

export default ClassDetails;