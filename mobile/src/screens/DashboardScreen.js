import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from '../components/StatCard';
import FarmHealthCard from '../components/FarmHealthCard';
import SeverityBadge from '../components/SeverityBadge';
import { dashboardStats, farms, recentScans, alerts } from '../data/mockData';
import { colors } from '../theme/colors';

const DashboardScreen = ({ navigation }) => {
  const [droneStatus, setDroneStatus] = useState('Inactive');
  const [notificationCount, setNotificationCount] = useState(3);

  const handleStartScan = () => {
    setDroneStatus((prev) => (prev === 'Active' ? 'Inactive' : 'Active'));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Dashboard</Text>
        <Text style={styles.pageSubtitle}>Black Pod Disease monitoring overview</Text>
      </View>

      {/* Controls */}
      <View style={styles.controlRow}>
        <TouchableOpacity
          style={[styles.alertBadge, notificationCount > 0 && styles.alertBadgeActive]}
          onPress={() => setNotificationCount(0)}
        >
          <Text style={[styles.alertBadgeText, notificationCount > 0 && { color: colors.destructive }]}>
            {notificationCount > 0 ? `${notificationCount} Alerts` : 'No Alerts'}
          </Text>
        </TouchableOpacity>

        <View style={[styles.statusChip, droneStatus === 'Active' && styles.statusChipActive]}>
          <Ionicons
            name={droneStatus === 'Active' ? 'wifi' : 'wifi-outline'}
            size={16}
            color={droneStatus === 'Active' ? colors.success : colors.mutedForeground}
          />
          <Text style={[styles.statusText, droneStatus === 'Active' && { color: colors.success }]}>
            Drone: {droneStatus}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.scanBtn, droneStatus === 'Active' && styles.stopBtn]}
          onPress={handleStartScan}
        >
          <Ionicons name="radio-outline" size={18} color="#fff" />
          <Text style={styles.scanBtnText}>
            {droneStatus === 'Active' ? 'Stop Scan' : 'Start Scan'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <StatCard title="Total Farms" value={dashboardStats.totalFarms} subtitle="Registered in Initao" iconName="leaf-outline" trend={{ value: 8, positive: true }} />
        <StatCard title="UAV Scans" value={dashboardStats.totalScans} subtitle="This month" iconName="camera-outline" trend={{ value: 12, positive: true }} />
        <StatCard title="Detected Cases" value={dashboardStats.detectedCases} subtitle="Active infections" iconName="bug-outline" variant="warning" trend={{ value: 3, positive: false }} />
        <StatCard title="Farm Health" value={`${dashboardStats.healthyPercentage}%`} subtitle="Overall healthy" iconName="heart-outline" variant="primary" />
      </View>

      {/* Recent Alerts */}
      <Text style={styles.sectionTitle}>Recent Alerts</Text>
      {alerts.slice(0, 3).map((alert) => (
        <View key={alert.id} style={[styles.alertCard, {
          borderLeftColor: alert.severity === 'critical' ? colors.destructive : alert.severity === 'warning' ? colors.warning : colors.primary,
        }]}>
          <Text style={styles.alertFarm}>{alert.farmName}</Text>
          <Text style={styles.alertMsg}>{alert.message}</Text>
          <Text style={styles.alertTime}>{alert.createdAt}</Text>
        </View>
      ))}

      {/* Recent Scans */}
      <Text style={styles.sectionTitle}>Recent Scans</Text>
      {recentScans.map((scan) => (
        <View key={scan.id} style={styles.scanRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.scanFarm}>{scan.farmName} — {scan.zoneName}</Text>
            <Text style={styles.scanDate}>{scan.date}</Text>
          </View>
          <SeverityBadge severity={scan.severity} size="md" />
          <Text style={styles.scanConfidence}>{scan.confidence}%</Text>
        </View>
      ))}

      {/* Farm Status */}
      <Text style={styles.sectionTitle}>Farm Status</Text>
      {farms.map((farm) => (
        <FarmHealthCard key={farm.id} farm={farm} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 32 },
  header: { marginBottom: 16 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: colors.foreground },
  pageSubtitle: { fontSize: 14, color: colors.mutedForeground, marginTop: 2 },
  controlRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20, alignItems: 'center' },
  alertBadge: {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8,
    borderWidth: 1, borderColor: colors.cardBorder, backgroundColor: colors.muted,
  },
  alertBadgeActive: { backgroundColor: colors.destructive + '15', borderColor: colors.destructive + '40' },
  alertBadgeText: { fontSize: 13, fontWeight: '500', color: colors.mutedForeground },
  statusChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8,
    borderWidth: 1, borderColor: colors.cardBorder, backgroundColor: colors.muted,
  },
  statusChipActive: { backgroundColor: colors.success + '15', borderColor: colors.success + '40' },
  statusText: { fontSize: 13, fontWeight: '500', color: colors.mutedForeground },
  scanBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10,
    backgroundColor: colors.primary,
  },
  stopBtn: { backgroundColor: colors.destructive },
  scanBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.foreground, marginBottom: 12, marginTop: 8 },
  alertCard: {
    backgroundColor: colors.card, borderRadius: 12, padding: 14,
    borderLeftWidth: 4, borderWidth: 1, borderColor: colors.cardBorder, marginBottom: 10,
  },
  alertFarm: { fontSize: 14, fontWeight: '600', color: colors.foreground },
  alertMsg: { fontSize: 13, color: colors.mutedForeground, marginTop: 4 },
  alertTime: { fontSize: 11, color: colors.mutedForeground, marginTop: 6 },
  scanRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.card, borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: colors.cardBorder, marginBottom: 8,
  },
  scanFarm: { fontSize: 13, fontWeight: '500', color: colors.foreground },
  scanDate: { fontSize: 11, color: colors.mutedForeground, marginTop: 2 },
  scanConfidence: { fontSize: 13, fontWeight: '700', color: colors.foreground },
});

export default DashboardScreen;
