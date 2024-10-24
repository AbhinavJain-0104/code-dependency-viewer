

// // import React, { useCallback, useRef, useEffect, useState } from 'react';
// // import ForceGraph2D from 'react-force-graph-2d';
// // import './Visualization.css';

// // const Visualization = ({ projectData, onClassSelect }) => {
// //   const forceGraphRef = useRef();
// //   const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
// //   const [highlightNodes, setHighlightNodes] = useState(new Set());
// //   const [highlightLinks, setHighlightLinks] = useState(new Set());
// //   const [hoverNode, setHoverNode] = useState(null);

// //   useEffect(() => {
// //     const updateDimensions = () => {
// //       const container = document.querySelector('.visualization-container');
// //       if (container) {
// //         setDimensions({
// //           width: container.clientWidth,
// //           height: container.clientHeight
// //         });
// //       }
// //     };

// //     window.addEventListener('resize', updateDimensions);
// //     updateDimensions();

// //     return () => window.removeEventListener('resize', updateDimensions);
// //   }, []);

// //   const graphData = React.useMemo(() => {
// //     if (!projectData || !projectData.modules || projectData.modules.length === 0) {
// //       return { nodes: [], links: [] };
// //     }

// //     const nodes = [];
// //     const links = [];
// //     const nodeMap = new Map();

// //     projectData.modules.forEach(module => {
// //       const moduleNode = {
// //         id: module.name,
// //         group: 'module',
// //         moduleData: module,
// //       };
// //       nodes.push(moduleNode);
// //       nodeMap.set(module.name, moduleNode);

// //       if (module.packages) {
// //         module.packages.forEach(pkg => {
// //           const packageNode = {
// //             id: `${module.name}.${pkg.name}`,
// //             group: 'package',
// //             packageData: pkg,
// //           };
// //           nodes.push(packageNode);
// //           nodeMap.set(packageNode.id, packageNode);
// //           links.push({ source: module.name, target: packageNode.id });

// //           if (pkg.classes) {
// //             pkg.classes.forEach(cls => {
// //               const classNode = {
// //                 id: `${packageNode.id}.${cls.name}`,
// //                 group: 'class',
// //                 classData: cls,
// //               };
// //               nodes.push(classNode);
// //               nodeMap.set(classNode.id, classNode);
// //               links.push({ source: packageNode.id, target: classNode.id });

// //               if (cls.usedClasses) {
// //                 cls.usedClasses.forEach(usedClass => {
// //                   const targetNode = nodes.find(n => n.id.endsWith(`.${usedClass}`));
// //                   if (targetNode) {
// //                     links.push({ source: classNode.id, target: targetNode.id });
// //                   }
// //                 });
// //               }
// //             });
// //           }
// //         });
// //       }
// //     });

// //     return { nodes, links };
// //   }, [projectData]);

// //   const handleNodeHover = node => {
// //     highlightNodes.clear();
// //     highlightLinks.clear();
// //     if (node) {
// //       highlightNodes.add(node);
// //       graphData.links.forEach(link => {
// //         if (link.source === node || link.target === node) {
// //           highlightLinks.add(link);
// //           highlightNodes.add(link.source);
// //           highlightNodes.add(link.target);
// //         }
// //       });
// //     }

// //     setHoverNode(node || null);
// //     setHighlightNodes(new Set(highlightNodes));
// //     setHighlightLinks(new Set(highlightLinks));
// //   };

// //   const handleNodeClick = useCallback(node => {
// //     if (node.group === 'class') {
// //       onClassSelect(node.classData);
// //     }
// //   }, [onClassSelect]);

// //   const getNodeColor = useCallback(node => {
// //     if (highlightNodes.has(node)) {
// //       return node.group === 'module' ? '#ff6b6b' : 
// //              node.group === 'package' ? '#4ecdc4' : '#45b7d1';
// //     }
// //     return node.group === 'module' ? '#ff9ff3' : 
// //            node.group === 'package' ? '#54a0ff' : '#5f27cd';
// //   }, [highlightNodes]);

// //   const getLinkColor = useCallback(() => 'rgba(255, 255, 255, 0.2)', []); // Semi-transparent white for links

// //   const getTextColor = useCallback(node => {
// //     return node.group === 'module' ? '#ffffff' : 
// //            node.group === 'package' ? '#ffffff' : '#ffffff';
// //   }, []);

