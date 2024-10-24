// // import React, { useState, useCallback } from 'react';
// // import { ForceGraph2D } from 'react-force-graph';
// // import './ClassDetailView.css';

// // const ClassDetailView = ({ initialClassData, onBack, fetchClassData }) => {
// //   const [classStack, setClassStack] = useState([initialClassData]);
// //   const currentClassData = classStack[classStack.length - 1];

// //   const graphData = React.useMemo(() => {
// //     const nodes = [{ id: currentClassData.name, group: 'main' }];
// //     const links = [];

// //     currentClassData.dependencies.forEach(dep => {
// //       nodes.push({ id: dep, group: 'dependency' });
// //       links.push({ source: currentClassData.name, target: dep });
// //     });

// //     return { nodes, links };
// //   }, [currentClassData]);

// //   const handleNodeClick = useCallback(async (node) => {
// //     if (node.group === 'dependency') {
// //       const newClassData = await fetchClassData(node.id);
// //       if (newClassData) {
// //         setClassStack(prevStack => [...prevStack, newClassData]);
// //       }
// //     }
// //   }, [fetchClassData]);

// //   const handleBack = () => {
// //     if (classStack.length > 1) {
// //       setClassStack(prevStack => prevStack.slice(0, -1));
// //     } else {
// //       onBack();
// //     }
// //   };

// //   return (
// //     <div className="class-detail-view">
// //       <button onClick={handleBack}>Back</button>
// //       <h2>{currentClassData.name}</h2>
// //       <div className="class-info">
// //         <p><strong>Methods:</strong> {currentClassData.methods.join(', ')}</p>
// //         <p><strong>Fields:</strong> {currentClassData.fields.join(', ')}</p>
// //       </div>
// //       <div className="class-graph">
// //         <ForceGraph2D
// //           graphData={graphData}
// //           nodeAutoColorBy="group"
// //           nodeLabel={node => node.id}
// //           onNodeClick={handleNodeClick}
// //           width={600}
// //           height={400}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ClassDetailView;


// // import React, { useState, useCallback } from 'react';
// // import { ForceGraph2D } from 'react-force-graph';
// // import { FaArrowLeft, FaDownload } from 'react-icons/fa';
// // import './ClassDetailView.css';

// // const ClassDetailView = ({ initialClassData, onBack, fetchClassData }) => {
// //   const [classStack, setClassStack] = useState([initialClassData]);
// //   const currentClassData = classStack[classStack.length - 1];

// //   const graphData = React.useMemo(() => {
// //     const nodes = [{ id: currentClassData.name, group: 'main' }];
// //     const links = [];

// //     currentClassData.dependencies.forEach(dep => {
// //       nodes.push({ id: dep, group: 'dependency' });
// //       links.push({ source: currentClassData.name, target: dep });
// //     });

// //     return { nodes, links };
// //   }, [currentClassData]);

// //   const handleNodeClick = useCallback(async (node) => {
// //     if (node.group === 'dependency') {
// //       const newClassData = await fetchClassData(node.id);
// //       if (newClassData) {
// //         setClassStack(prevStack => [...prevStack, newClassData]);
// //       }
// //     }
// //   }, [fetchClassData]);

// //   const handleBack = () => {
// //     if (classStack.length > 1) {
// //       setClassStack(prevStack => prevStack.slice(0, -1));
// //     } else {
// //       onBack();
// //     }
// //   };

