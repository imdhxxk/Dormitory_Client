import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import NoticeList from "./pages/noticeList";
import NoticeDetail from "./pages/noticeDetail";
import noticedata from "./data/notice.json";

function App() {
  const [notices, setNotices] = useState(noticedata);

  const markAsRead = (id) => {
    setNotices(notices.map(n => n.id === id ? {...n, isNew: false} : n));
  };
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/notices" />} />

      <Route path="/notices" element={<NoticeList notices={noticedata} />} />

<Route 
        path="/notices/:id" 
        element={<NoticeDetail notices={notices} markAsRead={markAsRead} />} 
      />    </Routes>
  );
}

export default App;