// //   if (graphData.nodes.length === 0) {
// //     return <div className="visualization">No data to visualize</div>;
// //   }

// //   return (
// //     <div className="visualization">
// //       <ForceGraph2D
// //         ref={forceGraphRef}
// //         graphData={graphData}
// //         nodeLabel={node => node.id}
// //         nodeColor={getNodeColor}
// //         nodeRelSize={8}
// //         linkWidth={link => highlightLinks.has(link) ? 2 : 1}
// //         linkColor={getLinkColor}
// //         linkDirectionalArrowLength={3}
// //         linkDirectionalArrowRelPos={1}
// //         linkCurvature={0.25}
// //         onNodeHover={handleNodeHover}
// //         onNodeClick={handleNodeClick}
// //         width={dimensions.width}
// //         height={dimensions.height}
// //         d3AlphaDecay={0.01}
// //         d3VelocityDecay={0.08}
// //         cooldownTicks={100}
// //         onEngineStop={() => {
// //           forceGraphRef.current.zoomToFit(400, 60);
// //         }}
// //         nodeCanvasObject={(node, ctx, globalScale) => {
// //           const label = node.id.split('.').pop();
// //           const fontSize = 14 / globalScale;
// //           ctx.font = `${fontSize}px Arial`;
// //           const textWidth = ctx.measureText(label).width;
// //           const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

// //           ctx.fillStyle = getNodeColor(node);
// //           ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

// //           ctx.textAlign = 'center';
// //           ctx.textBaseline = 'middle';
// //           ctx.fillStyle = getTextColor(node);
// //           ctx.fillText(label, node.x, node.y);
// //         }}
// //       />
// //       <div className="legend">
// //         <div><span style={{backgroundColor: '#ff9ff3', color: '#ffffff'}}>Module</span></div>
// //         <div><span style={{backgroundColor: '#54a0ff', color: '#ffffff'}}>Package</span></div>
// //         <div><span style={{backgroundColor: '#5f27cd', color: '#ffffff'}}>Class</span></div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Visualization;


// // import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react';
// // import ForceGraph2D from 'react-force-graph-2d';
// // import './Visualization.css';

// // const Visualization = ({ projectData, onClassSelect }) => {
// //   const forceGraphRef = useRef();
// //   const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
// //   const [highlightNodes, setHighlightNodes] = useState(new Set());
// //   const [highlightLinks, setHighlightLinks] = useState(new Set());
// //   const [hoverNode, setHoverNode] = useState(null);

// //   useEffect(() => {
// //     const updateDimensions = () => {
// //       const container = document.querySelector('.visualization-container');
// //       if (container) {
// //         setDimensions({
// //           width: container.clientWidth,
// //           height: container.clientHeight
// //         });
// //       }
// //     };

// //     window.addEventListener('resize', updateDimensions);
// //     updateDimensions();

// //     return () => window.removeEventListener('resize', updateDimensions);
// //   }, []);

// //   const graphData = useMemo(() => {
// //     if (!projectData || !projectData.modules || projectData.modules.length === 0) {
// //       return { nodes: [], links: [] };
// //     }

// //     const nodes = [];
// //     const links = [];
// //     const nodeMap = new Map();

// //     projectData.modules.forEach(module => {
// //       const moduleNode = {
// //         id: module.name,
// //         group: 'module',
// //         moduleData: module,
// //       };
// //       nodes.push(moduleNode);
// //       nodeMap.set(module.name, moduleNode);

// //       if (module.packages) {
// //         module.packages.forEach(pkg => {
// //           const packageNode = {
// //             id: `${module.name}.${pkg.name}`,
// //             group: 'package',
// //             packageData: pkg,
// //           };
// //           nodes.push(packageNode);
// //           nodeMap.set(packageNode.id, packageNode);
// //           links.push({ source: module.name, target: packageNode.id });

// //           if (pkg.classes) {
// //             pkg.classes.forEach(cls => {
// //               const classNode = {
// //                 id: `${packageNode.id}.${cls.name}`,
// //                 group: 'class',
// //                 classData: cls,
// //               };
// //               nodes.push(classNode);
// //               nodeMap.set(classNode.id, classNode);
// //               links.push({ source: packageNode.id, target: classNode.id });

