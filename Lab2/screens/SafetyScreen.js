import React, { useState, useEffect } from 'react';
import { View, Switch, Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SettingItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: ${({ theme }) => theme.cardBackground};
  border-radius: 8px;
  margin-bottom: 10px;
`;

const SettingText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 16px;
`;

const AuthenticatorContainer = styled.View`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  align-items: center;
`;

const AuthCode = styled.Text`
  color: ${({ theme }) => theme.accent};
  font-size: 32px;
  font-weight: bold;
  letter-spacing: 5px;
`;

const Timer = styled.Text`
  color: ${({ theme }) => theme.secondaryText};
  font-size: 14px;
  margin-top: 5px;
`;

export default function SafetyScreen() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [authCode, setAuthCode] = useState(generateCode());
  const [secondsLeft, setSecondsLeft] = useState(30);

  // Генерація 6-значного коду
  function generateCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Оновлення коду кожні 30 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev === 1) {
          setAuthCode(generateCode());
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Title>Safety Settings</Title>
      <SettingItem>
        <SettingText>Two-Factor Authentication</SettingText>
        <Switch
          value={twoFactorEnabled}
          onValueChange={setTwoFactorEnabled}
          trackColor={{ false: '#767577', true: '#5c7cfa' }}
          thumbColor={twoFactorEnabled ? '#ffffff' : '#f4f3f4'}
        />
      </SettingItem>
      <SettingItem>
        <SettingText>Suspicious Activity Alerts</SettingText>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#767577', true: '#5c7cfa' }}
          thumbColor={notificationsEnabled ? '#ffffff' : '#f4f3f4'}
        />
      </SettingItem>
      {twoFactorEnabled && (
        <AuthenticatorContainer>
          <AuthCode>{authCode}</AuthCode>
          <Timer>Code expires in {secondsLeft} seconds</Timer>
        </AuthenticatorContainer>
      )}
    </Container>
  );
}