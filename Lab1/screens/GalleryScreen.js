import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';

export default function GalleryScreen() {
  const data = [
    'https://uakino.me/uploads/mini/poster/77/ec48dc15d33d22b8fbecadb6c64c47.webp',
    'https://uakino.me/uploads/mini/mainpics/a6/e402c2d230324132926192ad801888.webp',
    'https://uakino.me/uploads/mini/mainpics/cc/0caf6f07d350c6f66833cefacc7098.webp',
    'https://uakino.me/uploads/mini/mainpics/aa/82cd20db9f48dd4fc88b9a924e0051.webp',
    'https://uakino.me/uploads/mini/mainpics/1c/5265d3e84ee1e46fcc3092b9a42c2f.webp',
    'https://uakino.me/uploads/mini/mainpics/ed/084be2aaebb90c8cffd2db4abcfe0b.webp',
    'https://uakino.me/uploads/mini/mainpics/5b/53d9356ecb9e9c98b7c7545d404b88.webp',
    'https://uakino.me/uploads/mini/mainpics/54/ac529100207d73567b6bdf186ab13a.webp',
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    margin: 5,
    height: 150,
    borderRadius: 10,
  },
});