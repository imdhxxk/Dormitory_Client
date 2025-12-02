import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 393px;
  height: 898px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: #F4F4F4;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const Header = styled.header`
  background: #fff;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: #333;
`;

const ScrollArea = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 16px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ListBox = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
`;

const NoticeItem = styled.div`
  padding: 18px 20px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 6px;
`;

const ItemTitle = styled.h3`
  font-size: 14px;
  font-weight: 400;
  color: #333;
  margin: 0;
  line-height: 1.5;
  flex: 1;
`;

const NewDot = styled.span`
  width: 6px;
  height: 6px;
  flex-shrink: 0;
  background: #ff4444;
  border-radius: 50%;
  margin-top: 6px;
`;

const ItemDate = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
`;

const DetailPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TitleBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;
`;

const DetailTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
`;

const DetailDate = styled.p`
  font-size: 12px;
  color: #999;
  margin: 0;
`;

const ContentBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #333;
  line-height: 1.8;
  white-space: pre-wrap;
`;

const ImageBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const BottomNav = styled.div`
  height: 70px;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  padding: 0 20px;
`;

const NavBar = styled.div`
  width: 134px;
  height: 5px;
  background: #333;
  border-radius: 100px;
`;

const ConfirmButton = styled.button`
  width: 48px;
  height: 48px;
  background: #00c853;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
`;

const EditButton = styled.button`
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  font-size: 20px;
  color: #333;
  cursor: pointer;
`;



export default function NoticeDetail({ notices }) {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [readNotices, setReadNotices] = useState([]);

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
    if (!readNotices.includes(notice.id)) {
      setReadNotices([...readNotices, notice.id]);
    }
  };

  return (
    <Container>
      {selectedNotice ? (
        <DetailPage>
          <Header>
            <BackButton onClick={() => setSelectedNotice(null)}>←</BackButton>
            <HeaderTitle>상세사항</HeaderTitle>
          </Header>

          <ScrollArea>
            <TitleBox>
              <DetailTitle>{selectedNotice.title}</DetailTitle>
              <DetailDate>{selectedNotice.date}</DetailDate>
            </TitleBox>

            {selectedNotice.images?.length > 0 ? (
              <>
                <ContentBox>{selectedNotice.content}</ContentBox>

                <ImageBox>
                  {selectedNotice.images.map((img, i) => (
                    <Image key={i} src={img} alt={`notice-${i}`} />
                  ))}
                </ImageBox>
              </>
            ) : (
              <ContentBox>{selectedNotice.content}</ContentBox>
            )}
          </ScrollArea>
        </DetailPage>
      ) : (
        <>
          <Header>
            <BackButton>←</BackButton>
            <HeaderTitle>공지사항</HeaderTitle>
          </Header>

          <ScrollArea>
            <ListBox>
              {notices.map((notice, index) => (
                <NoticeItem key={notice.id} onClick={() => handleNoticeClick(notice)}>
                  <ItemRow>
                    <ItemTitle>{notice.title}</ItemTitle>
                    {notice.isNew && !readNotices.includes(notice.id) && (
                      <NewDot />
                    )}
                  </ItemRow>
                  <ItemDate>{notice.date}</ItemDate>
                </NoticeItem>
              ))}
            </ListBox>
          </ScrollArea>

          <BottomNav>
            <NavBar />
            <ConfirmButton>✓</ConfirmButton>
            <EditButton>✎</EditButton>
          </BottomNav>
        </>
      )}
    </Container>
  );
}

/* ---------------- Styled Components ---------------- */
