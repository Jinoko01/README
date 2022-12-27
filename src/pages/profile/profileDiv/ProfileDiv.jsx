import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import followAPI from '../../../api/followAPI';
import loadProfileAPI from '../../../api/loadProfileAPI';
import unfollowAPI from '../../../api/unfollowAPI';
import * as S from './ProfileDiv.Style';
import profileImg from '../../../assets/logo-profile.svg';
import Button from '../../../common/button/Button';

/**
 * 필요한 props
 * isProfile
 * isMine
 * accountName
 * isFollow
 * clickFollow
 */
const ProfileDiv = ({ accountName, isMine }) => {
  const [isProfile, setIsProfile] = useState(null);
  const [isFollow, setIsFollow] = useState(false);
  const navigate = useNavigate();
  const loadProfile = async () => {
    await loadProfileAPI(accountName).then((data) => {
      if (data.profile) {
        setIsProfile(data.profile);
        setIsFollow(data.profile.isfollow);
      }
    });
  };
  const clickFollow = () => {
    if (isFollow) {
      unfollowAPI(accountName);
      setIsFollow(false);
    } else {
      followAPI(accountName);
      setIsFollow(true);
    }
  };
  useEffect(() => {
    loadProfile();
  }, []);
  if (isProfile) {
    return (
      <S.ProfileDiv>
        <S.FollowNPicDiv>
          <S.FollowersLink to={`${window.location.pathname}/followers`}>
            {isProfile.followerCount || 0}
            <S.FollowSpan>followers</S.FollowSpan>
          </S.FollowersLink>
          {isProfile.image === 'http://146.56.183.55:5050/Ellipse.png' ? (
            <S.ProfileImg src={profileImg} />
          ) : (
            <S.ProfileImg src={isProfile.image} />
          )}

          <S.FollowingsLink to={`${window.location.pathname}/followings`}>
            {isProfile.followingCount || 0}
            <S.FollowSpan>followings</S.FollowSpan>
          </S.FollowingsLink>
        </S.FollowNPicDiv>
        <S.TextsCont>
          <S.TitSpan>{isProfile ? isProfile.username : '위니브'}</S.TitSpan>
          <S.IdSpan>@ {isProfile ? isProfile.accountname : 'weniv'}</S.IdSpan>
          <S.ContentSpan>
            {isProfile.intro ? isProfile.intro : '소개글을 입력해주세요'}
          </S.ContentSpan>
        </S.TextsCont>
        <S.BtnsCont>
          {isMine !== null &&
            (isMine ? (
              <>
                <Button
                  size='md'
                  tit='프로필 수정'
                  state=''
                  txtcolor='black'
                  onClick={() =>
                    navigate(`/profile/${accountName}/editProfile`)
                  }
                />
                <Button
                  size='md'
                  tit='상품 등록'
                  state=''
                  txtcolor='black'
                  onClick={() => navigate(`/profile/${accountName}/addProduct`)}
                />
              </>
            ) : (
              <>
                <S.BtnOverlay>
                  <S.ChatBtn />
                </S.BtnOverlay>
                {isFollow ? (
                  <Button
                    size='md'
                    tit='언팔로우'
                    isActive={false}
                    onClick={clickFollow}
                  />
                ) : (
                  <Button
                    size='md'
                    tit='팔로우'
                    isActive={!!true}
                    onClick={clickFollow}
                  />
                )}
                <S.BtnOverlay>
                  <S.ShareBtn />
                </S.BtnOverlay>
              </>
            ))}
        </S.BtnsCont>
      </S.ProfileDiv>
    );
  }
  return null;
};
export default ProfileDiv;