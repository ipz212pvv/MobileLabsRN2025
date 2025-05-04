import React from 'react';
import { View, Text, Image } from 'react-native';
import { TapGestureHandler, LongPressGestureHandler, PanGestureHandler, FlingGestureHandler, PinchGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const TargetContainer = styled(Animated.View)`
  width: 100px;
  height: 100px;
  background-color: #FF5722; /* Замінюємо градієнт на простий колір */
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
  elevation: 5;
`;

const TargetText = styled(Text)`
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
`;

export default function Target({ onSingleTap, onDoubleTap, onLongPress, onPan, onFling, onPinch, animatedStyle }) {
  return (
    <PinchGestureHandler onGestureEvent={onPinch}>
      <Animated.View style={animatedStyle}>
        <FlingGestureHandler
          direction={FlingGestureHandler.DIRECTIONS_LEFT | FlingGestureHandler.DIRECTIONS_RIGHT}
          onHandlerStateChange={onFling}
        >
          <PanGestureHandler onGestureEvent={onPan} onHandlerStateChange={onPan}>
            <LongPressGestureHandler onHandlerStateChange={onLongPress} minDurationMs={3000}>
              <TapGestureHandler onHandlerStateChange={onSingleTap} numberOfTaps={1}>
                <TapGestureHandler onHandlerStateChange={onDoubleTap} numberOfTaps={2} maxDelayMs={250}>
                  <TargetContainer>
                    <TargetText>🎯</TargetText>
                  </TargetContainer>
                </TapGestureHandler>
              </TapGestureHandler>
            </LongPressGestureHandler>
          </PanGestureHandler>
        </FlingGestureHandler>
      </Animated.View>
    </PinchGestureHandler>
  );
}