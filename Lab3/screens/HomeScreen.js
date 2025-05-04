import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TapGestureHandler, LongPressGestureHandler, PanGestureHandler, FlingGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import Target from '../components/Target';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

const Container = styled(View)`
  flex: 1;
  background-color: #E0F7FA; /* Замінюємо градієнт на простий колір */
  justify-content: center;
  align-items: center;
`;

const ScoreText = styled(Text)`
  font-size: 32px;
  color: #2E7D32;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

export default function HomeScreen() {
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState({
    singleClicks: 0,
    doubleClicks: 0,
    longPress: 0,
    pan: false,
    flingRight: false,
    flingLeft: false,
    pinch: false,
    totalScore: 0,
  });

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: withTiming(translateX.value, { duration: 100, easing: Easing.ease }) },
        { translateY: withTiming(translateY.value, { duration: 100, easing: Easing.ease }) },
      ],
    };
  });

  const onSingleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === 4) {
      setScore(prev => prev + 1);
      setTasks(prev => ({ ...prev, singleClicks: prev.singleClicks + 1, totalScore: prev.totalScore + 1 }));
    }
  };

  const onDoubleTap = ({ nativeEvent }) => {
    if (nativeEvent.state === 4) {
      setScore(prev => prev + 2);
      setTasks(prev => ({ ...prev, doubleClicks: prev.doubleClicks + 1, totalScore: prev.totalScore + 2 }));
    }
  };

  const onLongPress = ({ nativeEvent }) => {
    if (nativeEvent.state === 4) {
      setScore(prev => prev + 5);
      setTasks(prev => ({ ...prev, longPress: prev.longPress + 1, totalScore: prev.totalScore + 5 }));
    }
  };

  const onPan = ({ nativeEvent }) => {
    if (nativeEvent.state === 4) {
      translateX.value = nativeEvent.translationX;
      translateY.value = nativeEvent.translationY;
      setTasks(prev => ({ ...prev, pan: true }));
    }
  };

  const onFling = ({ nativeEvent }) => {
    if (nativeEvent.state === 4) {
      const points = Math.floor(Math.random() * 10) + 1;
      if (nativeEvent.extraVelocityX > 500) {
        setScore(prev => prev + points);
        setTasks(prev => ({ ...prev, flingRight: true, totalScore: prev.totalScore + points }));
      } else if (nativeEvent.extraVelocityX < -500) {
        setScore(prev => prev + points);
        setTasks(prev => ({ ...prev, flingLeft: true, totalScore: prev.totalScore + points }));
      }
    }
  };

  const onPinch = ({ nativeEvent }) => {
    if (nativeEvent.state === 4) {
      scale.value = nativeEvent.scale;
      setTasks(prev => ({ ...prev, pinch: true }));
    }
  };

  return (
    <Container>
      <ScoreText>Score: {score}</ScoreText>
      <Target
        onSingleTap={onSingleTap}
        onDoubleTap={onDoubleTap}
        onLongPress={onLongPress}
        onPan={onPan}
        onFling={onFling}
        onPinch={onPinch}
        animatedStyle={animatedStyle}
      />
    </Container>
  );
}