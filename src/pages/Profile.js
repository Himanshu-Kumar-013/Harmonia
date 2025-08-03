import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiCalendar, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import { useMusicPlayer } from '../contexts/MusicPlayerContext';

const ProfileContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  margin-bottom: 3rem;
`;

const ProfileTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #ffffff;
`;

const ProfileSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const ProfileSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Avatar = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.2);
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const AvatarEdit = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  background: #667eea;
  border: none;
  border-radius: 50%;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: #5a6fd8;
    transform: scale(1.1);
  }
`;

const UserDetails = styled.div`
  flex: 1;
`;

const Username = styled.h3`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: #ffffff;
`;

const UserEmail = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 0.5rem 0;
`;

const MemberSince = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
`;

const EditButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: rgba(102, 126, 234, 0.2);
  border: 1px solid #667eea;
  border-radius: 8px;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #667eea;
    color: #ffffff;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SaveButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #667eea;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #5a6fd8;
  }
`;

const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
`;

const RecentActivity = styled.div`
  margin-top: 1.5rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 1.2rem;
`;

const ActivityDetails = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
`;

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { likedSongs, recentlyPlayed, userPlaylists } = useMusicPlayer();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({
      username: user?.username || '',
      email: user?.email || ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileTitle>Profile</ProfileTitle>
        <ProfileSubtitle>Manage your account and preferences</ProfileSubtitle>
      </ProfileHeader>

      <ProfileCard>
        <ProfileSection>
          <SectionTitle>
            <FiUser />
            Personal Information
          </SectionTitle>
          
          {!isEditing ? (
            <ProfileInfo>
              <Avatar>
                <AvatarImage src={user?.avatar} alt={user?.username} />
                <AvatarEdit>
                  <FiEdit2 />
                </AvatarEdit>
              </Avatar>
              <UserDetails>
                <Username>{user?.username}</Username>
                <UserEmail>{user?.email}</UserEmail>
                <MemberSince>Member since {formatDate(user?.createdAt)}</MemberSince>
              </UserDetails>
              <EditButton onClick={handleEdit}>
                <FiEdit2 />
                Edit Profile
              </EditButton>
            </ProfileInfo>
          ) : (
            <Form>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  value={editForm.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </FormGroup>
              <ButtonGroup>
                <SaveButton onClick={handleSave}>
                  <FiSave />
                  Save Changes
                </SaveButton>
                <CancelButton onClick={handleCancel}>
                  <FiX />
                  Cancel
                </CancelButton>
              </ButtonGroup>
            </Form>
          )}
        </ProfileSection>
      </ProfileCard>

      <ProfileCard>
        <SectionTitle>
          <FiCalendar />
          Listening Statistics
        </SectionTitle>
        
        <StatsGrid>
          <StatCard>
            <StatNumber>{likedSongs.length}</StatNumber>
            <StatLabel>Liked Songs</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{recentlyPlayed.length}</StatNumber>
            <StatLabel>Recently Played</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{userPlaylists.length}</StatNumber>
            <StatLabel>Playlists</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{userPlaylists.reduce((total, playlist) => total + playlist.tracks.length, 0)}</StatNumber>
            <StatLabel>Total Tracks in Playlists</StatLabel>
          </StatCard>
        </StatsGrid>
      </ProfileCard>

      <ProfileCard>
        <SectionTitle>
          <FiUser />
          Recent Activity
        </SectionTitle>
        
        <RecentActivity>
          {recentlyPlayed.slice(0, 5).map((track, index) => (
            <ActivityItem key={track.id}>
              <ActivityIcon>🎵</ActivityIcon>
              <ActivityDetails>
                <ActivityTitle>Listened to "{track.title}" by {track.artist}</ActivityTitle>
                <ActivityTime>Recently</ActivityTime>
              </ActivityDetails>
            </ActivityItem>
          ))}
          
          {recentlyPlayed.length === 0 && (
            <ActivityItem>
              <ActivityIcon>📝</ActivityIcon>
              <ActivityDetails>
                <ActivityTitle>No recent activity</ActivityTitle>
                <ActivityTime>Start listening to music to see your activity here</ActivityTime>
              </ActivityDetails>
            </ActivityItem>
          )}
        </RecentActivity>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile; 