// //               if (cls.usedClasses) {
// //                 cls.usedClasses.forEach(usedClass => {
// //                   const targetNode = nodes.find(n => n.id.endsWith(`.${usedClass}`));
// //                   if (targetNode) {
// //                     links.push({ source: classNode.id, target: targetNode.id });
// //                   }
// //                 });
// //               }
// //             });
// //           }
// //         });
// //       }
// //     });

// //     return { nodes, links };
// //   }, [projectData]);

// //   const handleNodeHover = useCallback((node) => {
// //     if (!graphData) return;
    
// //     highlightNodes.clear();
// //     highlightLinks.clear();
// //     if (node) {
// //       highlightNodes.add(node);
// //       graphData.links.forEach(link => {
// //         if (link.source === node || link.target === node) {
// //           highlightLinks.add(link);
// //           highlightNodes.add(link.source);
// //           highlightNodes.add(link.target);
// //         }
// //       });
// //     }

// //     setHoverNode(node || null);
// //     setHighlightNodes(new Set(highlightNodes));
// //     setHighlightLinks(new Set(highlightLinks));
// //   }, [graphData]);

// //   const handleNodeClick = useCallback(node => {
// //     if (node.group === 'class') {
// //       onClassSelect(node.classData);
// //     }
// //   }, [onClassSelect]);

// //   const getNodeColor = useCallback(node => {
// //     if (highlightNodes.has(node)) {
// //       return node.group === 'module' ? '#ff6b6b' : 
// //              node.group === 'package' ? '#4ecdc4' : '#45b7d1';
// //     }
// //     return node.group === 'module' ? '#ff9ff3' : 
// //            node.group === 'package' ? '#54a0ff' : '#5f27cd';
// //   }, [highlightNodes]);

// //   const getLinkColor = useCallback(link => 
// //     highlightLinks.has(link) ? '#ffa500' : '#808080', [highlightLinks]
// //   );

// //   const getTextColor = useCallback(() => '#ffffff', []);

// //   if (!graphData || graphData.nodes.length === 0) {
// //     return <div className="visualization">No data to visualize</div>;
// //   }

// //   return (
// //     <div className="visualization">
// //       <ForceGraph2D
// //         ref={forceGraphRef}
// //         graphData={graphData}
// //         nodeLabel={node => node.id}
// //         nodeColor={getNodeColor}
// //         nodeRelSize={8}
// //         linkWidth={link => highlightLinks.has(link) ? 2 : 1}
// //         linkColor={getLinkColor}
// //         linkDirectionalArrowLength={5}
// //         linkDirectionalArrowRelPos={1}
// //         linkCurvature={0.25}
// //         onNodeHover={handleNodeHover}
// //         onNodeClick={handleNodeClick}
// //         width={dimensions.width}
// //         height={dimensions.height}
// //         d3AlphaDecay={0.01}
// //         d3VelocityDecay={0.08}
// //         cooldownTicks={100}
// //         onEngineStop={() => {
// //           forceGraphRef.current.zoomToFit(400, 60);
// //         }}
// //         nodeCanvasObject={(node, ctx, globalScale) => {
// //           const label = node.id.split('.').pop();
// //           const fontSize = 14 / globalScale;
// //           ctx.font = `${fontSize}px Arial`;
// //           const textWidth = ctx.measureText(label).width;
// //           const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

// //           ctx.fillStyle = getNodeColor(node);
// //           ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

// //           ctx.textAlign = 'center';
// //           ctx.textBaseline = 'middle';
// //           ctx.fillStyle = getTextColor(node);
// //           ctx.fillText(label, node.x, node.y);
// //         }}
// //       />
// //       <div className="legend">
// //         <div><span style={{backgroundColor: '#ff9ff3', color: '#ffffff'}}>Module</span></div>
// //         <div><span style={{backgroundColor: '#54a0ff', color: '#ffffff'}}>Package</span></div>
// //         <div><span style={{backgroundColor: '#5f27cd', color: '#ffffff'}}>Class</span></div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Visualization;



// import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react';
// import ForceGraph2D from 'react-force-graph-2d';
// import './Visualization.css';

// const Visualization = ({ projectData, onClassSelect }) => {
//   const forceGraphRef = useRef();
//   const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
//   const [highlightNodes, setHighlightNodes] = useState(new Set());
//   const [highlightLinks, setHighlightLinks] = useState(new Set());
//   const [hoverNode, setHoverNode] = useState(null);

