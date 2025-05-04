import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import TasksScreen from './screens/TasksScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Game') iconName = 'game-controller';
            else if (route.name === 'Tasks') iconName = 'list';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: '#888',
          headerStyle: { backgroundColor: '#2E7D32' },
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: 'bold' },
        })}
      >
        <Tab.Screen name="Game" component={HomeScreen} />
        <Tab.Screen name="Tasks" component={TasksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}