import React from 'react';
import { View, FlatList, Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled(View)`
  flex: 1;
  background-color: #E0F7FA; /* Замінюємо градієнт на простий колір */
  padding: 20px;
`;

const TaskItem = styled(View)`
  background-color: #FFF;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 3;
`;

const TaskText = styled(Text)`
  font-size: 16px;
  color: #2E7D32;
`;

const StatusText = styled(Text)`
  font-size: 14px;
  color: ${props => (props.completed ? '#4CAF50' : '#F44336')};
  font-weight: bold;
`;

const tasks = [
  { id: '1', title: 'Make 10 clicks', target: 10, type: 'singleClicks', completed: false },
  { id: '2', title: 'Make 5 double clicks', target: 5, type: 'doubleClicks', completed: false },
  { id: '3', title: 'Hold for 3 seconds', target: 1, type: 'longPress', completed: false },
  { id: '4', title: 'Drag the object', target: 1, type: 'pan', completed: false },
  { id: '5', title: 'Swipe right', target: 1, type: 'flingRight', completed: false },
  { id: '6', title: 'Swipe left', target: 1, type: 'flingLeft', completed: false },
  { id: '7', title: 'Resize the object', target: 1, type: 'pinch', completed: false },
  { id: '8', title: 'Reach 100 points', target: 100, type: 'totalScore', completed: false },
];

export default function TasksScreen({ route }) {
  const { tasks: taskProgress } = route.params || { tasks: { singleClicks: 0, doubleClicks: 0, longPress: 0, pan: false, flingRight: false, flingLeft: false, pinch: false, totalScore: 0 } };

  const renderItem = ({ item }) => {
    const completed = item.type === 'pan' || item.type === 'flingRight' || item.type === 'flingLeft' || item.type === 'pinch'
      ? taskProgress[item.type]
      : taskProgress[item.type] >= item.target;
    return (
      <TaskItem>
        <TaskText>{item.title}</TaskText>
        <StatusText completed={completed}>
          {completed ? 'Completed!' : `Progress: ${taskProgress[item.type]}/${item.target}`}
        </StatusText>
      </TaskItem>
    );
  };

  return (
    <Container>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Container>
  );
}