import React, { useState } from 'react';

export default function Tabs({ tabs = [], renderTab }) {
  const [active, setActive] = useState(tabs[0]?.id || null);
  return (
    <div style={{height:'100%', display:'flex', flexDirection:'column'}}>
      <div style={{display:'flex', gap:8, marginBottom:12}}>
        {tabs.map(t=>(
          <button key={t.id}
            onClick={()=>setActive(t.id)}
            style={{
              padding:'8px 12px',
              background: active===t.id ? '#0073aa' : '#f1f1f1',
              color: active===t.id ? '#fff' : '#333',
              border:'none',
              borderRadius:6,
              cursor:'pointer'
            }}>{t.label}</button>
        ))}
      </div>

      <div style={{flex:1, minHeight:400, border:'1px solid #eee', borderRadius:8, padding:12, background:'#fff', overflow:'hidden'}}>
        { renderTab(active) }
      </div>
    </div>
  );
}