// //   return (
// //     <div className="class-detail-view">
// //       <header>
// //         <button onClick={handleBack} className="back-button">
// //           <FaArrowLeft /> Back
// //         </button>
// //         <h2>{currentClassData.name}</h2>
// //         <button className="export-button">
// //           <FaDownload /> Export
// //         </button>
// //       </header>
// //       <main>
// //         <div className="class-info">
// //           <h3>Class Information</h3>
// //           <p><strong>Package:</strong> {currentClassData.packageName}</p>
// //           <p><strong>File Path:</strong> {currentClassData.filePath}</p>
// //         </div>
// //         <div className="metrics">
// //           <div className="metric">
// //             <span className="metric-value">{currentClassData.metrics.methodCount}</span>
// //             <span className="metric-label">Methods</span>
// //           </div>
// //           <div className="metric">
// //             <span className="metric-value">{currentClassData.metrics.cyclomaticComplexity}</span>
// //             <span className="metric-label">Complexity</span>
// //           </div>
// //           <div className="metric">
// //             <span className="metric-value">{currentClassData.metrics.linesOfCode}</span>
// //             <span className="metric-label">Lines of Code</span>
// //           </div>
// //         </div>
// //         <div className="graph-container">
// //           <ForceGraph2D
// //             graphData={graphData}
// //             nodeAutoColorBy="group"
// //             nodeLabel={node => node.id}
// //             onNodeClick={handleNodeClick}
// //             width={300}
// //             height={200}
// //           />
// //         </div>
// //         <div className="class-details">
// //           <details>
// //             <summary>Methods ({currentClassData.methods.length})</summary>
// //             <ul>
// //               {currentClassData.methods.map((method, index) => (
// //                 <li key={index}>{method}</li>
// //               ))}
// //             </ul>
// //           </details>
// //           <details>
// //             <summary>Fields ({currentClassData.fields.length})</summary>
// //             <ul>
// //               {currentClassData.fields.map((field, index) => (
// //                 <li key={index}>{field}</li>
// //               ))}
// //             </ul>
// //           </details>
// //         </div>
// //       </main>
// //       <footer>
// //         <p>AI Description: {currentClassData.aiDescription}</p>
// //       </footer>
// //     </div>
// //   );
// // };

// // export default ClassDetailView;


// // import React, { useState, useCallback, useRef, useEffect } from 'react';
// // import Graph from 'react-graph-vis';
// // import { FaArrowLeft } from 'react-icons/fa';
// // import './ClassDetailView.css';

// // const ClassDetailView = ({ initialClassData, onBack, fetchClassData }) => {
// //   const [classStack, setClassStack] = useState([initialClassData]);
// //   const currentClassData = classStack[classStack.length - 1];
// //   const containerRef = useRef();
// //   const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

// //   useEffect(() => {
// //     const updateDimensions = () => {
// //       if (containerRef.current) {
// //         const { width, height } = containerRef.current.getBoundingClientRect();
// //         setDimensions({ width, height: height * 0.6 });
// //       }
// //     };

// //     window.addEventListener('resize', updateDimensions);
// //     updateDimensions();

// //     return () => window.removeEventListener('resize', updateDimensions);
// //   }, []);

// //   const graphData = React.useMemo(() => {
// //     const nodes = [{ id: currentClassData.name, label: currentClassData.name, color: '#ff9ff3' }];
// //     const edges = [];

// //     if (currentClassData.dependencies) {
// //       currentClassData.dependencies.forEach(dep => {
// //         nodes.push({ id: dep, label: dep, color: '#54a0ff' });
// //         edges.push({ from: currentClassData.name, to: dep });
// //       });
// //     }

// //     return { nodes, edges };
// //   }, [currentClassData]);

// //   const options = {
// //     layout: {
// //       improvedLayout: true,
// //       hierarchical: false
// //     },
// //     edges: {
// //       color: "#FFFFFF",
// //       smooth: {
// //         type: 'cubicBezier',
// //         forceDirection: 'horizontal',
// //         roundness: 0.4
// //       }
// //     },
// //     nodes: {
// //       shape: 'dot',
// //       size: 16,
// //       font: {
// //         size: 12,
// //         color: '#FFFFFF'
// //       },
// //       borderWidth: 2,
// //       shadow: true
// //     },
// //     physics: {
// //       forceAtlas2Based: {
// //         gravitationalConstant: -50,
// //         centralGravity: 0.01,
// //         springLength: 100,
// //         springConstant: 0.08
// //       },
// //       maxVelocity: 50,
// //       solver: 'forceAtlas2Based',
// //       timestep: 0.35,
// //       stabilization: { iterations: 150 }
// //     }
// //   };

// //   const handleNodeClick = useCallback(async (event) => {
// //     const { nodes } = event;
// //     if (nodes.length > 0) {
// //       const clickedNode = graphData.nodes.find(node => node.id === nodes[0]);
// //       if (clickedNode && clickedNode.id !== currentClassData.name) {
// //         const newClassData = await fetchClassData(clickedNode.id);
// //         if (newClassData) {
// //           setClassStack(prevStack => [...prevStack, newClassData]);
// //         }
// //       }
// //     }
// //   }, [fetchClassData, graphData.nodes, currentClassData.name]);

