import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProject, updateProject } from "@/api";
import Tabs from "@/components/editor/Tabs";
import FileTree from "@/components/editor/FileTree";
import CodeEditor from "@/components/editor/CodeEditor";
import SettingsTab from "@/components/editor/SettingsTab";
import ExportTab from "@/components/editor/ExportTab";

export default function ProjectEditor() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [activePath, setActivePath] = useState(null);
  const [files, setFiles] = useState([]); // [{path, content}]
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const res = getProject(id);
    if (res && res.project) {
      setProject(res.project);
      // ensure files exist
      const initialFiles = res.project.files && res.project.files.length
        ? res.project.files
        : [{ path: 'plugin.php', content: `<?php\n/*\nPlugin Name: ${res.project.name}\n*/\n\n// بداية البلجن\n` }];
      setFiles(initialFiles);
      setActivePath(initialFiles[0].path);
    }
  }, [id]);

  function saveFilesLocally(nextFiles = files, extra = {}) {
    if (!project) return;
    const updated = { ...project, files: nextFiles, ...extra };
    updateProject(project.id, updated);
    setProject(updated);
    setDirty(false);
  }

  function handleFileChange(path, content) {
    const next = files.map(f => f.path === path ? { ...f, content } : f);
    setFiles(next);
    setDirty(true);
  }

  function addFile(path) {
    if (files.find(f => f.path === path)) {
      alert("الملف موجود بالفعل");
      return;
    }
    const next = [...files, { path, content: "" }];
    setFiles(next);
    setActivePath(path);
    setDirty(true);
  }

  function deleteFile(path) {
    if (!confirm(`حذف الملف ${path} ؟`)) return;
    const next = files.filter(f => f.path !== path);
    setFiles(next);
    if (next.length) setActivePath(next[0].path);
    else setActivePath(null);
    setDirty(true);
  }

  if (!project) return <div style={{padding:20}}>جارٍ تحميل المشروع…</div>;

  return (
    <div style={{direction:'rtl', padding:20}}>
      <h2>محرر المشروع — {project.name}</h2>
      <div style={{display:'flex', gap:16, marginTop:12}}>
        <div style={{width:260}}>
          <FileTree
            files={files}
            activePath={activePath}
            onSelect={p=>setActivePath(p)}
            onAdd={addFile}
            onDelete={deleteFile}
          />
        </div>

        <div style={{flex:1, minHeight:500}}>
          <Tabs
            tabs={[
              { id: "files", label: "الملفات" },
              { id: "settings", label: "الإعدادات" },
              { id: "export", label: "تصدير" },
            ]}
            renderTab={(tabId)=> {
              if (tabId === 'files') {
                const current = files.find(f=>f.path===activePath) || {path:'',content:''};
                return (
                  <div style={{height: '100%'}}>
                    <div style={{display:'flex', gap:8, marginBottom:8}}>
                      <div style={{flex:1}}><strong>{current.path}</strong></div>
                      <div>
                        <button onClick={()=>saveFilesLocally(files)} style={{marginRight:8}}>حفظ</button>
                        <button onClick={()=>{ setFiles([{path:'plugin.php', content: `<?php\\n/* Plugin Name: ${project.name} */\\n` }]); setActivePath('plugin.php'); }}>إعادة تهيئة</button>
                      </div>
                    </div>
                    <CodeEditor
                      key={activePath}
                      path={current.path}
                      value={current.content}
                      onChange={(v)=>handleFileChange(current.path, v)}
                    />
                  </div>
                );
              } else if (tabId === 'settings') {
                return <SettingsTab project={project} onSave={(upd)=>{ saveFilesLocally(files, upd); }} />;
              } else if (tabId === 'export') {
                return <ExportTab project={{...project, files}} />;
              }
            }}
          />
        </div>
      </div>

      {dirty && <div style={{marginTop:12, color:'#b85'}}>لديك تغييرات غير محفوظة — اضغط حفظ.</div>}
    </div>
  );
}
