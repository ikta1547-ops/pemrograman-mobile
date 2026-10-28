import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet,
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function SignInScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (e) {
      Alert.alert('Login gagal', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selamat Datang</Text>
      <Text style={styles.subtitle}>Silakan masuk ke akun Anda</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Memproses...' : 'Login'}</Text>
      </TouchableOpacity>

      <Link href="/register" style={styles.link}>
        Belum punya akun? <Text style={styles.linkBold}>Daftar di sini</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fdf2f8' },
  title: { fontSize: 32, fontWeight: '800', color: '#1e3a8a', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#db2777', marginBottom: 24, fontWeight: '600' },
  input: { 
    borderWidth: 1.5, 
    borderColor: '#93c5fd', 
    backgroundColor: '#ffffff',
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '700' },
  link: { marginTop: 20, textAlign: 'center', color: '#4b5563', fontSize: 15 },
  linkBold: { color: '#db2777', fontWeight: '700' },
});