import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import FarmHealthCard from '../components/FarmHealthCard';
import { farms as initialFarms } from '../data/mockData';
import { colors } from '../theme/colors';

const FarmsScreen = () => {
  const [farmList, setFarmList] = useState(initialFarms);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    owner: '',
    location: 'Initao, Misamis Oriental',
    size: '',
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.owner || !formData.size) return;

    const newFarm = {
      id: String(Date.now()),
      name: formData.name,
      owner: formData.owner,
      location: formData.location,
      size: parseFloat(formData.size),
      healthScore: 100,
      riskLevel: 'Healthy',
    };

    setFarmList((prev) => [newFarm, ...prev]);
    setFormData({ name: '', owner: '', location: 'Initao, Misamis Oriental', size: '' });
    setShowForm(false);
    Toast.show({ type: 'success', text1: 'Farm Registered', text2: `${newFarm.name} has been added successfully.` });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.pageTitle}>Farms</Text>
          <Text style={styles.pageSubtitle}>{farmList.length} registered farms</Text>
        </View>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => setShowForm(!showForm)}
        >
          <Ionicons name={showForm ? 'close' : 'add'} size={20} color="#fff" />
          <Text style={styles.registerBtnText}>{showForm ? 'Cancel' : 'Register Farm'}</Text>
        </TouchableOpacity>
      </View>

      {/* Add Farm Form */}
      {showForm && (
        <View style={styles.formCard}>
          <View style={styles.formTitleRow}>
            <Ionicons name="leaf" size={20} color={colors.primary} />
            <Text style={styles.formTitle}>Register New Farm</Text>
          </View>

          <Text style={styles.label}>Farm Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Hacienda Verde"
            value={formData.name}
            onChangeText={(t) => setFormData({ ...formData, name: t })}
            placeholderTextColor={colors.mutedForeground}
          />

          <Text style={styles.label}>Owner Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Juan Dela Cruz"
            value={formData.owner}
            onChangeText={(t) => setFormData({ ...formData, owner: t })}
            placeholderTextColor={colors.mutedForeground}
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={formData.location}
            onChangeText={(t) => setFormData({ ...formData, location: t })}
            placeholderTextColor={colors.mutedForeground}
          />

          <Text style={styles.label}>Size (hectares)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 12.5"
            value={formData.size}
            onChangeText={(t) => setFormData({ ...formData, size: t })}
            keyboardType="numeric"
            placeholderTextColor={colors.mutedForeground}
          />

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Ionicons name="add" size={20} color="#fff" />
            <Text style={styles.submitBtnText}>Add Farm</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Farm List */}
      {farmList.map((farm) => (
        <FarmHealthCard key={farm.id} farm={farm} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 32 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: colors.foreground },
  pageSubtitle: { fontSize: 14, color: colors.mutedForeground, marginTop: 2 },
  registerBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.primary, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10,
  },
  registerBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  formCard: {
    backgroundColor: colors.card, borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: colors.cardBorder, marginBottom: 20,
  },
  formTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  formTitle: { fontSize: 16, fontWeight: '600', color: colors.foreground },
  label: { fontSize: 13, fontWeight: '500', color: colors.foreground, marginBottom: 6, marginTop: 12 },
  input: {
    height: 44, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 10,
    paddingHorizontal: 14, fontSize: 14, backgroundColor: colors.background, color: colors.foreground,
  },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.primary, borderRadius: 10, height: 48, marginTop: 20, gap: 8,
  },
  submitBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});

export default FarmsScreen;
