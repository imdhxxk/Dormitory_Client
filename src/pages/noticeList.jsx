import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

export const Container = styled.div`
  width: 393px;
  height: 898px;
  background: #ffffff;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  background: #ffffff;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const BackBtn = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

export const NoticeItem = styled.div`
  padding: 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
`;

export const NoticeTitle = styled.div`
  font-size: 15px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NoticeDate = styled.p`
  font-size: 13px;
  color: #999;
  margin: 6px 0 0 0;
`;

export const NewDot = styled.span`
  width: 6px;
  height: 6px;
  background: #ff4444;
  border-radius: 50%;
  margin-left: 6px;
`;



// NoticeList 컴포넌트
export default function NoticeList({ notices }) {
  const navigate = useNavigate();
  const [noticeList, setNoticeList] = useState(notices);

  const handleClick = (id) => {
    // 클릭하면 isNew false로 변경
    setNoticeList(noticeList.map(n => n.id === id ? {...n, isNew: false} : n));
    navigate(`/notice/${id}`);
  };

  return (
    <Container>
      <Header>
        <BackBtn><img src="/icon_back.png" alt="뒤로가기" /></BackBtn>
        <Title>공지사항</Title>
      </Header>

      {noticeList.map((n) => (
        <NoticeItem key={n.id} onClick={() => navigate(`/notices/${n.id}`)}>
          <NoticeTitle>
            {n.title}
            {n.isNew && <NewDot />}
          </NoticeTitle>
          <NoticeDate>{n.date}</NoticeDate>
        </NoticeItem>
      ))}
    </Container>
  );
}
