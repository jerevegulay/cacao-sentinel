import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const variantColors = {
  default: colors.foreground,
  warning: colors.warning,
  primary: colors.primary,
};

const StatCard = ({ title, value, subtitle, iconName, variant = 'default', trend }) => {
  const iconColor = variantColors[variant] || colors.foreground;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: iconColor + '15' }]}>
          <Ionicons name={iconName} size={20} color={iconColor} />
        </View>
        {trend && (
          <View style={[styles.trendBadge, { backgroundColor: trend.positive ? '#E8F5E8' : '#FFEBEE' }]}>
            <Ionicons
              name={trend.positive ? 'arrow-up' : 'arrow-down'}
              size={12}
              color={trend.positive ? colors.success : colors.destructive}
            />
            <Text style={[styles.trendText, { color: trend.positive ? colors.success : colors.destructive }]}>
              {trend.value}%
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    flex: 1,
    minWidth: '45%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    gap: 2,
  },
  trendText: { fontSize: 11, fontWeight: '600' },
  value: { fontSize: 24, fontWeight: '700', color: colors.foreground },
  title: { fontSize: 13, fontWeight: '600', color: colors.foreground, marginTop: 2 },
  subtitle: { fontSize: 11, color: colors.mutedForeground, marginTop: 2 },
});

export default StatCard;
