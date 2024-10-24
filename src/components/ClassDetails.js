import React from 'react';
import './ClassDetails.css';

const ClassDetails = ({ classData }) => {
  if (!classData) return null;

  return (
    <div className="class-details">
      <section className="general-info">
        <h2>General Information</h2>
        <p><strong>Package:</strong> {classData.packageName}</p>
        <p><strong>File Path:</strong> {classData.filePath}</p>
      </section>

      <section className="fields-section">
        <h2>Fields</h2>
        <ul>
          {classData.fields && classData.fields.map((field, index) => (
            <li key={index}>{field}</li>
          ))}
        </ul>
      </section>

      <section className="methods-section">
        <h2>Methods</h2>
        <ul>
          {classData.methods && classData.methods.map((method, index) => (
            <li key={index}>{method}</li>
          ))}
        </ul>
      </section>

      <section className="ai-description">
        <h2>AI Description</h2>
        <p>{classData.aiDescription}</p>
      </section>
    </div>
  );
};

export default ClassDetails;