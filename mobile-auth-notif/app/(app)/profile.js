import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getMe } from '../../services/authService';

export default function ProfileScreen() {
  const { token } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getMe(token).then(setProfile).catch(console.error);
  }, [token]);

  if (!profile) return <ActivityIndicator style={{ flex: 1 }} color="#2563eb" />;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <Text style={styles.value}>{profile.nama}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Email Akun</Text>
        <Text style={styles.value}>{profile.email}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>User ID</Text>
        <Text style={styles.value}>{profile.id}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16, backgroundColor: '#fdf2f8' },
  card: { backgroundColor: '#ffffff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#93c5fd', gap: 4 },
  label: { fontSize: 14, color: '#db2777', fontWeight: '600' },
  value: { fontSize: 18, color: '#1e3a8a', fontWeight: '700' },
});