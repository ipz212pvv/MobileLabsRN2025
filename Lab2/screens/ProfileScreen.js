import React from 'react';
import { View, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const Avatar = styled(Image)`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  margin-bottom: 20px;
  align-self: center;
`;

const Username = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const StatsContainer = styled.View`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const StatText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`;

const AchievementsContainer = styled.View`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const AchievementItem = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const AchievementImage = styled(Image)`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const EditButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.accent};
  padding: 10px 20px;
  border-radius: 8px;
  align-self: center;
  margin-bottom: 20px;
`;

const EditButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
`;

const GameItem = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const GameImage = styled(Image)`
  width: 50px;
  height: 30px;
  margin-right: 10px;
`;

const GameTitle = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
`;

export default function ProfileScreen() {
  const stats = { hoursPlayed: 120, level: 42 };
  const achievements = [
    { id: '1', name: 'First Win', image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/304390/header.jpg?t=1745501188' },
    { id: '2', name: '10 Matches', image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1172470/header.jpg?t=1741980558' },
    { id: '3', name: 'Master Achievement', image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/570/header.jpg?t=1745368590' },
  ];
  const ownedGames = [
    { id: '1', title: 'Counter-Strike 2', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg' },
    { id: '2', title: 'Dota 2', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg' },
    { id: '3', title: 'Half-Life 2', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/220/header.jpg' },
  ];

  return (
    <Container>
      <Avatar source={{ uri: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/70/header.jpg?t=1745368462' }} />
      <Username>SteamUser123</Username>
      <StatsContainer>
        <StatText>Hours Played: {stats.hoursPlayed}</StatText>
        <StatText>Level: {stats.level}</StatText>
      </StatsContainer>
      <AchievementsContainer>
        <StatText style={{ fontWeight: 'bold', marginBottom: 10 }}>Achievements</StatText>
        <FlatList
          data={achievements}
          renderItem={({ item }) => (
            <AchievementItem>
              <AchievementImage source={{ uri: item.image }} />
              <StatText>{item.name}</StatText>
            </AchievementItem>
          )}
          keyExtractor={item => item.id}
        />
      </AchievementsContainer>
      <EditButton>
        <EditButtonText>Edit Profile</EditButtonText>
      </EditButton>
      <StatText style={{ fontWeight: 'bold', marginBottom: 10 }}>Owned Games</StatText>
      <FlatList
        data={ownedGames}
        renderItem={({ item }) => (
          <GameItem>
            <GameImage source={{ uri: item.image }} />
            <GameTitle>{item.title}</GameTitle>
          </GameItem>
        )}
        keyExtractor={item => item.id}
      />
    </Container>
  );
}