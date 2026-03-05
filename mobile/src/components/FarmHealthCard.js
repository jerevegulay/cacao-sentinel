import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const riskColors = {
  Healthy: colors.success,
  'Low Risk': colors.accent,
  'Moderate Risk': colors.warning,
  'High Risk': colors.destructive,
};

const FarmHealthCard = ({ farm, onPress }) => (
  <TouchableOpacity
    style={[styles.card, { borderLeftColor: riskColors[farm.riskLevel] || colors.muted }]}
    onPress={() => onPress && onPress(farm)}
    activeOpacity={0.7}
  >
    <View style={styles.header}>
      <Text style={styles.name}>{farm.name}</Text>
      <View style={[styles.dot, { backgroundColor: riskColors[farm.riskLevel] }]} />
    </View>
    <Text style={styles.owner}>{farm.owner}</Text>
    <Text style={styles.meta}>{farm.size} hectares • {farm.location}</Text>
    <View style={styles.footer}>
      <Text style={styles.risk}>{farm.riskLevel}</Text>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${farm.healthScore}%`, backgroundColor: riskColors[farm.riskLevel] }]} />
      </View>
      <Text style={styles.score}>{farm.healthScore}%</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 12,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 14, fontWeight: '600', color: colors.foreground },
  dot: { width: 10, height: 10, borderRadius: 5 },
  owner: { fontSize: 12, color: colors.mutedForeground, marginTop: 2 },
  meta: { fontSize: 11, color: colors.mutedForeground, marginTop: 4 },
  footer: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
  risk: { fontSize: 11, color: colors.mutedForeground, fontWeight: '500' },
  barContainer: { flex: 1, height: 6, backgroundColor: colors.muted, borderRadius: 3, overflow: 'hidden' },
  bar: { height: '100%', borderRadius: 3 },
  score: { fontSize: 12, fontWeight: '700', color: colors.foreground },
});

export default FarmHealthCard;
