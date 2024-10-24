
import React, { useState, useCallback, useMemo } from 'react';
import { FaArrowLeft, FaExpandAlt } from 'react-icons/fa';
import Graph from 'react-graph-vis';
import ClassMetrics from './ClassMetrics';
import ClassDetails from './ClassDetails'; // Import ClassDetails

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

  const events = {
    select: async (event) => {
      const { nodes } = event;
      if (nodes.length > 0) {
        const selectedNode = graphData.nodes.find(node => node.id === nodes[0]);
        if (selectedNode) {
          const newClassData = await fetchClassData(selectedNode.id);
          if (newClassData) {
            setClassStack(prevStack => [...prevStack, newClassData]);
          }
        }
      }
    }
  };

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
              events={events}
              style={{ height: '60vh', width: '100%' }}
            />
          </div>
          <ClassMetrics metrics={currentClassData.metrics} />
        {/* </div>
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

export default ClassDetailView; */}

</div>
        <div className={`right-panel ${isFullScreen ? 'hidden' : ''}`}>
          <ClassDetails classData={currentClassData} /> {/* Use ClassDetails */}
        </div>
      </main>
    </div>
  );
};

export default ClassDetailView;