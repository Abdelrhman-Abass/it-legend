"use client"
import React, { createContext, useContext, useState } from "react";

// Create a context
const NodeIdContext = createContext();

// Create a provider
export const NodeIdProvider = ({ children }) => {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <NodeIdContext.Provider value={{ activeNode, setActiveNode }}>
      {children}
    </NodeIdContext.Provider>
  );
};

// Custom hook to use the NodeId context
export const useNodeId = () => {
  const context = useContext(NodeIdContext);
  if (!context) {
    throw new Error("useNodeId must be used within a NodeIdProvider");
  }
  return context;
};
