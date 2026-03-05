import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const menuItems = [
  { name: 'Reports', icon: 'bar-chart-outline', description: 'Disease detection reports' },
  { name: 'Users', icon: 'people-outline', description: 'Manage user accounts' },
  { name: 'Settings', icon: 'settings-outline', description: 'System configuration' },
];

const MoreMenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.menuItem}
          onPress={() => navigation.navigate(item.name)}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={24} color={colors.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.foreground,
  },
  description: {
    fontSize: 13,
    color: colors.mutedForeground,
    marginTop: 2,
  },
});

export default MoreMenuScreen;
