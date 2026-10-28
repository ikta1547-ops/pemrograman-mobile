import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { getExpoPushToken } from '../../utils/notifications';
import { simpanPushToken, kirimNotifikasiUji } from '../../services/notificationService';

export default function HomeScreen() {
  const { user, token, signOut } = useAuth();

  async function aktifkanNotifikasi() {
    try {
      const expoPushToken = await getExpoPushToken();
      await simpanPushToken(token, expoPushToken);
      Alert.alert('Berhasil', 'Perangkat terdaftar untuk notifikasi');
    } catch (e) {
      Alert.alert('Notifikasi', e.message);
    }
  }

  async function testNotifikasi() {
    try {
      const data = await kirimNotifikasiUji(token);
      Alert.alert('Server', data.pesan);
    } catch (e) {
      Alert.alert('Gagal', e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halo, {user?.nama}</Text>
      <Text style={styles.subtitle}>Anda sudah login menggunakan JWT.</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/profile')}>
        <Text style={styles.buttonText}>Lihat Profil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryButton} onPress={aktifkanNotifikasi}>
        <Text style={styles.buttonText}>Aktifkan Notifikasi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryButton} onPress={testNotifikasi}>
        <Text style={styles.buttonText}>Kirim Notifikasi Uji</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={signOut}>
        <Text style={styles.secondaryButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 24, 
    justifyContent: 'center', 
    gap: 16, 
    backgroundColor: '#fff0f5' // Warna latar belakang pink pastel lembut
  },
  title: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#6b21a8' // Ungu tua elegan
  },
  subtitle: { 
    fontSize: 16, 
    color: '#6b7280', 
    marginBottom: 8 
  },
  primaryButton: { 
    backgroundColor: '#9333ea', // Ungu cerah ala tema ZenZ
    padding: 16, 
    borderRadius: 16, 
    alignItems: 'center',
    shadowColor: '#9333ea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  secondaryButton: { 
    backgroundColor: '#ffffff', 
    borderWidth: 1.5, 
    borderColor: '#f43f5e', // Aksen pink/merah muda
    padding: 16, 
    borderRadius: 16, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: '700' 
  },
  secondaryButtonText: { 
    color: '#f43f5e', 
    fontSize: 16, 
    fontWeight: '700' 
  },
});