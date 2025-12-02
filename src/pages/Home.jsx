import React, { useState, useEffect, useRef } from 'react';
import Bell from '../assets/bell.png';
import Profile from '../assets/profile.png';
import Food from '../assets/food.png';
import Post from '../assets/post.png';
import Suggest from '../assets/suggest.png';
import Morning from '../assets/morning.png';
import Arrow from '../assets/arrow.png';
import Qr from '../assets/qr.png';
import { useLocation,useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import './Home.css';

const COLORS = {
  primary: '#4CAF50',
  secondary: '#333333',
  lightText: '#666666',
  background: '#f8f8f8',
  cardGreen: '#2ec757',
  cardLightGreen: '#90df99',
};


const SLIDER_CARDS = [
  { type: 'main', time: '12분전', userName: '김아람샘', phone: '010.1234.1234', title: '수능기간 휴관 안내', active: true },
  { type: 'sub', time: '1일전', userName: '김예나샘', phone: '010.5678.5678', title: '정기점검 공지', active: false },
  { type: 'sub', time: '2일전', userName: '이철수샘', phone: '010.9012.9012', title: '학사 일정 변경', active: false },
];

const MEAL = {
  time: '아침',
  kcal: '625.8 Kcal',
  menu: '귀리밥, 애호박찌개 10), 소보로메추리알조림 13), 배추김치 (9), 브로콜리&초장 13)'
};

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const newSong = location.state?.newSong;
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [musicList, setMusicList] = useState([]);
  const processedSongRef = useRef(null);

useEffect(() => {
  if (newSong && processedSongRef.current !== newSong) {
    processedSongRef.current = newSong;
    setMusicList(prev => [...prev, newSong]);
    navigate(location.pathname, { replace: true, state: {} });
  }
}, [newSong, navigate, location.pathname]);

    // (유저 이름 + 프로필)
    const [nameOnly, setNameOnly] = useState("");
    const [profileImage, setProfileImage] = useState("");
    

    useEffect(() => {
        if (newSong) {
          setMusicList(prev => [...prev, newSong]);
          navigate(location.pathname, { replace: true, state: {} });
        }
    }, [newSong, navigate, location.pathname]);

    // Supabase 유저 정보 가져오기
    useEffect(() => {
      const loadUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const fullName = user.user_metadata?.full_name ?? "";
          
          const parsedName = fullName.includes("_")
            ? fullName.split("_")[1]
            : fullName;
  
          setNameOnly(parsedName);
          const profilePic =
          user.identities?.[0]?.identity_data?.picture ||
          user.user_metadata?.avatar_url ||
          "";

        setProfileImage(profilePic);
        }
      };
  
      loadUser();
    }, []);

    const handleScroll = () => {
        const slider = sliderRef.current;
        if (!slider) return;

        const scrollLeft = slider.scrollLeft;
        const slideWidth = 267 + 12; 
        const index = Math.round(scrollLeft / slideWidth);
        setActiveIndex(index);
    };

    return (
    <Container>
      <Header>
        <Headerment>
            <Name>{nameOnly}님,</Name>
            <Greeting>오늘 하루도 힘내세요</Greeting>
        </Headerment>
        <HeaderIcons>
          <NotificationBell></NotificationBell>
          <ProfileCircle 
            src={profileImage || Profile} // Profile은 이미 import 되어 있음
            alt="Profile"
            referrerPolicy="no-referrer"
          />
        </HeaderIcons>
      </Header>

      {/* 2. 슬라이더 */}
      <SliderSection>
        <SliderWrapper  ref={sliderRef} onScroll={handleScroll}>
          {SLIDER_CARDS.map((card, index) => (
            <SliderCard key={index}>
              {/* 1. 상단 뱃지 */}
              <TimeAgo>{card.time}</TimeAgo>
              
              {/* 2. 중간 정보 */}
              <UserInfo>
                    <UserAvatar src={profileImage || null} />

                    <UserText>
                        <UserName>{card.userName}</UserName>
                        <UserPhone>{card.phone}</UserPhone>
                    </UserText>
              </UserInfo>
              
              {/* 3. 하단 제목 */}
              <CardTitle>
                {card.title}
                <span className="arrowIcon">〉</span>
              </p>
            </div>
          ))}
        </div>
        <div className="paginationDots">
          {SLIDER_CARDS.map((_, index) => (
            <span key={index} className={`dot ${index === activeIndex ? 'active' : ''}`} />
          ))}
        </div>
      </section>

      <nav className="navIcons">
        <div className="navItem" onClick={() => navigate("/meal")}>
          <div className="iconWrapper">
            <div className="foodimg" style={{ backgroundImage: `url(${Food})` }} />
          </div>
          <p className="iconLabel">급식</p>
        </div>

        <div className="navItem">
          <div className="iconWrapper">
            <div className="postimg" style={{ backgroundImage: `url(${Post})` }} />
          </div>
          <p className="iconLabel">공지사항</p>
        </div>

        <div className="navItem">
          <div className="iconWrapper">
            <div className="suggestimg" style={{ backgroundImage: `url(${Suggest})` }} />
          </div>
          <p className="iconLabel">건의사항</p>
        </div>

        <div className="navItem" onClick={() => navigate("/song")}>
          <div className="iconWrapper">
            <div className="morningimg" style={{ backgroundImage: `url(${Morning})` }} />
          </div>
          <p className="iconLabel">기상송</p>
        </div>
      </nav>

      <section className="mealSection">
        <div className="sectionHeader">
          <p className="sectionTitle">오늘의 급식</p>
          <div className="moreArrow" style={{ backgroundImage: `url(${Arrow})` }} />
        </div>
        <div className="mealCard">
          <div className="mealTimeSection">
            <p className="timeText">{MEAL.time}</p>
            <span className="todayBadge">오늘</span>
          </div>
          <p className="kcalText">{MEAL.kcal}</p>
          <p className="menuText">{MEAL.menu}</p>
        </div>
      </section>

      <section className="musicSection">
        <h2>오늘의 기상송</h2>
        <div className="musicList">
          {musicList.map((music, idx) => (
            <div className="musicCard" key={idx}>
              <div
                className="albumArt"
                style={{ backgroundImage: `url(${music.imgUrl})` }}
              />
              <p className="songTitle">{music.title}</p>
              <p className="artist">{music.artist}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="floatingScanner">
        <div className="scannerIcon" style={{ backgroundImage: `url(${Qr})` }} />
      </div>
    </div>
  );
};

export default Home;
