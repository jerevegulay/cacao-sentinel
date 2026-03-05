import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('App');
    }, 800);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Ionicons name="shield-checkmark" size={48} color={colors.primary} />
      </View>
      <Text style={styles.title}>CacaoGuard</Text>
      <Text style={styles.subtitle}>Sign in to monitor your cacao farms</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={colors.mutedForeground}
      />

      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholderTextColor={colors.mutedForeground}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color={colors.mutedForeground} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <View style={styles.demoSection}>
        <Text style={styles.demoTitle}>Demo Accounts:</Text>
        <Text style={styles.demoText}>Admin: admin@cacaoguard.ph</Text>
        <Text style={styles.demoText}>Farmer: farmer@cacaoguard.ph</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  logoRow: { marginBottom: 8 },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.foreground, marginTop: 8 },
  subtitle: { fontSize: 14, color: colors.mutedForeground, marginBottom: 32 },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: colors.card,
    marginBottom: 16,
    color: colors.foreground,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 8,
    marginBottom: 16,
  },
  eyeBtn: { padding: 8 },
  button: {
    width: '100%',
    height: 52,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  demoSection: { marginTop: 32, alignItems: 'center' },
  demoTitle: { fontSize: 13, color: colors.mutedForeground, marginBottom: 4 },
  demoText: { fontSize: 13, color: colors.foreground, fontWeight: '500' },
});

export default LoginScreen;
