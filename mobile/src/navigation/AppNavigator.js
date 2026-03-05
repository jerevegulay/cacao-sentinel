import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import MonitoringScreen from '../screens/MonitoringScreen';
import FarmsScreen from '../screens/FarmsScreen';
import AlertsScreen from '../screens/AlertsScreen';
import MoreNavigator from './MoreNavigator';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.mutedForeground,
      tabBarStyle: {
        backgroundColor: colors.card,
        borderTopColor: colors.cardBorder,
        height: 60,
        paddingBottom: 8,
        paddingTop: 4,
      },
      tabBarIcon: ({ color, size }) => {
        const icons = {
          Dashboard: 'grid-outline',
          Monitoring: 'videocam-outline',
          Farms: 'leaf-outline',
          Alerts: 'notifications-outline',
          More: 'ellipsis-horizontal-outline',
        };
        return <Ionicons name={icons[route.name]} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Monitoring" component={MonitoringScreen} />
    <Tab.Screen name="Farms" component={FarmsScreen} />
    <Tab.Screen name="Alerts" component={AlertsScreen} />
    <Tab.Screen name="More" component={MoreNavigator} />
  </Tab.Navigator>
);

export default AppNavigator;