// //   const handleBack = () => {
// //     if (classStack.length > 1) {
// //       setClassStack(prevStack => prevStack.slice(0, -1));
// //     } else {
// //       onBack();
// //     }
// //   };

// //   return (
// //     <div className="class-detail-view">
// //       <header>
// //         <button onClick={handleBack} className="back-button">
// //           <FaArrowLeft /> Back
// //         </button>
// //         <h2>{currentClassData.name}</h2>
// //       </header>
// //       <main>
// //         <div className="left-panel">
// //           <div className="graph-container" ref={containerRef}>
// //             <Graph
// //               graph={graphData}
// //               options={options}
// //               events={{ select: handleNodeClick }}
// //               style={{ height: `${dimensions.height}px`, width: '100%' }}
// //             />
// //           </div>
// //           <div className="metrics">
// //             <div className="metric">
// //               <span className="metric-value">{currentClassData.metrics?.methodCount || 'N/A'}</span>
// //               <span className="metric-label">Methods</span>
// //             </div>
// //             <div className="metric">
// //               <span className="metric-value">{currentClassData.metrics?.cyclomaticComplexity || 'N/A'}</span>
// //               <span className="metric-label">Complexity</span>
// //             </div>
// //             <div className="metric">
// //               <span className="metric-value">{currentClassData.metrics?.linesOfCode || 'N/A'}</span>
// //               <span className="metric-label">Lines of Code</span>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="right-panel">
// //           <div className="general-info">
// //             <h3>General Information</h3>
// //             <p><strong>Package:</strong> {currentClassData.packageName}</p>
// //             <p><strong>File Path:</strong> {currentClassData.filePath}</p>
// //             <h4>Fields:</h4>
// //             <ul>
// //               {currentClassData.fields?.map(field => (
// //                 <li key={field}>{field}</li>
// //               ))}
// //             </ul>
// //             <h4>Methods:</h4>
// //             <ul>
// //               {currentClassData.methods?.map(method => (
// //                 <li key={method}>{method}</li>
// //               ))}
// //             </ul>
// //           </div>
// //           <div className="ai-description">
// //             <h3>AI Description</h3>
// //             <p><strong>{currentClassData.aiDescription || 'No AI description available.'}</strong></p>
// //           </div>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // };

// // export default ClassDetailView;


// import React, { useState, useCallback, useRef, useEffect } from 'react';
// import Graph from 'react-graph-vis';
// import { FaArrowLeft, FaExpandAlt } from 'react-icons/fa';
// import './ClassDetailView.css';

