import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

const severityColors = {
  Healthy:  { bg: '#E8F5E8', text: colors.success },
  Mild:     { bg: '#F5F0EB', text: colors.accent },
  Moderate: { bg: '#FFF8E1', text: colors.warning },
  Severe:   { bg: '#FFEBEE', text: colors.destructive },
};

const SeverityBadge = ({ severity, size = 'sm' }) => {
  const { bg, text } = severityColors[severity] || severityColors.Healthy;
  return (
    <View style={[styles.badge, { backgroundColor: bg }, size === 'md' && styles.md]}>
      <Text style={[styles.text, { color: text }, size === 'md' && styles.mdText]}>{severity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999, alignSelf: 'flex-start' },
  md: { paddingHorizontal: 12, paddingVertical: 4 },
  text: { fontSize: 11, fontWeight: '600' },
  mdText: { fontSize: 13 },
});

export default SeverityBadge;
