import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import Toast from 'react-native-toast-message';
import ConfigCard from '../components/ConfigCard';
import { colors } from '../theme/colors';

const sensitivityOptions = [
  { value: 'low', label: 'Low — Major threats only' },
  { value: 'medium', label: 'Medium — Balanced' },
  { value: 'high', label: 'High — All detections' },
];

const SettingsScreen = () => {
  const [diseaseThreshold, setDiseaseThreshold] = useState(30);
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  const [alertSensitivity, setAlertSensitivity] = useState('medium');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [scanInterval, setScanInterval] = useState('30');
  const [autoScan, setAutoScan] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    Toast.show({ type: 'success', text1: 'Settings Saved', text2: 'Your configuration has been updated.' });
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.pageTitle}>Settings</Text>
          <Text style={styles.pageSubtitle}>System configuration & preferences</Text>
        </View>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Ionicons name={saved ? 'checkmark-circle' : 'save'} size={18} color="#fff" />
          <Text style={styles.saveBtnText}>{saved ? 'Saved!' : 'Save All'}</Text>
        </TouchableOpacity>
      </View>

      {/* Disease Thresholds */}
      <ConfigCard title="Disease Thresholds" description="Set the sensitivity for Black Pod Disease detection.">
        <Text style={styles.sliderLabel}>Affected Area Threshold</Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            minimumValue={5}
            maximumValue={80}
            step={5}
            value={diseaseThreshold}
            onValueChange={setDiseaseThreshold}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.muted}
            thumbTintColor={colors.primary}
          />
          <Text style={styles.sliderValue}>{diseaseThreshold}%</Text>
        </View>
        <Text style={styles.helperText}>Alert when pod area affected exceeds this percentage.</Text>

        <Text style={[styles.sliderLabel, { marginTop: 20 }]}>Confidence Threshold</Text>
        <View style={styles.sliderRow}>
          <Slider
            style={styles.slider}
            minimumValue={50}
            maximumValue={99}
            step={1}
            value={confidenceThreshold}
            onValueChange={setConfidenceThreshold}
            minimumTrackTintColor={colors.primary}
            maximumTrackTintColor={colors.muted}
            thumbTintColor={colors.primary}
          />
          <Text style={styles.sliderValue}>{confidenceThreshold}%</Text>
        </View>
        <Text style={styles.helperText}>Minimum ML confidence score to flag a detection.</Text>
      </ConfigCard>

      {/* Alert Configuration */}
      <ConfigCard title="Alert Configuration" description="Configure how and when alerts are triggered.">
        <Text style={styles.sliderLabel}>Alert Sensitivity</Text>
        <View style={styles.optionRow}>
          {sensitivityOptions.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[styles.optionChip, alertSensitivity === opt.value && styles.optionChipActive]}
              onPress={() => setAlertSensitivity(opt.value)}
            >
              <Text style={[styles.optionText, alertSensitivity === opt.value && styles.optionTextActive]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Email Notifications</Text>
          <Switch
            value={emailAlerts}
            onValueChange={setEmailAlerts}
            trackColor={{ false: colors.muted, true: colors.primary + '40' }}
            thumbColor={emailAlerts ? colors.primary : colors.mutedForeground}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Push Notifications</Text>
          <Switch
            value={pushAlerts}
            onValueChange={setPushAlerts}
            trackColor={{ false: colors.muted, true: colors.primary + '40' }}
            thumbColor={pushAlerts ? colors.primary : colors.mutedForeground}
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Critical Alerts Only</Text>
          <Switch
            value={criticalOnly}
            onValueChange={setCriticalOnly}
            trackColor={{ false: colors.muted, true: colors.primary + '40' }}
            thumbColor={criticalOnly ? colors.primary : colors.mutedForeground}
          />
        </View>
      </ConfigCard>

      {/* UAV Scan Settings */}
      <ConfigCard title="UAV Scan Settings" description="Configure automatic scan behavior.">
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Auto-Scan Enabled</Text>
          <Switch
            value={autoScan}
            onValueChange={setAutoScan}
            trackColor={{ false: colors.muted, true: colors.primary + '40' }}
            thumbColor={autoScan ? colors.primary : colors.mutedForeground}
          />
        </View>

        <Text style={[styles.sliderLabel, { marginTop: 12 }]}>Scan Interval (minutes)</Text>
        <TextInput
          style={[styles.input, !autoScan && styles.inputDisabled]}
          keyboardType="numeric"
          value={scanInterval}
          onChangeText={setScanInterval}
          editable={autoScan}
          placeholderTextColor={colors.mutedForeground}
        />
        <Text style={styles.helperText}>Time between automated UAV scan passes.</Text>
      </ConfigCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 32 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: colors.foreground },
  pageSubtitle: { fontSize: 14, color: colors.mutedForeground, marginTop: 2 },
  saveBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10,
  },
  saveBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  sliderLabel: { fontSize: 13, fontWeight: '500', color: colors.foreground, marginBottom: 4 },
  sliderRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  slider: { flex: 1, height: 40 },
  sliderValue: { fontSize: 14, fontWeight: '700', color: colors.foreground, minWidth: 40, textAlign: 'right' },
  helperText: { fontSize: 11, color: colors.mutedForeground, marginTop: 4 },
  optionRow: { gap: 8, marginBottom: 16 },
  optionChip: {
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 8,
    borderWidth: 1, borderColor: colors.cardBorder, backgroundColor: colors.background,
    marginBottom: 6,
  },
  optionChipActive: { backgroundColor: colors.primary + '15', borderColor: colors.primary },
  optionText: { fontSize: 13, color: colors.mutedForeground },
  optionTextActive: { color: colors.primary, fontWeight: '600' },
  switchRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.cardBorder,
  },
  switchLabel: { fontSize: 14, color: colors.foreground },
  input: {
    height: 44, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 10,
    paddingHorizontal: 14, fontSize: 14, backgroundColor: colors.background, color: colors.foreground,
  },
  inputDisabled: { opacity: 0.5, backgroundColor: colors.muted },
});

export default SettingsScreen;