//   useEffect(() => {
//     const updateDimensions = () => {
//       const container = document.querySelector('.visualization-container');
//       if (container) {
//         setDimensions({
//           width: container.clientWidth,
//           height: container.clientHeight
//         });
//       }
//     };

//     window.addEventListener('resize', updateDimensions);
//     updateDimensions();

//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   const graphData = useMemo(() => {
//     if (!projectData || !projectData.modules || projectData.modules.length === 0) {
//       return { nodes: [], links: [] };
//     }

//     const nodes = [];
//     const links = [];
//     const nodeMap = new Map();

//     projectData.modules.forEach(module => {
//       const moduleNode = {
//         id: module.name,
//         group: 'module',
//         moduleData: module,
//       };
//       nodes.push(moduleNode);
//       nodeMap.set(module.name, moduleNode);

//       if (module.packages) {
//         module.packages.forEach(pkg => {
//           const packageNode = {
//             id: `${module.name}.${pkg.name}`,
//             group: 'package',
//             packageData: pkg,
//           };
//           nodes.push(packageNode);
//           nodeMap.set(packageNode.id, packageNode);
//           links.push({ source: module.name, target: packageNode.id });

//           if (pkg.classes) {
//             pkg.classes.forEach(cls => {
//               const classNode = {
//                 id: `${packageNode.id}.${cls.name}`,
//                 group: 'class',
//                 classData: cls,
//               };
//               nodes.push(classNode);
//               nodeMap.set(classNode.id, classNode);
//               links.push({ source: packageNode.id, target: classNode.id });

//               if (cls.usedClasses) {
//                 cls.usedClasses.forEach(usedClass => {
//                   const targetNode = nodes.find(n => n.id.endsWith(`.${usedClass}`));
//                   if (targetNode) {
//                     links.push({ source: classNode.id, target: targetNode.id });
//                   }
//                 });
//               }
//             });
//           }
//         });
//       }
//     });

//     return { nodes, links };
//   }, [projectData]);

//   const handleNodeHover = useCallback((node) => {
//     highlightNodes.clear();
//     highlightLinks.clear();
//     if (node) {
//       highlightNodes.add(node);
//       graphData.links.forEach(link => {
//         if (link.source === node || link.target === node) {
//           highlightLinks.add(link);
//           highlightNodes.add(link.source);
//           highlightNodes.add(link.target);
//         }
//       });
//     }

//     setHoverNode(node || null);
//     setHighlightNodes(new Set(highlightNodes));
//     setHighlightLinks(new Set(highlightLinks));
//   }, [graphData, highlightLinks, highlightNodes]);

//   const handleNodeClick = useCallback(node => {
//     if (node.group === 'class') {
//       onClassSelect(node.classData);
//     }
//   }, [onClassSelect]);

//   const getNodeColor = useCallback(node => {
//     if (highlightNodes.has(node)) {
//       return node.group === 'module' ? '#ff6b6b' : 
//              node.group === 'package' ? '#4ecdc4' : '#45b7d1';
//     }
//     return node.group === 'module' ? '#ff9ff3' : 
//            node.group === 'package' ? '#54a0ff' : '#5f27cd';
//   }, [highlightNodes]);

//   const getLinkColor = useCallback(link => 
//     highlightLinks.has(link) ? '#ffa500' : '#808080', [highlightLinks]
//   );

//   const getTextColor = useCallback(() => '#ffffff', []);

//   if (!graphData || graphData.nodes.length === 0) {
//     return <div className="visualization">No data to visualize</div>;
//   }

//   return (
//     <div className="visualization">
//       <ForceGraph2D
//         ref={forceGraphRef}
//         graphData={graphData}
//         nodeLabel={node => node.id}
//         nodeColor={getNodeColor}
//         nodeRelSize={6}
//         linkWidth={link => highlightLinks.has(link) ? 2 : 1}
//         linkColor={getLinkColor}
//         linkDirectionalArrowLength={3}
//         linkDirectionalArrowRelPos={1}
//         linkCurvature={0.25}
//         onNodeHover={handleNodeHover}
//         onNodeClick={handleNodeClick}
//         width={dimensions.width}
//         height={dimensions.height}
//         d3AlphaDecay={0.02}
//         d3VelocityDecay={0.1}
//         cooldownTicks={100}
//         onEngineStop={() => {
//           forceGraphRef.current.zoomToFit(400, 60);
//         }}
//         nodeCanvasObject={(node, ctx, globalScale) => {
//           const label = node.id.split('.').pop();
//           const fontSize = 12 / globalScale;
//           ctx.font = `${fontSize}px Arial`;
//           const textWidth = ctx.measureText(label).width;
//           const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

