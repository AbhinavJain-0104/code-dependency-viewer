// import React, { useState, useCallback } from 'react';
// import { ForceGraph2D } from 'react-force-graph';
// import './ClassDetailView.css';

// const ClassDetailView = ({ initialClassData, onBack, fetchClassData }) => {
//   const [classStack, setClassStack] = useState([initialClassData]);
//   const currentClassData = classStack[classStack.length - 1];

//   const graphData = React.useMemo(() => {
//     const nodes = [{ id: currentClassData.name, group: 'main' }];
//     const links = [];

//     currentClassData.dependencies.forEach(dep => {
//       nodes.push({ id: dep, group: 'dependency' });
//       links.push({ source: currentClassData.name, target: dep });
//     });

//     return { nodes, links };
//   }, [currentClassData]);

//   const handleNodeClick = useCallback(async (node) => {
//     if (node.group === 'dependency') {
//       const newClassData = await fetchClassData(node.id);
//       if (newClassData) {
//         setClassStack(prevStack => [...prevStack, newClassData]);
//       }
//     }
//   }, [fetchClassData]);

//   const handleBack = () => {
//     if (classStack.length > 1) {
//       setClassStack(prevStack => prevStack.slice(0, -1));
//     } else {
//       onBack();
//     }
//   };

//   return (
//     <div className="class-detail-view">
//       <button onClick={handleBack}>Back</button>
//       <h2>{currentClassData.name}</h2>
//       <div className="class-info">
//         <p><strong>Methods:</strong> {currentClassData.methods.join(', ')}</p>
//         <p><strong>Fields:</strong> {currentClassData.fields.join(', ')}</p>
//       </div>
//       <div className="class-graph">
//         <ForceGraph2D
//           graphData={graphData}
//           nodeAutoColorBy="group"
//           nodeLabel={node => node.id}
//           onNodeClick={handleNodeClick}
//           width={600}
//           height={400}
//         />
//       </div>
//     </div>
//   );
// };

// export default ClassDetailView;


// import React, { useState, useCallback } from 'react';
// import { ForceGraph2D } from 'react-force-graph';
// import { FaArrowLeft, FaDownload } from 'react-icons/fa';
// import './ClassDetailView.css';

// const ClassDetailView = ({ initialClassData, onBack, fetchClassData }) => {
//   const [classStack, setClassStack] = useState([initialClassData]);
//   const currentClassData = classStack[classStack.length - 1];

//   const graphData = React.useMemo(() => {
//     const nodes = [{ id: currentClassData.name, group: 'main' }];
//     const links = [];

//     currentClassData.dependencies.forEach(dep => {
//       nodes.push({ id: dep, group: 'dependency' });
//       links.push({ source: currentClassData.name, target: dep });
//     });

//     return { nodes, links };
//   }, [currentClassData]);

//   const handleNodeClick = useCallback(async (node) => {
//     if (node.group === 'dependency') {
//       const newClassData = await fetchClassData(node.id);
//       if (newClassData) {
//         setClassStack(prevStack => [...prevStack, newClassData]);
//       }
//     }
//   }, [fetchClassData]);

//   const handleBack = () => {
//     if (classStack.length > 1) {
//       setClassStack(prevStack => prevStack.slice(0, -1));
//     } else {
//       onBack();
//     }
//   };

