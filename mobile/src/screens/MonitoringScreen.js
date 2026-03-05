import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SeverityBadge from '../components/SeverityBadge';
import FarmHealthCard from '../components/FarmHealthCard';
import FarmerFeedbackForm from '../components/FarmerFeedbackForm';
import { farms, recentScans } from '../data/mockData';
import { colors } from '../theme/colors';

const MonitoringScreen = () => {
  const [droneStatus, setDroneStatus] = useState('Inactive');
  const [selectedFarmId, setSelectedFarmId] = useState(null);
  const [activityLog, setActivityLog] = useState([]);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (droneStatus === 'Active') {
      setScanProgress(0);
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setDroneStatus('Inactive');
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [droneStatus]);

  const handleFeedbackSubmit = (entry) => {
    setActivityLog((prev) => [entry, ...prev]);
  };

  const selectedFarm = farms.find((f) => f.id === selectedFarmId);
  const filteredScans = recentScans.filter(
    (s) => !selectedFarm || s.farmName === selectedFarm.name
  );

  const treatmentColor = {
    untreated: colors.destructive,
    'in-progress': colors.warning,
    treated: colors.success,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Monitoring</Text>
        <Text style={styles.pageSubtitle}>Live UAV feed & farm monitoring</Text>
      </View>

      {/* Drone Controls */}
      <View style={styles.controlRow}>
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
          onPress={() => setDroneStatus(droneStatus === 'Active' ? 'Inactive' : 'Active')}
        >
          <Ionicons name="camera-outline" size={18} color="#fff" />
          <Text style={styles.scanBtnText}>
            {droneStatus === 'Active' ? 'Stop Scan' : 'Start Scan'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* UAV Feed Simulation */}
      <View style={styles.feedCard}>
        {droneStatus === 'Active' ? (
          <View style={styles.feedActive}>
            <Ionicons name="radio" size={48} color={colors.success} />
            <Text style={styles.feedTitle}>UAV Scan In Progress</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${scanProgress}%` }]} />
            </View>
            <Text style={styles.progressText}>{scanProgress}% complete</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
        ) : (
          <View style={styles.feedInactive}>
            <Ionicons name="camera-outline" size={48} color={colors.mutedForeground} />
            <Text style={styles.feedInactiveTitle}>No Active Feed</Text>
            <Text style={styles.feedInactiveSubtitle}>Press "Start Scan" to begin UAV monitoring</Text>
          </View>
        )}
      </View>

      {/* Farm Selector */}
      <Text style={styles.sectionTitle}>Select Farm</Text>
      {farms.map((farm) => (
        <FarmHealthCard
          key={farm.id}
          farm={farm}
          onPress={(f) => setSelectedFarmId(f.id === selectedFarmId ? null : f.id)}
        />
      ))}

      {/* Scan Results */}
      <Text style={styles.sectionTitle}>
        {selectedFarm ? `Scans — ${selectedFarm.name}` : 'Recent Scan Results'}
      </Text>
      {filteredScans.length === 0 ? (
        <Text style={styles.emptyText}>No scans found for this farm.</Text>
      ) : (
        filteredScans.map((scan) => (
          <View key={scan.id} style={styles.scanRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.scanFarm}>{scan.farmName} — {scan.zoneName}</Text>
              <Text style={styles.scanDate}>{scan.date}</Text>
            </View>
            <SeverityBadge severity={scan.severity} size="md" />
            <Text style={styles.scanConfidence}>{scan.confidence}%</Text>
          </View>
        ))
      )}

      {/* Feedback Form */}
      <View style={{ marginTop: 16 }}>
        <FarmerFeedbackForm onSubmit={handleFeedbackSubmit} />
      </View>

      {/* Activity Log */}
      {activityLog.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <Text style={styles.sectionTitle}>Activity Log</Text>
          {activityLog.map((entry) => (
            <View key={entry.id} style={styles.logRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.logFarm}>{entry.farmName}</Text>
                <Text style={styles.logMeta}>{entry.submittedAt} — {entry.confirmation}</Text>
                {entry.notes ? <Text style={styles.logNotes}>"{entry.notes}"</Text> : null}
              </View>
              <View style={[styles.treatmentBadge, { backgroundColor: treatmentColor[entry.treatmentStatus] + '20' }]}>
                <Text style={[styles.treatmentText, { color: treatmentColor[entry.treatmentStatus] }]}>
                  {entry.treatmentStatus}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 32 },
  header: { marginBottom: 16 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: colors.foreground },
  pageSubtitle: { fontSize: 14, color: colors.mutedForeground, marginTop: 2 },
  controlRow: { flexDirection: 'row', gap: 8, marginBottom: 16, alignItems: 'center' },
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
  feedCard: {
    backgroundColor: colors.card, borderRadius: 12, borderWidth: 1,
    borderColor: colors.cardBorder, overflow: 'hidden', marginBottom: 20,
    minHeight: 200, justifyContent: 'center',
  },
  feedActive: { alignItems: 'center', padding: 30, gap: 10 },
  feedTitle: { fontSize: 16, fontWeight: '600', color: colors.foreground },
  progressBar: { width: '70%', height: 8, backgroundColor: colors.muted, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: colors.success, borderRadius: 4 },
  progressText: { fontSize: 13, color: colors.mutedForeground },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, position: 'absolute', top: 12, right: 12 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success },
  liveText: { fontSize: 11, fontWeight: '600', color: colors.success },
  feedInactive: { alignItems: 'center', padding: 40, gap: 8 },
  feedInactiveTitle: { fontSize: 16, fontWeight: '500', color: colors.mutedForeground },
  feedInactiveSubtitle: { fontSize: 13, color: colors.mutedForeground },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.foreground, marginBottom: 12, marginTop: 8 },
  emptyText: { fontSize: 14, color: colors.mutedForeground, textAlign: 'center', paddingVertical: 20 },
  scanRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.card, borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: colors.cardBorder, marginBottom: 8,
  },
  scanFarm: { fontSize: 13, fontWeight: '500', color: colors.foreground },
  scanDate: { fontSize: 11, color: colors.mutedForeground, marginTop: 2 },
  scanConfidence: { fontSize: 13, fontWeight: '700', color: colors.foreground },
  logRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.card, borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: colors.cardBorder, marginBottom: 8,
  },
  logFarm: { fontSize: 13, fontWeight: '500', color: colors.foreground },
  logMeta: { fontSize: 11, color: colors.mutedForeground, marginTop: 2 },
  logNotes: { fontSize: 11, color: colors.mutedForeground, fontStyle: 'italic', marginTop: 2 },
  treatmentBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  treatmentText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
});

export default MonitoringScreen;