//           ctx.fillStyle = getNodeColor(node);
//           ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

//           ctx.textAlign = 'center';
//           ctx.textBaseline = 'middle';
//           ctx.fillStyle = getTextColor(node);
//           ctx.fillText(label, node.x, node.y);
//         }}
//         enableZoomPanInteraction={true}
//         enableNodeDrag={false}
//       />
//       <div className="legend">
//         <div><span style={{backgroundColor: '#ff9ff3', color: '#ffffff'}}>Module</span></div>
//         <div><span style={{backgroundColor: '#54a0ff', color: '#ffffff'}}>Package</span></div>
//         <div><span style={{backgroundColor: '#5f27cd', color: '#ffffff'}}>Class</span></div>
//       </div>
//     </div>
//   );
// };

// export default Visualization;


// import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react';
// import Graph from 'react-graph-vis';
// import './Visualization.css';

// const Visualization = ({ projectData, onClassSelect }) => {
//   const [graphKey, setGraphKey] = useState(0);
//   const containerRef = useRef();
//   const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (containerRef.current) {
//         const { width, height } = containerRef.current.getBoundingClientRect();
//         setDimensions({ width, height });
//       }
//     };

//     window.addEventListener('resize', updateDimensions);
//     updateDimensions();

//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   const graphData = useMemo(() => {
//     if (!projectData || !projectData.modules || projectData.modules.length === 0) {
//       return { nodes: [], edges: [] };
//     }

//     const nodes = [];
//     const edges = [];

//     projectData.modules.forEach(module => {
//       nodes.push({ id: module.name, label: module.name, group: 'module' });

//       if (module.packages) {
//         module.packages.forEach(pkg => {
//           const pkgId = `${module.name}.${pkg.name}`;
//           nodes.push({ id: pkgId, label: pkg.name, group: 'package' });
//           edges.push({ from: module.name, to: pkgId });

//           if (pkg.classes) {
//             pkg.classes.forEach(cls => {
//               const classId = `${pkgId}.${cls.name}`;
//               nodes.push({ id: classId, label: cls.name, group: 'class', classData: cls });
//               edges.push({ from: pkgId, to: classId });
//             });
//           }
//         });
//       }
//     });

//     return { nodes, edges };
//   }, [projectData]);

//   const options = {
//     layout: {
//       hierarchical: false
//     },
//     edges: {
//       color: "#000000"
//     },
//     height: `${dimensions.height}px`
//   };

//   const events = {
//     select: function(event) {
//       const { nodes, edges } = event;
//       if (nodes.length > 0) {
//         const selectedNode = graphData.nodes.find(node => node.id === nodes[0]);
//         if (selectedNode && selectedNode.group === 'class') {
//           onClassSelect(selectedNode.classData);
//         }
//       }
//     }
//   };

//   const handleGraphError = (error) => {
//     console.error("Graph rendering error:", error);
//     // Attempt to re-render the graph
//     setGraphKey(prevKey => prevKey + 1);
//   };

//   return (
//     <div className="visualization" ref={containerRef}>
//       {graphData.nodes.length === 0 ? (
//         <div className="no-data-message">No data available to visualize</div>
//       ) : (
//         <>
//           <div className="graph-info">Nodes: {graphData.nodes.length}, Edges: {graphData.edges.length}</div>
//           <Graph
//             key={graphKey}
//             graph={graphData}
//             options={options}
//             events={events}
//             getNetwork={network => {
//               // You can use this to access the vis.js network api
//               network.on("stabilizationIterationsDone", function () {
//                 network.setOptions( { physics: false } );
//               });
//             }}
//             style={{ height: `${dimensions.height}px` }}
//             onError={handleGraphError}
//           />
//         </>
//       )}
//       <div className="legend">
//         <div><span style={{backgroundColor: '#ff9ff3', color: '#ffffff'}}>Module</span></div>
//         <div><span style={{backgroundColor: '#54a0ff', color: '#ffffff'}}>Package</span></div>
//         <div><span style={{backgroundColor: '#5f27cd', color: '#ffffff'}}>Class</span></div>
//       </div>
//     </div>
//   );
// };

