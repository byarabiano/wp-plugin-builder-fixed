import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

function mount() {
  const rootEl = document.getElementById("wp-pb-root");

  // إن لم يكن العنصر جاهز، نعطي ووردبريس فرصة لتحميل الصفحة
  if (!rootEl) {
    return setTimeout(mount, 50);
  }

  // نضمن عدم التهيئة مرتين
  if (!rootEl.dataset.mounted) {
    rootEl.dataset.mounted = "1";
    ReactDOM.createRoot(rootEl).render(<App />);
  }
}

mount();
