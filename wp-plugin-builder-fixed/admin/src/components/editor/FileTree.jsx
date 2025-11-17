import React, { useState } from 'react';

export default function FileTree({ files = [], activePath, onSelect, onAdd, onDelete }) {
  const [newName, setNewName] = useState('');

  return (
    <div>
      <div style={{marginBottom:8, display:'flex', gap:8}}>
        <input placeholder="اسم الملف (مث: includes/helper.php)" value={newName} onChange={e=>setNewName(e.target.value)} style={{flex:1, padding:8}} />
        <button onClick={()=>{ if(newName){ onAdd(newName); setNewName(''); } }} style={{padding:'8px 10px'}}>إضافة</button>
      </div>

      <div style={{border:'1px solid #eee', borderRadius:8, padding:8, background:'#fff'}}>
        {files.map(f => (
          <div key={f.path} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'6px 8px', borderRadius:6, background: activePath===f.path ? '#f5fbff' : 'transparent', cursor:'pointer', marginBottom:6}}>
            <div onClick={()=>onSelect(f.path)} style={{flex:1}}>{f.path}</div>
            <div style={{display:'flex', gap:6}}>
              <button onClick={()=>onSelect(f.path)} style={{padding:'4px 6px'}}>فتح</button>
              <button onClick={()=>onDelete(f.path)} style={{padding:'4px 6px'}}>حذف</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
