import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import GameCard from '../components/GameCard';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 10px;
`;

const FilterBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const FilterButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 8px 15px;
  border-radius: 8px;
`;

const FilterText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 14px;
`;

const CategoryText = styled.Text`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 16px;
  margin: 10px 0;
  font-weight: bold;
`;

const games = [
  { id: '1', title: 'Counter-Strike 2', price: '$19.99', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg', category: 'Action' },
  { id: '2', title: 'Dota 2', price: 'Free', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg', category: 'MOBA' },
  { id: '3', title: 'Half-Life 2', price: '$9.99', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/220/header.jpg', category: 'FPS' },
  { id: '4', title: 'Team Fortress 2', price: 'Free', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/440/header.jpg', category: 'Action' },
  { id: '5', title: 'Portal 2', price: '$14.99', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/620/header.jpg', category: 'Puzzle' },
  { id: '6', title: 'Left 4 Dead 2', price: '$9.99', image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/550/header.jpg', category: 'Action' },
];

export default function StoreScreen() {
  const [data, setData] = useState(games.slice(0, 6));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('All');

  const loadMore = () => {
    if (loading || data.length >= games.length) return;
    setLoading(true);
    setTimeout(() => {
      const newData = games.slice(0, (page + 1) * 6);
      setData(newData);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  const filteredGames = filter === 'All' ? data : data.filter(game => game.category === filter);

  return (
    <Container>
      <FilterBar>
        <FilterButton onPress={() => setFilter('All')}>
          <FilterText>All</FilterText>
        </FilterButton>
        <FilterButton onPress={() => setFilter('Action')}>
          <FilterText>Action</FilterText>
        </FilterButton>
        <FilterButton onPress={() => setFilter('MOBA')}>
          <FilterText>MOBA</FilterText>
        </FilterButton>
        <FilterButton onPress={() => setFilter('FPS')}>
          <FilterText>FPS</FilterText>
        </FilterButton>
        <FilterButton onPress={() => setFilter('Puzzle')}>
          <FilterText>Puzzle</FilterText>
        </FilterButton>
      </FilterBar>
      <CategoryText>Featured Games</CategoryText>
      <FlatList
        data={filteredGames}
        renderItem={({ item }) => <GameCard title={item.title} price={item.price} image={item.image} />}
        keyExtractor={item => item.id}
        numColumns={2}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#5c7cfa" /> : null}
      />
    </Container>
  );
}