//   return (
//     <div className="class-detail-view">
//       <header>
//         <button onClick={handleBack} className="back-button">
//           <FaArrowLeft /> Back
//         </button>
//         <h2>{currentClassData.name}</h2>
//         <button className="export-button">
//           <FaDownload /> Export
//         </button>
//       </header>
//       <main>
//         <div className="class-info">
//           <h3>Class Information</h3>
//           <p><strong>Package:</strong> {currentClassData.packageName}</p>
//           <p><strong>File Path:</strong> {currentClassData.filePath}</p>
//         </div>
//         <div className="metrics">
//           <div className="metric">
//             <span className="metric-value">{currentClassData.metrics.methodCount}</span>
//             <span className="metric-label">Methods</span>
//           </div>
//           <div className="metric">
//             <span className="metric-value">{currentClassData.metrics.cyclomaticComplexity}</span>
//             <span className="metric-label">Complexity</span>
//           </div>
//           <div className="metric">
//             <span className="metric-value">{currentClassData.metrics.linesOfCode}</span>
//             <span className="metric-label">Lines of Code</span>
//           </div>
//         </div>
//         <div className="graph-container">
//           <ForceGraph2D
//             graphData={graphData}
//             nodeAutoColorBy="group"
//             nodeLabel={node => node.id}
//             onNodeClick={handleNodeClick}
//             width={300}
//             height={200}
//           />
//         </div>
//         <div className="class-details">
//           <details>
//             <summary>Methods ({currentClassData.methods.length})</summary>
//             <ul>
//               {currentClassData.methods.map((method, index) => (
//                 <li key={index}>{method}</li>
//               ))}
//             </ul>
//           </details>
//           <details>
//             <summary>Fields ({currentClassData.fields.length})</summary>
//             <ul>
//               {currentClassData.fields.map((field, index) => (
//                 <li key={index}>{field}</li>
//               ))}
//             </ul>
//           </details>
//         </div>
//       </main>
//       <footer>
//         <p>AI Description: {currentClassData.aiDescription}</p>
//       </footer>
//     </div>
//   );
// };

// export default ClassDetailView;


import React, { useState, useCallback } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { FaArrowLeft } from 'react-icons/fa';
import './ClassDetailView.css';

const ClassDetailView = ({ initialClassData, onBack, fetchClassData }) => {
  const [classStack, setClassStack] = useState([initialClassData]);
  const currentClassData = classStack[classStack.length - 1];

  const graphData = React.useMemo(() => {
    const nodes = [{ id: currentClassData.name, group: 'main' }];
    const links = [];

    currentClassData.dependencies.forEach(dep => {
      nodes.push({ id: dep, group: 'dependency' });
      links.push({ source: currentClassData.name, target: dep });
    });

    return { nodes, links };
  }, [currentClassData]);

  const handleNodeClick = useCallback(async (node) => {
    if (node.group === 'dependency') {
      const newClassData = await fetchClassData(node.id);
      if (newClassData) {
        setClassStack(prevStack => [...prevStack, newClassData]);
      }
    }
  }, [fetchClassData]);

  const handleBack = () => {
    if (classStack.length > 1) {
      setClassStack(prevStack => prevStack.slice(0, -1));
    } else {
      onBack();
    }
  };

  return (
    <div className="class-detail-view">
      <header>
        <button onClick={handleBack} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <h2>{currentClassData.name}</h2>
      </header>
      <main>
        <div className="class-info">
          <h3>General Information</h3>
          <p><strong>Package:</strong> {currentClassData.packageName}</p>
          <p><strong>File Path:</strong> {currentClassData.filePath}</p>
        </div>
        <div className="metrics">
          <div className="metric">
            <span className="metric-value">{currentClassData.metrics.methodCount}</span>
            <span className="metric-label">Methods</span>
          </div>
          <div className="metric">
            <span className="metric-value">{currentClassData.metrics.cyclomaticComplexity}</span>
            <span className="metric-label">Complexity</span>
          </div>
          <div className="metric">
            <span className="metric-value">{currentClassData.metrics.linesOfCode}</span>
            <span className="metric-label">Lines of Code</span>
          </div>
        </div>
        <div className="graph-container">
          <ForceGraph2D
            graphData={graphData}
            nodeAutoColorBy="group"
            nodeLabel={node => node.id}
            onNodeClick={handleNodeClick}
            width={300}
            height={200}
          />
        </div>
        <div className="ai-description">
          <h3>AI Description</h3>
          <p>{currentClassData.aiDescription}</p>
        </div>
      </main>
    </div>
  );
};

export default ClassDetailView;