// const ClassDetailView = ({ initialClassData, onBack, fetchClassData }) => {
//   const [classStack, setClassStack] = useState([initialClassData]);
//   const currentClassData = classStack[classStack.length - 1];
//   const containerRef = useRef();
//   const [dimensions, setDimensions] = useState({ width: '100%', height: '60vh' });
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (containerRef.current) {
//         const { width, height } = containerRef.current.getBoundingClientRect();
//         setDimensions({ width: '100%', height: isFullScreen ? '90vh' : '60vh' });
//       }
//     };

//     window.addEventListener('resize', updateDimensions);
//     updateDimensions();

//     return () => window.removeEventListener('resize', updateDimensions);
//   }, [isFullScreen]);

//   const graphData = React.useMemo(() => {
//   const nodes = [{ id: currentClassData.name, label: currentClassData.name, color: '#ff9ff3' }];
//   const edges = [];

//   if (currentClassData.dependencies) {
//     currentClassData.dependencies.forEach(dep => {
//       nodes.push({ id: dep, label: dep, color: '#54a0ff' });
//       edges.push({ from: currentClassData.name, to: dep });
//     });
//   }

//   if (currentClassData.usedClasses) {
//     currentClassData.usedClasses.forEach(usedClass => {
//       if (!nodes.some(node => node.id === usedClass)) {
//         nodes.push({ id: usedClass, label: usedClass, color: '#5f27cd' });
//       }
//       edges.push({ from: usedClass, to: currentClassData.name });
//     });
//   }

//   return { nodes, edges };
// }, [currentClassData]);

//  const options = {
//   layout: {
//     improvedLayout: true,
//     hierarchical: false
//   },
//   edges: {
//     color: "#FFFFFF",
//     smooth: {
//       type: 'cubicBezier',
//       forceDirection: 'horizontal',
//       roundness: 0.4
//     },
//     arrows: {
//       to: { enabled: true, scaleFactor: 0.5 }
//     }
//   },
//   nodes: {
//     shape: 'dot',
//     size: 16,
//     font: {
//       size: 12,
//       color: '#FFFFFF'
//     },
//     borderWidth: 2,
//     shadow: true
//   },
//   physics: {
//     forceAtlas2Based: {
//       gravitationalConstant: -50,
//       centralGravity: 0.01,
//       springLength: 100,
//       springConstant: 0.08
//     },
//     maxVelocity: 50,
//     solver: 'forceAtlas2Based',
//     timestep: 0.35,
//     stabilization: { iterations: 150 }
//   },
//   interaction: {
//     hover: true,
//     tooltipDelay: 300
//   }
// };

//   const handleNodeClick = useCallback(async (event) => {
//     const { nodes } = event;
//     if (nodes.length > 0) {
//       const clickedNode = graphData.nodes.find(node => node.id === nodes[0]);
//       if (clickedNode && clickedNode.id !== currentClassData.name) {
//         const newClassData = await fetchClassData(clickedNode.id);
//         if (newClassData) {
//           setClassStack(prevStack => [...prevStack, newClassData]);
//         }
//       }
//     }
//   }, [fetchClassData, graphData.nodes, currentClassData.name]);

//   const handleBack = () => {
//     if (classStack.length > 1) {
//       setClassStack(prevStack => prevStack.slice(0, -1));
//     } else {
//       onBack();
//     }
//   };

//   const toggleFullScreen = () => {
//     setIsFullScreen(!isFullScreen);
//   };

//   return (
//     <div className={`class-detail-view ${isFullScreen ? 'fullscreen' : ''}`}>
//       <header>
//         <button onClick={handleBack} className="back-button">
//           <FaArrowLeft /> Back
//         </button>
//         <h2>{currentClassData.name}</h2>
//         <button onClick={toggleFullScreen} className="fullscreen-button">
//           <FaExpandAlt /> {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
//         </button>
//       </header>
//       <main>
//         <div className={`left-panel ${isFullScreen ? 'fullscreen' : ''}`}>
//           <div className="graph-container" ref={containerRef}>
//             <Graph
//               graph={graphData}
//               options={options}
//               events={{ select: handleNodeClick }}
//               style={{ height: dimensions.height, width: dimensions.width }}
//             />
//           </div>
//           <div className="metrics">
//             <div className="metric">
//               <span className="metric-value">{currentClassData.metrics?.methodCount || 'N/A'}</span>
//               <span className="metric-label">Methods</span>
//             </div>
//             <div className="metric">
//               <span className="metric-value">{currentClassData.metrics?.cyclomaticComplexity || 'N/A'}</span>
//               <span className="metric-label">Complexity</span>
//             </div>
//             <div className="metric">
//               <span className="metric-value">{currentClassData.metrics?.linesOfCode || 'N/A'}</span>
//               <span className="metric-label">Lines of Code</span>
//             </div>
//           </div>
//         </div>
//         <div className={`right-panel ${isFullScreen ? 'hidden' : ''}`}>
//           <div className="general-info">
//             <h3>General Information</h3>
//             <p><strong>Package:</strong> {currentClassData.packageName}</p>
//             <p><strong>File Path:</strong> {currentClassData.filePath}</p>
//             <div className="fields-section">
//               <h4>Fields:</h4>
//               <ul>
//                 {currentClassData.fields?.map(field => (
//                   <li key={field}>{field}</li>
//                 ))}
//               </ul>
//             </div>
//             <div className="methods-section">
//               <h4>Methods:</h4>
//               <ul>
//                 {currentClassData.methods?.map(method => (
//                   <li key={method}>{method}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//           <div className="ai-description">
//             <h3>AI Description</h3>
//             <p><strong>{currentClassData.aiDescription || 'No AI description available.'}</strong></p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ClassDetailView;


import React, { useState, useCallback, useMemo } from 'react';
import { FaArrowLeft, FaExpandAlt } from 'react-icons/fa';
import Graph from 'react-graph-vis';
import ClassMetrics from './ClassMetrics';
import './ClassDetailView.css';

const ClassDetailView = ({ initialClassData, onBack, fetchClassData }) => {
  const [classStack, setClassStack] = useState([initialClassData]);
  const currentClassData = classStack[classStack.length - 1];
  const [isFullScreen, setIsFullScreen] = useState(false);

  const graphData = useMemo(() => {
    const nodes = [{ id: currentClassData.name, label: currentClassData.name, color: '#ff9ff3' }];
    const edges = [];

    if (currentClassData.dependencies) {
      currentClassData.dependencies.forEach(dep => {
        nodes.push({ id: dep, label: dep, color: '#54a0ff' });
        edges.push({ from: currentClassData.name, to: dep });
      });
    }

    if (currentClassData.usedClasses) {
      currentClassData.usedClasses.forEach(usedClass => {
        if (!nodes.some(node => node.id === usedClass)) {
          nodes.push({ id: usedClass, label: usedClass, color: '#5f27cd' });
        }
        edges.push({ from: usedClass, to: currentClassData.name });
      });
    }

    return { nodes, edges };
  }, [currentClassData]);

  const options = {
    layout: {
      improvedLayout: true,
      hierarchical: false
    },
    edges: {
      color: "#FFFFFF",
      width: 0.5,
      smooth: {
        type: 'cubicBezier',
        forceDirection: 'horizontal',
        roundness: 0.4
      }
    },
    nodes: {
      shape: 'dot',
      size: 16,
      font: {
        size: 12,
        color: '#FFFFFF'
      },
      borderWidth: 2,
      shadow: true
    },
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -50,
        centralGravity: 0.01,
        springLength: 100,
        springConstant: 0.08
      },
      maxVelocity: 50,
      solver: 'forceAtlas2Based',
      timestep: 0.35,
      stabilization: { iterations: 150 }
    },
    interaction: {
      hover: true,
      tooltipDelay: 300,
      hideEdgesOnDrag: true
    }
  };

  const handleNodeClick = useCallback(async (event) => {
    const { nodes } = event;
    if (nodes.length > 0) {
      const selectedNode = graphData.nodes.find(node => node.id === nodes[0]);
      if (selectedNode && selectedNode.group === 'dependency') {
        const newClassData = await fetchClassData(selectedNode.id);
        if (newClassData) {
          setClassStack(prevStack => [...prevStack, newClassData]);
        }
      }
    }
  }, [fetchClassData, graphData.nodes]);

  const handleBack = () => {
    if (classStack.length > 1) {
      setClassStack(prevStack => prevStack.slice(0, -1));
    } else {
      onBack();
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={`class-detail-view ${isFullScreen ? 'fullscreen' : ''}`}>
      <header>
        <button onClick={handleBack} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <h2>{currentClassData.name}</h2>
        <button onClick={toggleFullScreen} className="fullscreen-button">
          <FaExpandAlt /> {isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </header>
      <main>
        <div className={`left-panel ${isFullScreen ? 'fullscreen' : ''}`}>
          <div className="graph-container">
            <Graph
              graph={graphData}
              options={options}
              events={{ select: handleNodeClick }}
              style={{ height: '60vh', width: '100%' }}
            />
          </div>
          <ClassMetrics metrics={currentClassData.metrics} />
        </div>
        <div className={`right-panel ${isFullScreen ? 'hidden' : ''}`}>
          <div className="general-info">
            <h3>General Information</h3>
            <p><strong>Package:</strong> {currentClassData.packageName}</p>
            <p><strong>File Path:</strong> {currentClassData.filePath}</p>
            <div className="fields-section">
              <h4>Fields:</h4>
              <ul>
                {currentClassData.fields?.map(field => (
                  <li key={field}>{field}</li>
                ))}
              </ul>
            </div>
            <div className="methods-section">
              <h4>Methods:</h4>
              <ul>
                {currentClassData.methods?.map(method => (
                  <li key={method}>{method}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="ai-description">
            <h3>AI Description</h3>
            <p><strong>{currentClassData.aiDescription || 'No AI description available.'}</strong></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClassDetailView;