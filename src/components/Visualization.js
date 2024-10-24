import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react';
import Graph from 'react-graph-vis';
import './Visualization.css';

const Visualization = ({ projectData, onClassSelect }) => {
  const [graphKey, setGraphKey] = useState(0);
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  // const [dimensions, setDimensions] = useState({ width: '100%', height: '100%' });
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const graphData = useMemo(() => {
    if (!projectData || !projectData.modules || projectData.modules.length === 0) {
      return { nodes: [], edges: [] };
    }

    const nodes = [];
    const edges = [];

    projectData.modules.forEach(module => {
      nodes.push({ id: module.name, label: module.name, group: 'module' });

      if (module.packages) {
        module.packages.forEach(pkg => {
          const pkgId = `${module.name}.${pkg.name}`;
          nodes.push({ id: pkgId, label: pkg.name, group: 'package' });
          edges.push({ from: module.name, to: pkgId });

          if (pkg.classes) {
            pkg.classes.forEach(cls => {
              const classId = `${pkgId}.${cls.name}`;
              nodes.push({ id: classId, label: cls.name, group: 'class', classData: cls });
              edges.push({ from: pkgId, to: classId });
            });
          }
        });
      }
    });

    return { nodes, edges };
  }, [projectData]);

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

  const events = {
    select: function(event) {
      const { nodes } = event;
      if (nodes.length > 0) {
        const selectedNode = graphData.nodes.find(node => node.id === nodes[0]);
        if (selectedNode && selectedNode.group === 'class') {
          onClassSelect(selectedNode.classData);
        }
      }
    }
  };

  const handleGraphError = (error) => {
    console.error("Graph rendering error:", error);
    setGraphKey(prevKey => prevKey + 1);
  };

  return (
    <div className="visualization" ref={containerRef}>
      {graphData.nodes.length === 0 ? (
        <div className="no-data-message">No data available to visualize</div>
      ) : (
        <>
          <div className="graph-info">Nodes: {graphData.nodes.length}, Edges: {graphData.edges.length}</div>
          <Graph
            key={graphKey}
            graph={graphData}
            options={options}
            events={events}
            getNetwork={network => {
              network.on("stabilizationIterationsDone", function () {
                network.setOptions({ physics: false });
              });
            }}
            style={{ height: `${dimensions.height}px`, width: `${dimensions.width}px` }}
            onError={handleGraphError}
          />
        </>
      )}
      <div className="legend">
        <div><span style={{backgroundColor: '#ff9ff3', color: '#ffffff'}}>Module</span></div>
        <div><span style={{backgroundColor: '#54a0ff', color: '#ffffff'}}>Package</span></div>
        <div><span style={{backgroundColor: '#5f27cd', color: '#ffffff'}}>Class</span></div>
      </div>
    </div>
  );
};

export default Visualization;


// import React, { useRef, useEffect, useState } from 'react';
// import Graph from 'react-graph-vis';
// import './Visualization.css';

// const Visualization = ({ projectData, onClassSelect }) => {
//   const containerRef = useRef(null);
//   const [dimensions, setDimensions] = useState({ width: '100%', height: '80vh' });

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (containerRef.current) {
//         const { width, height } = containerRef.current.getBoundingClientRect();
//         setDimensions({ width: '100%', height: '80vh' });
//       }
//     };

//     window.addEventListener('resize', updateDimensions);
//     updateDimensions();

//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   const graphData = React.useMemo(() => {
//     if (!projectData || !projectData.modules || projectData.modules.length === 0) {
//       return { nodes: [], edges: [] };
//     }

//     const nodes = [];
//     const edges = [];

//     projectData.modules.forEach(module => {
//       if (module.packages) {
//         module.packages.forEach(pkg => {
//           if (pkg.classes) {
//             pkg.classes.forEach(classData => {
//               nodes.push({
//                 id: classData.name,
//                 label: classData.name,
//                 color: '#ff9ff3'
//               });

//               if (classData.usedClasses) {
//                 classData.usedClasses.forEach(usedClass => {
//                   edges.push({
//                     from: classData.name,
//                     to: usedClass
//                   });
//                 });
//               }
//             });
//           }
//         });
//       }
//     });

//     return { nodes, edges };
//   }, [projectData]);

//   const options = {
//     layout: {
//       improvedLayout: true,
//       hierarchical: false
//     },
//     edges: {
//       color: "#FFFFFF",
//       smooth: {
//         type: 'cubicBezier',
//         forceDirection: 'horizontal',
//         roundness: 0.4
//       },
//       arrows: {
//         to: { enabled: true, scaleFactor: 0.5 }
//       }
//     },
//     nodes: {
//       shape: 'dot',
//       size: 16,
//       font: {
//         size: 12,
//         color: '#FFFFFF'
//       },
//       borderWidth: 2,
//       shadow: true
//     },
//     physics: {
//       forceAtlas2Based: {
//         gravitationalConstant: -50,
//         centralGravity: 0.01,
//         springLength: 100,
//         springConstant: 0.08
//       },
//       maxVelocity: 50,
//       solver: 'forceAtlas2Based',
//       timestep: 0.35,
//       stabilization: { iterations: 150 }
//     },
//     interaction: {
//       hover: true,
//       tooltipDelay: 300
//     }
//   };

//   const handleNodeClick = (event) => {
//     const { nodes } = event;
//     if (nodes.length > 0) {
//       const selectedClassName = nodes[0];
//       const selectedClass = projectData.modules
//         .flatMap(module => module.packages)
//         .flatMap(pkg => pkg.classes)
//         .find(classData => classData.name === selectedClassName);
      
//       if (selectedClass) {
//         onClassSelect(selectedClass);
//       }
//     }
//   };

//   return (
//     <div className="visualization-container" ref={containerRef}>
//       <h1 className="visualization-title">Code Dependency Visualizer</h1>
//       {graphData.nodes.length > 0 ? (
//         <Graph
//           graph={graphData}
//           options={options}
//           events={{ select: handleNodeClick }}
//           style={{ height: dimensions.height, width: dimensions.width }}
//         />
//       ) : (
//         <div className="no-data-message">No class data available to visualize.</div>
//       )}
//     </div>
//   );
// };

// export default Visualization;