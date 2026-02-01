import React, { useState } from 'react';
import {
View, Text, Image, ScrollView, TextInput, Button,
Switch, FlatList, SectionList, ActivityIndicator,
Modal, Pressable, Alert, StatusBar, ImageBackground,
KeyboardAvoidingView, Platform, RefreshControl
} from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const recentLogins = [
    { id: '1', email: 'user1@example.com' },
    { id: '2', email: 'user2@example.com' },
    { id: '3', email: 'user3@example.com' },
  ];

  const sections = [
    {
      title: 'Login Methods',
      data: ['Email/Password', 'Social Login', 'Biometric']
    }
  ];

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Login Successful!');
    }, 2000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Refreshed', 'Login options updated');
    }, 1500);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1557683316-973673baf926' }}
      style={{ flex: 1 }}
      blurRadius={3}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
            {/* Logo/Image */}
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <Image
                source={{ uri: 'https://via.placeholder.com/100' }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#fff', marginTop: 10 }}>
                Welcome Back
              </Text>
            </View>

            {/* Login Form */}
            <View style={{ backgroundColor: 'rgba(255,255,255,0.95)', padding: 20, borderRadius: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 15 }}>
                Login to Your Account
              </Text>

              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{
                  borderWidth: 1,
                  borderColor: '#ddd',
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 15,
                  backgroundColor: '#fff'
                }}
                keyboardType="email-address"
              />

              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                  borderWidth: 1,
                  borderColor: '#ddd',
                  padding: 12,
                  borderRadius: 8,
                  marginBottom: 15,
                  backgroundColor: '#fff'
                }}
              />

              {/* Switch */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                />
                <Text style={{ marginLeft: 10 }}>Remember Me</Text>
              </View>

              {/* ActivityIndicator */}
              {isLoading && (
                <ActivityIndicator size="large" color="#1e3a8a" style={{ marginBottom: 15 }} />
              )}

              {/* Button */}
              <Button
                title={isLoading ? "Logging in..." : "Login"}
                onPress={handleLogin}
                disabled={isLoading}
                color="#1e3a8a"
              />

              {/* Pressable */}
              <Pressable
                onPress={() => setModalVisible(true)}
                style={({ pressed }) => [
                  { marginTop: 15, padding: 12, backgroundColor: pressed ? '#ddd' : '#f3f4f6', borderRadius: 8 }
                ]}
              >
                <Text style={{ textAlign: 'center', color: '#1e3a8a', fontWeight: '600' }}>
                  Forgot Password?
                </Text>
              </Pressable>

              {/* FlatList - Recent Logins */}
              <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 10 }}>
                Recent Logins:
              </Text>
              <FlatList
                data={recentLogins}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => setEmail(item.email)}
                    style={{ padding: 10, backgroundColor: '#e5e7eb', marginBottom: 5, borderRadius: 5 }}
                  >
                    <Text>{item.email}</Text>
                  </Pressable>
                )}
              />

              {/* SectionList */}
              <SectionList
                sections={sections}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => (
                  <View style={{ padding: 8, paddingLeft: 15 }}>
                    <Text style={{ color: '#666' }}>• {item}</Text>
                  </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                  <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 15, marginBottom: 5 }}>
                    {title}
                  </Text>
                )}
              />
            </View>

            {/* Modal */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 30, borderRadius: 15, width: '80%' }}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 15 }}>
                    Reset Password
                  </Text>
                  <Text style={{ marginBottom: 20, color: '#666' }}>
                    Enter your email to receive a password reset link.
                  </Text>
                  <TextInput
                    placeholder="Email"
                    style={{
                      borderWidth: 1,
                      borderColor: '#ddd',
                      padding: 12,
                      borderRadius: 8,
                      marginBottom: 15
                    }}
                  />
                  <Button
                    title="Send Reset Link"
                    onPress={() => {
                      setModalVisible(false);
                      Alert.alert('Success', 'Reset link sent to your email!');
                    }}
                    color="#1e3a8a"
                  />
                  <Pressable
                    onPress={() => setModalVisible(false)}
                    style={{ marginTop: 15, padding: 10 }}
                  >
                    <Text style={{ textAlign: 'center', color: '#666' }}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
