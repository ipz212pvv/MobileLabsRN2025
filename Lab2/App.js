import React, { useState, useEffect } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import StoreScreen from './screens/StoreScreen';
import CommunityScreen from './screens/CommunityScreen';
import ChatScreen from './screens/ChatScreen';
import SafetyScreen from './screens/SafetyScreen';
import ProfileScreen from './screens/ProfileScreen';
import { lightTheme } from './theme/light';
import { darkTheme } from './theme/dark';

const Tab = createBottomTabNavigator();

const Footer = styled.View`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 10px;
  align-items: center;
`;

const FooterText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 12px;
`;

export default function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const savedTheme = await AsyncStorage.getItem('@theme');
    if (savedTheme) setTheme(savedTheme);
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('@theme', newTheme);
  };

  const navigationTheme = theme === 'light' ? {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: lightTheme.background,
      card: lightTheme.cardBackground,
      text: lightTheme.text,
    },
  } : {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: darkTheme.background,
      card: darkTheme.cardBackground,
      text: darkTheme.text,
    },
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <NavigationContainer theme={navigationTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Store') iconName = 'storefront';
              else if (route.name === 'Community') iconName = 'people';
              else if (route.name === 'Chat') iconName = 'chatbox';
              else if (route.name === 'Safety') iconName = 'shield';
              else if (route.name === 'Profile') iconName = 'person';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: theme === 'light' ? '#171a21' : '#c7d5e0',
            tabBarInactiveTintColor: theme === 'light' ? '#c7d5e0' : '#171a21',
            headerStyle: {
              backgroundColor: theme === 'light' ? lightTheme.cardBackground : darkTheme.cardBackground,
            },
            headerTintColor: theme === 'light' ? lightTheme.text : darkTheme.text,
            headerRight: () => (
              <Ionicons
                name="moon"
                size={24}
                color={theme === 'light' ? '#171a21' : '#c7d5e0'}
                style={{ marginRight: 10 }}
                onPress={toggleTheme}
              />
            ),
          })}
        >
          <Tab.Screen name="Store" component={StoreScreen} />
          <Tab.Screen name="Community" component={CommunityScreen} />
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="Safety" component={SafetyScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
        <Footer>
          <FooterText>Steam App © 2025</FooterText>
        </Footer>
      </NavigationContainer>
    </ThemeProvider>
  );
}