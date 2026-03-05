import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { alerts as initialAlerts } from '../data/mockData';
import { colors } from '../theme/colors';

const severityStyle = {
  critical: { border: colors.destructive, bg: colors.destructive + '10', icon: colors.destructive },
  warning: { border: colors.warning, bg: colors.warning + '10', icon: colors.warning },
  info: { border: colors.primary, bg: colors.primary + '10', icon: colors.primary },
};

const filterOptions = {
  severity: ['all', 'critical', 'warning', 'info'],
  status: ['all', 'new', 'acknowledged', 'resolved'],
};

const AlertsScreen = () => {
  const [alertList, setAlertList] = useState(initialAlerts);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const toggleStatus = (id) => {
    setAlertList((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: a.status === 'resolved' ? 'new' : 'resolved' }
          : a
      )
    );
  };

  const filtered = alertList
    .filter((a) => filterSeverity === 'all' || a.severity === filterSeverity)
    .filter((a) => filterStatus === 'all' || a.status === filterStatus);

  const activeCount = alertList.filter((a) => a.status !== 'resolved').length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Alerts</Text>
        <Text style={styles.pageSubtitle}>{activeCount} active alerts</Text>
      </View>

      {/* Severity Filter */}
      <Text style={styles.filterLabel}>Severity</Text>
      <View style={styles.filterRow}>
        {filterOptions.severity.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.filterChip, filterSeverity === opt && styles.filterChipActive]}
            onPress={() => setFilterSeverity(opt)}
          >
            <Text style={[styles.filterText, filterSeverity === opt && styles.filterTextActive]}>
              {opt === 'all' ? 'All' : opt.charAt(0).toUpperCase() + opt.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Status Filter */}
      <Text style={styles.filterLabel}>Status</Text>
      <View style={styles.filterRow}>
        {filterOptions.status.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[styles.filterChip, filterStatus === opt && styles.filterChipActive]}
            onPress={() => setFilterStatus(opt)}
          >
            <Text style={[styles.filterText, filterStatus === opt && styles.filterTextActive]}>
              {opt === 'all' ? 'All' : opt.charAt(0).toUpperCase() + opt.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Alert List */}
      {filtered.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off-outline" size={48} color={colors.mutedForeground} />
          <Text style={styles.emptyText}>No alerts match your filters.</Text>
        </View>
      ) : (
        filtered.map((alert) => {
          const style = severityStyle[alert.severity];
          const isResolved = alert.status === 'resolved';
          return (
            <View
              key={alert.id}
              style={[
                styles.alertCard,
                { borderLeftColor: style.border },
                isResolved && styles.alertResolved,
                !isResolved && { backgroundColor: style.bg },
              ]}
            >
              <View style={styles.alertContent}>
                <Ionicons
                  name={alert.severity === 'info' ? 'information-circle' : 'alert-circle'}
                  size={20}
                  color={isResolved ? colors.mutedForeground : style.icon}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.alertFarm}>{alert.farmName}</Text>
                  <Text style={styles.alertMsg}>{alert.message}</Text>
                  <Text style={styles.alertTime}>{alert.createdAt}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.resolveBtn, isResolved && styles.reopenBtn]}
                onPress={() => toggleStatus(alert.id)}
              >
                <Ionicons name="checkmark-circle" size={16} color={isResolved ? colors.mutedForeground : '#fff'} />
                <Text style={[styles.resolveBtnText, isResolved && { color: colors.mutedForeground }]}>
                  {isResolved ? 'Reopen' : 'Resolve'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })
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
  filterLabel: { fontSize: 13, fontWeight: '500', color: colors.mutedForeground, marginBottom: 6, marginTop: 8 },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8,
    borderWidth: 1, borderColor: colors.cardBorder, backgroundColor: colors.card,
  },
  filterChipActive: { backgroundColor: colors.primary + '15', borderColor: colors.primary },
  filterText: { fontSize: 13, color: colors.mutedForeground },
  filterTextActive: { color: colors.primary, fontWeight: '600' },
  emptyContainer: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyText: { fontSize: 14, color: colors.mutedForeground },
  alertCard: {
    borderRadius: 12, padding: 14, borderLeftWidth: 4,
    borderWidth: 1, borderColor: colors.cardBorder, marginBottom: 10,
  },
  alertResolved: { opacity: 0.6, backgroundColor: colors.muted },
  alertContent: { flexDirection: 'row', gap: 10 },
  alertFarm: { fontSize: 14, fontWeight: '600', color: colors.foreground },
  alertMsg: { fontSize: 13, color: colors.mutedForeground, marginTop: 4 },
  alertTime: { fontSize: 11, color: colors.mutedForeground, marginTop: 6 },
  resolveBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: colors.primary, borderRadius: 8,
    paddingVertical: 8, marginTop: 12,
  },
  reopenBtn: { backgroundColor: colors.muted, borderWidth: 1, borderColor: colors.cardBorder },
  resolveBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});

export default AlertsScreen;
