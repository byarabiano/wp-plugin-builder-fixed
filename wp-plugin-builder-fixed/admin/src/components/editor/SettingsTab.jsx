import React, { useState } from 'react';

export default function SettingsTab({ project, onSave }) {
  const [name, setName] = useState(project.name || '');
  const [textDomain, setTextDomain] = useState(project.settings?.textDomain || '');

  function handleSave() {
    const upd = { name, settings: { ...project.settings, textDomain } };
    if (onSave) onSave(upd);
    alert('تم حفظ الإعدادات محليًا');
  }

  return (
    <div>
      <div style={{marginBottom:12}}>
        <label>اسم البلجن</label>
        <input value={name} onChange={e=>setName(e.target.value)} style={{width:'100%', padding:8, marginTop:6}} />
      </div>

      <div style={{marginBottom:12}}>
        <label>Text Domain</label>
        <input value={textDomain} onChange={e=>setTextDomain(e.target.value)} style={{width:'100%', padding:8, marginTop:6}} />
      </div>

      <div style={{textAlign:'right'}}>
        <button onClick={handleSave} style={{padding:'8px 12px'}}>حفظ الإعدادات</button>
      </div>
    </div>
  );
}
