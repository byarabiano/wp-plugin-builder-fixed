import React from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ path, value, onChange }) {
  const language = detectLanguage(path);

  return (
    <div style={{height:'60vh'}}>
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={onChange}
        theme="vs-light"
        options={{
          fontSize:14,
          minimap:{enabled:false},
          automaticLayout:true
        }}
      />
    </div>
  );
}

function detectLanguage(path) {
  if (!path) return "php";
  const ext = path.split('.').pop().toLowerCase();
  if (ext === 'php') return 'php';
  if (ext === 'js') return 'javascript';
  if (ext === 'css') return 'css';
  if (ext === 'json') return 'json';
  return 'plaintext';
}
