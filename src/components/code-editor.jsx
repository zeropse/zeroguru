import Editor from "@monaco-editor/react";

export default function CodeEditor({ value, onChange, language }) {
  return (
    <div className="border border-input rounded-md overflow-hidden">
      <Editor
        height="350px"
        language={language}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          tabSize: 2,
          insertSpaces: true,
        }}
      />
    </div>
  );
}
