import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import NoticeList from "./pages/noticeList";
import NoticeDetail from "./pages/noticeDetail";
import noticedata from "./data/notice.json";

function App() {
  const [notices, setNotices] = useState(noticedata);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/notices" />} />

      <Route path="/notices" element={<NoticeList notices={noticedata} />} />

<Route 
        path="/notices/:id" 
        element={<NoticeDetail notices={notices} />} 
      />    </Routes>
  );
}

export default App;
