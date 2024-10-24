// import React from 'react';
// import './ClassDetails.css';

// const GeneralInfo = ({ packageName, filePath }) => (
//   <section className="general-info">
//     <h2>General Information</h2>
//     <p><strong>Package:</strong> {packageName}</p>
//     <p><strong>File Path:</strong> {filePath}</p>
//   </section>
// );

// const Fields = ({ fields }) => (
//   <section className="fields-section">
//     <h2>Fields</h2>
//     <ul>
//       {fields.map((field, index) => (
//         <li key={index}>{field}</li>
//       ))}
//     </ul>
//   </section>
// );

// const Methods = ({ methods }) => (
//   <section className="methods-section">
//     <h2>Methods</h2>
//     <ul>
//       {methods.map((method, index) => (
//         <li key={index}>{method}</li>
//       ))}
//     </ul>
//   </section>
// );

// const AIDescription = ({ description }) => (
//   <section className="ai-description">
//     <h2>AI Description</h2>
//     <p>{description}</p>
//   </section>
// );

// const ClassDetails = ({ classData }) => {
//   if (!classData) return null;

//   return (
//     <div className="class-details">
//       <GeneralInfo packageName={classData.packageName} filePath={classData.filePath} />
//       <Fields fields={classData.fields} />
//       <Methods methods={classData.methods} />
//       <AIDescription description={classData.aiDescription} />
//     </div>
//   );
// };

// export default ClassDetails;





import React from 'react';
import './ClassDetails.css';

const GeneralInfo = ({ packageName, filePath }) => (
  <section className="general-info">
    <h2>General Information</h2>
    <p><strong>Package:</strong> {packageName}</p>
    <p><strong>File Path:</strong> {filePath}</p>
  </section>
);

const Fields = ({ fields }) => (
  <section className="fields-section">
    <h2>Fields</h2>
    <ul>
      {fields.map((field, index) => (
        <li key={index}>{field}</li>
      ))}
    </ul>
  </section>
);

const Methods = ({ methods }) => (
  <section className="methods-section">
    <h2>Methods</h2>
    <ul>
      {methods.map((method, index) => (
        <li key={index}>{method}</li>
      ))}
    </ul>
  </section>
);

const AIDescription = ({ description }) => (
  <section className="ai-description">
    <h2>AI Description</h2>
    <p>{description}</p>
  </section>
);

const ClassDetails = ({ classData }) => {
  if (!classData) return null;

  return (
    <div className="class-details">
      <GeneralInfo packageName={classData.packageName} filePath={classData.filePath} />
      <Fields fields={classData.fields} />
      <Methods methods={classData.methods} />
      <AIDescription description={classData.aiDescription} />
    </div>
  );
};

export default ClassDetails;