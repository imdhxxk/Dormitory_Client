import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";



export const DetailContainer = styled.div`
  width: 393px;
  height: 898px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const DetailHeader = styled.header`
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

export const DetailContent = styled.main`
  padding: 24px 20px;
  overflow-y: auto;

  p {
    white-space: pre-wrap;
    line-height: 1.8;
    color: #666;
  }
`;

export const DetailTop = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 24px;

  h2 {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

export const DetailDate = styled.p`
  font-size: 13px;
  color: #999;
  margin: 0;
`;

// NoticeDetail.jsx
export default function NoticeDetail({ notices, markAsRead }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const notice = notices.find((n) => n.id === Number(id));

  if (!notice) return <div>존재하지 않는 공지입니다.</div>;

  // 상세 페이지 렌더 시 점을 없애기
  markAsRead(notice.id);

  return (
    <DetailContainer>
      <DetailHeader>
        <BackBtn onClick={() => navigate(-1)}><img src="/icon_back.png" alt="뒤로가기" /></BackBtn>
        <Title>공지사항</Title>
      </DetailHeader>
      <DetailContent>
  <DetailTop>
    <h2>{notice.title}</h2>
    <DetailDate>{notice.date}</DetailDate>
  </DetailTop>
  <p>{notice.content}</p>

  {notice.image && (
    <img
      src={notice.image}
      alt={notice.title}
      style={{ width: "100%", marginBottom: "20px", borderRadius: "8px" }}
    />
  )}
</DetailContent>
    </DetailContainer>
  );
}
