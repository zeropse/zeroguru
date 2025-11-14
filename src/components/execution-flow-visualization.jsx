import React, { useMemo, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const nodeTypes = {
  assignmentNode: AssignmentNode,
  conditionNode: ConditionNode,
  loopNode: LoopNode,
  functionNode: FunctionNode,
  returnNode: ReturnNode,
  printNode: PrintNode,
  defaultNode: DefaultNode,
};

function AssignmentNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-blue-50 border-2 border-blue-300 dark:bg-blue-900/20 dark:border-blue-600">
      <div className="flex items-center gap-2">
        <div className="text-blue-600 dark:text-blue-400 text-lg">→</div>
        <div>
          <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Line {data.line}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-300 max-w-48">
            {data.description}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConditionNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-yellow-50 border-2 border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-600">
      <div className="flex items-center gap-2">
        <div className="text-yellow-600 dark:text-yellow-400 text-lg">?</div>
        <div>
          <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            Line {data.line}
          </div>
          <div className="text-xs text-yellow-600 dark:text-yellow-300 max-w-48">
            {data.description}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoopNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-purple-50 border-2 border-purple-300 dark:bg-purple-900/20 dark:border-purple-600">
      <div className="flex items-center gap-2">
        <div className="text-purple-600 dark:text-purple-400 text-lg">⟲</div>
        <div>
          <div className="text-sm font-medium text-purple-800 dark:text-purple-200">
            Line {data.line}
          </div>
          <div className="text-xs text-purple-600 dark:text-purple-300 max-w-48">
            {data.description}
          </div>
        </div>
      </div>
    </div>
  );
}

function FunctionNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-green-50 border-2 border-green-300 dark:bg-green-900/20 dark:border-green-600">
      <div className="flex items-center gap-2">
        <div className="text-green-600 dark:text-green-400 text-lg">⚡</div>
        <div>
          <div className="text-sm font-medium text-green-800 dark:text-green-200">
            Line {data.line}
          </div>
          <div className="text-xs text-green-600 dark:text-green-300 max-w-48 ">
            {data.description}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReturnNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-red-50 border-2 border-red-300 dark:bg-red-900/20 dark:border-red-600">
      <div className="flex items-center gap-2">
        <div className="text-red-600 dark:text-red-400 text-lg">↩</div>
        <div>
          <div className="text-sm font-medium text-red-800 dark:text-red-200">
            Line {data.line}
          </div>
          <div className="text-xs text-red-600 dark:text-red-300 max-w-48">
            {data.description}
          </div>
        </div>
      </div>
    </div>
  );
}

function PrintNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-indigo-50 border-2 border-indigo-300 dark:bg-indigo-900/20 dark:border-indigo-600">
      <div className="flex items-center gap-2">
        <div className="text-indigo-600 dark:text-indigo-400 text-lg">📄</div>
        <div>
          <div className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
            Line {data.line}
          </div>
          <div className="text-xs text-indigo-600 dark:text-indigo-300 max-w-48">
            {data.description}
          </div>
        </div>
      </div>
    </div>
  );
}

function DefaultNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-gray-50 border-2 border-gray-300 dark:bg-gray-900/20 dark:border-gray-600">
      <div className="flex items-center gap-2">
        <div className="text-gray-600 dark:text-gray-400 text-lg">•</div>
        <div>
          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Line {data.line}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300 max-w-48">
            {data.description}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExecutionFlowVisualization({ steps }) {
  const getNodeType = (type) => {
    switch (type) {
      case "assignment":
        return "assignmentNode";
      case "condition":
        return "conditionNode";
      case "loop":
        return "loopNode";
      case "function_call":
        return "functionNode";
      case "return":
        return "returnNode";
      case "print":
        return "printNode";
      default:
        return "defaultNode";
    }
  };

  const initialNodes = useMemo(() => {
    return steps.map((step, index) => ({
      id: `step-${index}`,
      type: getNodeType(step.type),
      position: { x: 100 + (index % 2) * 200, y: index * 160 },
      data: {
        ...step,
      },
    }));
  }, [steps]);

  const initialEdges = useMemo(() => {
    return steps.slice(0, -1).map((_, index) => ({
      id: `edge-${index}`,
      source: `step-${index}`,
      target: `step-${index + 1}`,
      type: "smoothstep",
      style: { stroke: "#64748b", strokeWidth: 2 },
    }));
  }, [steps]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-96 border border-border rounded-lg overflow-hidden">
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="top-left"
        >
          <Background gap={16} />
          <Controls />
          <MiniMap
            className="bg-muted border border-border"
            maskColor="bg-accent"
            nodeColor={(node) => {
              switch (node.type) {
                case "assignmentNode":
                  return "#3b82f6";
                case "conditionNode":
                  return "#eab308";
                case "loopNode":
                  return "#a855f7";
                case "functionNode":
                  return "#22c55e";
                case "returnNode":
                  return "#ef4444";
                case "printNode":
                  return "#6366f1";
                default:
                  return "#6b7280";
              }
            }}
            nodeStrokeColor="hsl(var(--border))"
            nodeStrokeWidth={2}
            zoomable
            pannable
          />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default ExecutionFlowVisualization;