// export default Visualization;


// import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react';
// import Graph from 'react-graph-vis';
// import './Visualization.css';

// const Visualization = ({ projectData, onClassSelect }) => {
//   const [graphKey, setGraphKey] = useState(0);
//   const containerRef = useRef();
//   const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

//   useEffect(() => {
//     const updateDimensions = () => {
//       if (containerRef.current) {
//         const { width, height } = containerRef.current.getBoundingClientRect();
//         setDimensions({ width, height });
//       }
//     };

//     window.addEventListener('resize', updateDimensions);
//     updateDimensions();

//     return () => window.removeEventListener('resize', updateDimensions);
//   }, []);

//   const graphData = useMemo(() => {
//     if (!projectData || !projectData.modules || projectData.modules.length === 0) {
//       return { nodes: [], edges: [] };
//     }

//     const nodes = [];
//     const edges = [];

//     projectData.modules.forEach(module => {
//       nodes.push({ id: module.name, label: module.name, group: 'module' });

//       if (module.packages) {
//         module.packages.forEach(pkg => {
//           const pkgId = `${module.name}.${pkg.name}`;
//           nodes.push({ id: pkgId, label: pkg.name, group: 'package' });
//           edges.push({ from: module.name, to: pkgId });

//           if (pkg.classes) {
//             pkg.classes.forEach(cls => {
//               const classId = `${pkgId}.${cls.name}`;
//               nodes.push({ id: classId, label: cls.name, group: 'class', classData: cls });
//               edges.push({ from: pkgId, to: classId });
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
//       color: "#000000",
//       smooth: {
//         type: 'cubicBezier',
//         forceDirection: 'horizontal',
//         roundness: 0.4
//       }
//     },
//     physics: {
//       stabilization: false,
//       barnesHut: {
//         gravitationalConstant: -80000,
//         springConstant: 0.001,
//         springLength: 200
//       }
//     },
//     nodes: {
//       shape: 'dot',
//       size: 16,
//       font: {
//         size: 12,
//         color: '#ffffff'
//       },
//       borderWidth: 2,
//       shadow: true
//     },
//     height: `${dimensions.height}px`,
//     width: `${dimensions.width}px`
//   };

//   const events = {
//     select: function(event) {
//       const { nodes } = event;
//       if (nodes.length > 0) {
//         const selectedNode = graphData.nodes.find(node => node.id === nodes[0]);
//         if (selectedNode && selectedNode.group === 'class') {
//           onClassSelect(selectedNode.classData);
//         }
//       }
//     }
//   };

//   const handleGraphError = (error) => {
//     console.error("Graph rendering error:", error);
//     setGraphKey(prevKey => prevKey + 1);
//   };

//   return (
//     <div className="visualization" ref={containerRef}>
//       {graphData.nodes.length === 0 ? (
//         <div className="no-data-message">No data available to visualize</div>
//       ) : (
//         <>
//           <div className="graph-info">Nodes: {graphData.nodes.length}, Edges: {graphData.edges.length}</div>
//           <Graph
//             key={graphKey}
//             graph={graphData}
//             options={options}
//             events={events}
//             getNetwork={network => {
//               network.on("stabilizationIterationsDone", function () {
//                 network.setOptions({ physics: false });
//               });
//             }}
//             style={{ height: `${dimensions.height}px`, width: `${dimensions.width}px` }}
//             onError={handleGraphError}
//           />
//         </>
//       )}
//       <div className="legend">
//         <div><span style={{backgroundColor: '#ff9ff3', color: '#ffffff'}}>Module</span></div>
//         <div><span style={{backgroundColor: '#54a0ff', color: '#ffffff'}}>Package</span></div>
//         <div><span style={{backgroundColor: '#5f27cd', color: '#ffffff'}}>Class</span></div>
//       </div>
//     </div>
//   );
// };

// export default Visualization;


import React, { useCallback, useRef, useEffect, useState, useMemo } from 'react';
import Graph from 'react-graph-vis';
import './Visualization.css';

const Visualization = ({ projectData, onClassSelect }) => {
  const [graphKey, setGraphKey] = useState(0);
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

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