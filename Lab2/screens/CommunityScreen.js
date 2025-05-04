import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Image } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 10px;
`;

const NewsItem = styled.View`
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 10px;
  flex-direction: row;
`;

const NewsImage = styled(Image)`
  width: 100px;
  height: 60px;
  border-radius: 4px;
  margin-right: 10px;
`;

const NewsContent = styled.View`
  flex: 1;
`;

const NewsTitle = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  font-weight: bold;
`;

const NewsDescription = styled.Text`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 14px;
`;

const news = [
  { id: '1', title: 'Steam Summer Sale 2025', description: 'Massive discounts on thousands of games!', image: 'https://download.steaminventoryhelper.com/images/csgofast9.png' },
  { id: '2', title: 'New Updates for CS2', description: 'New maps and skins added.', image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1745368595' },
  { id: '3', title: 'Dota 2 Patch 7.36', description: 'Balance changes and new hero!', image: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/570/header.jpg?t=1745368590' },
  { id: '4', title: 'Steam Awards 2025', description: 'Vote for your favorite games!', image: 'https://download.steaminventoryhelper.com/images/csgofast8.png' },
];

export default function CommunityScreen() {
  const [data, setData] = useState(news.slice(0, 5));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (loading || data.length >= news.length) return;
    setLoading(true);
    setTimeout(() => {
      const newData = news.slice(0, (page + 1) * 5);
      setData(newData);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <NewsItem>
            <NewsImage source={{ uri: item.image }} />
            <NewsContent>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsDescription>{item.description}</NewsDescription>
            </NewsContent>
          </NewsItem>
        )}
        keyExtractor={item => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color="#5c7cfa" /> : null}
      />
    </Container>
  );
}