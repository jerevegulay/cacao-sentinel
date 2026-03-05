import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import SeverityBadge from '../components/SeverityBadge';
import { recentScans } from '../data/mockData';
import { colors } from '../theme/colors';

const severityLevels = ['all', 'Healthy', 'Mild', 'Moderate', 'Severe'];

const ReportsScreen = () => {
  const [severityFilter, setSeverityFilter] = useState('all');

  const filtered = severityFilter === 'all'
    ? recentScans
    : recentScans.filter((s) => s.severity === severityFilter);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Filter */}
      <View style={styles.filterRow}>
        {severityLevels.map((level) => (
          <TouchableOpacity
            key={level}
            style={[styles.filterChip, severityFilter === level && styles.filterChipActive]}
            onPress={() => setSeverityFilter(level)}
          >
            <Text style={[styles.filterText, severityFilter === level && styles.filterTextActive]}>
              {level === 'all' ? 'All' : level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        {['Healthy', 'Mild', 'Moderate', 'Severe'].map((level) => {
          const count = recentScans.filter((s) => s.severity === level).length;
          return (
            <View key={level} style={styles.summaryCard}>
              <SeverityBadge severity={level} size="md" />
              <Text style={styles.summaryCount}>{count}</Text>
              <Text style={styles.summaryLabel}>scans</Text>
            </View>
          );
        })}
      </View>

      {/* Data List */}
      {filtered.length === 0 ? (
        <Text style={styles.emptyText}>No reports match the selected filter.</Text>
      ) : (
        filtered.map((scan) => (
          <View key={scan.id} style={styles.reportCard}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportFarm}>{scan.farmName}</Text>
              <SeverityBadge severity={scan.severity} size="sm" />
            </View>
            <Text style={styles.reportMeta}>
              {scan.zoneName} • {scan.date}
            </Text>
            <View style={styles.reportStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Confidence</Text>
                <View style={styles.confidenceBar}>
                  <View style={[styles.confidenceFill, { width: `${scan.confidence}%` }]} />
                </View>
                <Text style={styles.statValue}>{scan.confidence}%</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Affected Area</Text>
                <Text style={styles.statValue}>{scan.affectedArea}%</Text>
              </View>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 32 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8,
    borderWidth: 1, borderColor: colors.cardBorder, backgroundColor: colors.card,
  },
  filterChipActive: { backgroundColor: colors.primary + '15', borderColor: colors.primary },
  filterText: { fontSize: 13, color: colors.mutedForeground },
  filterTextActive: { color: colors.primary, fontWeight: '600' },
  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  summaryCard: {
    flex: 1, backgroundColor: colors.card, borderRadius: 12, padding: 12,
    borderWidth: 1, borderColor: colors.cardBorder, alignItems: 'center',
  },
  summaryCount: { fontSize: 20, fontWeight: '700', color: colors.foreground, marginTop: 6 },
  summaryLabel: { fontSize: 11, color: colors.mutedForeground },
  emptyText: { fontSize: 14, color: colors.mutedForeground, textAlign: 'center', paddingVertical: 40 },
  reportCard: {
    backgroundColor: colors.card, borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: colors.cardBorder, marginBottom: 10,
  },
  reportHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  reportFarm: { fontSize: 14, fontWeight: '600', color: colors.foreground },
  reportMeta: { fontSize: 12, color: colors.mutedForeground, marginTop: 4 },
  reportStats: { flexDirection: 'row', gap: 16, marginTop: 10 },
  statItem: { flex: 1 },
  statLabel: { fontSize: 11, color: colors.mutedForeground, marginBottom: 4 },
  statValue: { fontSize: 13, fontWeight: '600', color: colors.foreground },
  confidenceBar: { height: 4, backgroundColor: colors.muted, borderRadius: 2, overflow: 'hidden', marginBottom: 4 },
  confidenceFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2 },
});

export default ReportsScreen;
