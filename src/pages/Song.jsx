import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";


// 전체 화면 컨테이너
const ScreenContainer = styled.div`
  width: 393px;
  height: 898px;
`;

// 상단 헤더 (뒤로가기 버튼 및 제목)
const Header = styled.header`
  display: flex;
  width: 231px;
  justify-content: space-between;
  align-items: flex-end;
`;

// 뒤로가기 화살표 (간단한 텍스트/이모지 처리)
const BackButton = styled.span`
  display: flex;
  width: 24px;
  height: 24px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

// 페이지 제목
const PageTitle = styled.h1`
  color: #444;
  text-align: center;
  font-family: "SF Pro";
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

// 메인 입력 내용 영역
const ContentArea = styled.main`
  flex-grow: 1; // 남은 공간을 차지
  padding: 20px;
  margin-bottom:423px;
`;

// 입력 그룹 (제목/가수 입력 섹션)
const InputGroup = styled.div`
  margin-bottom: 30px;
`;

// 입력 필드 설명 텍스트
const InputLabel2 = styled.p`
  color: #444;
  font-family: "SF Pro";
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top:0;
`;
const InputLabel1 = styled.p`
  color: #444;
  font-family: "SF Pro";
  font-size: 21px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

// 입력 필드 (제목, 가수)
const TextInput = styled.input`
  width: 361px;
  height: 48px;
  border-radius: 8px;
  background: #F4F4F4;
  border:none;
  padding-left:16px;
  color: #CCC;
  font-family: "SF Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// 하단 고정 버튼 영역
const Footer = styled.footer`
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
`;

// 신청하기 버튼
const SubmitButton = styled.button`
  color: #FFF;
  text-align: center;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: "SF Pro";
  font-size: 16px;
  font-style: normal;
  font-weight: 590;
  line-height: normal;
  display: inline-flex;
  padding: 18px 151px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: #23D97B;
  border:none;
  width:365px;
  height:55px;
`;

async function fetchAlbumArt(title, artist) {
  const query = encodeURIComponent(`${artist} ${title}`);
  const url = `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`;

  try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
          return data.results[0].artworkUrl100.replace("100x100", "300x300");
      }
      return null;
  } catch (error) {
      console.error("iTunes API 오류:", error);
      return null;
  }
}

function Song(){
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!songTitle || !songArtist) {
        alert("제목과 가수를 모두 입력하세요!");
        return;
    }

    const albumImg = await fetchAlbumArt(songTitle, songArtist);

    navigate("/", {
        state: {
          newSong: {
            title: songTitle,
            artist: songArtist,
            imgUrl: albumImg || "https://placehold.co/300x300?text=No+Image"
          }
        }
    });
};

  return (
    <ScreenContainer>
      <Header>
        <BackButton onClick={() => navigate("/")}>{"<"}</BackButton>
        <PageTitle>기상송 신청</PageTitle>
      </Header>

      <ContentArea>
        <InputGroup>
          <InputLabel1>기상송 제목작성</InputLabel1>
          <InputLabel2>원하는 기상송의 제목을 작성해 주세요</InputLabel2>
          <TextInput
            type="text"
            placeholder="제목 작성"
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
          />
        </InputGroup>

        {/* 기상송 가수 작성 */}
        <InputGroup>
        <InputLabel1>기상송 가수작성</InputLabel1>
        <InputLabel2>원하는 기상송의 가수을 작성해 주세요</InputLabel2>
          <TextInput
            type="text"
            placeholder="가수 작성"
            value={songArtist}
            onChange={(e) => setSongArtist(e.target.value)}
          />
        </InputGroup>
      </ContentArea>

      {/* 3. 하단 버튼 영역 */}
      <Footer>
        <SubmitButton onClick={handleSubmit}>
          신청하기
        </SubmitButton>
      </Footer>
    </ScreenContainer>
  );
};

export default Song;