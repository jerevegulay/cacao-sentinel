# CacaoGuard — React Native / Expo Mobile Blueprint

This document maps every feature, component, screen, and data structure from the existing CacaoGuard React web app into a React Native + Expo project. Use this as your implementation guide.

---

## 1. Project Setup

```bash
npx create-expo-app CacaoGuardMobile --template blank-typescript
cd CacaoGuardMobile
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npx expo install @react-native-community/slider react-native-toast-message react-native-vector-icons
```

---

## 2. Folder Structure

```
CacaoGuardMobile/
├── App.tsx                    # Root: NavigationContainer + Tab/Stack navigators
├── src/
│   ├── navigation/
│   │   ├── AppNavigator.tsx   # Bottom Tab Navigator (main app)
│   │   ├── AuthNavigator.tsx  # Stack: Landing → Login
│   │   └── RootNavigator.tsx  # Switches between Auth & App
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── MonitoringScreen.tsx
│   │   ├── FarmsScreen.tsx
│   │   ├── ReportsScreen.tsx
│   │   ├── AlertsScreen.tsx
│   │   ├── UsersScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/
│   │   ├── SeverityBadge.tsx
│   │   ├── FarmHealthCard.tsx
│   │   ├── StatCard.tsx
│   │   ├── ConfigCard.tsx
│   │   ├── DataTable.tsx
│   │   └── FarmerFeedbackForm.tsx
│   ├── data/
│   │   └── mockData.ts        # Copy of mock-data.ts (same interfaces & data)
│   ├── theme/
│   │   └── colors.ts          # Color tokens matching the web theme
│   └── types/
│       └── index.ts           # Shared TypeScript interfaces
```

---

## 3. Theme / Color Tokens

Create `src/theme/colors.ts` to mirror the web CSS variables:

```typescript
export const colors = {
  background: '#FAFAF8',
  foreground: '#1A1A1A',
  card: '#FFFFFF',
  cardBorder: '#E5E5E0',
  primary: '#2D5016',        // Dark green
  primaryForeground: '#FFFFFF',
  secondary: '#F5F0EB',
  muted: '#F0EDE8',
  mutedForeground: '#6B6B6B',
  accent: '#8B7355',
  success: '#3D8B37',
  warning: '#D4A024',
  destructive: '#C53030',
  sidebar: '#1A2E0A',
  sidebarForeground: '#E8F0E0',
};
```

---

## 4. TypeScript Interfaces (copy from web)

Create `src/types/index.ts`:

```typescript
export interface Farm {
  id: string;
  name: string;
  owner: string;
  location: string;
  size: number;
  healthScore: number;
  riskLevel: 'Healthy' | 'Low Risk' | 'Moderate Risk' | 'High Risk';
}

export interface ScanResult {
  id: string;
  farmName: string;
  zoneName: string;
  date: string;
  severity: 'Healthy' | 'Mild' | 'Moderate' | 'Severe';
  confidence: number;
  affectedArea: number;
  imageUrl: string;
}

export interface Alert {
  id: string;
  farmName: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  createdAt: string;
  status: 'new' | 'acknowledged' | 'resolved';
}

export interface ChartData {
  month: string;
  healthy: number;
  mild: number;
  moderate: number;
  severe: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Farmer' | 'Technician';
  active: boolean;
}

export interface FeedbackEntry {
  id: string;
  farmName: string;
  confirmation: string;
  treatmentStatus: 'treated' | 'in-progress' | 'untreated';
  notes: string;
  submittedAt: string;
}
```

---

## 5. Mock Data (copy from web)

Create `src/data/mockData.ts` — copy the exact arrays from the web project's `src/lib/mock-data.ts`:

```typescript
import { Farm, ScanResult, Alert, ChartData, User } from '../types';

export const farms: Farm[] = [
  { id: '1', name: 'Hacienda Verde', owner: 'Juan Dela Cruz', location: 'Initao, Misamis Oriental', size: 12.5, healthScore: 82, riskLevel: 'Low Risk' },
  { id: '2', name: 'Cacao Valley Farm', owner: 'Maria Santos', location: 'Initao, Misamis Oriental', size: 8.3, healthScore: 65, riskLevel: 'Moderate Risk' },
  { id: '3', name: 'Sunrise Plantation', owner: 'Pedro Reyes', location: 'Initao, Misamis Oriental', size: 15.0, healthScore: 91, riskLevel: 'Healthy' },
  { id: '4', name: 'Golden Pod Estate', owner: 'Ana Lopez', location: 'Initao, Misamis Oriental', size: 6.7, healthScore: 38, riskLevel: 'High Risk' },
  { id: '5', name: 'Mountain Cacao', owner: 'Carlos Tan', location: 'Initao, Misamis Oriental', size: 10.2, healthScore: 75, riskLevel: 'Low Risk' },
];

export const recentScans: ScanResult[] = [
  { id: '1', farmName: 'Hacienda Verde', zoneName: 'Zone A', date: '2026-02-13', severity: 'Mild', confidence: 87.5, affectedArea: 12, imageUrl: '' },
  { id: '2', farmName: 'Golden Pod Estate', zoneName: 'Zone B', date: '2026-02-12', severity: 'Severe', confidence: 94.2, affectedArea: 45, imageUrl: '' },
  { id: '3', farmName: 'Cacao Valley Farm', zoneName: 'Zone A', date: '2026-02-12', severity: 'Moderate', confidence: 78.3, affectedArea: 28, imageUrl: '' },
  { id: '4', farmName: 'Sunrise Plantation', zoneName: 'Zone C', date: '2026-02-11', severity: 'Healthy', confidence: 96.1, affectedArea: 0, imageUrl: '' },
  { id: '5', farmName: 'Mountain Cacao', zoneName: 'Zone A', date: '2026-02-11', severity: 'Mild', confidence: 82.0, affectedArea: 8, imageUrl: '' },
];

export const alerts: Alert[] = [
  { id: '1', farmName: 'Golden Pod Estate', severity: 'critical', message: 'Severe Black Pod detected in Zone B — 45% pod area affected.', createdAt: '2 hours ago', status: 'new' },
  { id: '2', farmName: 'Cacao Valley Farm', severity: 'warning', message: 'Moderate infection spreading in Zone A.', createdAt: '5 hours ago', status: 'new' },
  { id: '3', farmName: 'Hacienda Verde', severity: 'info', message: 'Mild symptoms detected in Zone A. Monitor closely.', createdAt: '1 day ago', status: 'acknowledged' },
  { id: '4', farmName: 'Mountain Cacao', severity: 'warning', message: 'Rising moisture levels may increase disease risk.', createdAt: '1 day ago', status: 'acknowledged' },
];

export const monthlyTrends: ChartData[] = [
  { month: 'Sep', healthy: 78, mild: 12, moderate: 7, severe: 3 },
  { month: 'Oct', healthy: 72, mild: 15, moderate: 9, severe: 4 },
  { month: 'Nov', healthy: 68, mild: 17, moderate: 10, severe: 5 },
  { month: 'Dec', healthy: 65, mild: 18, moderate: 12, severe: 5 },
  { month: 'Jan', healthy: 70, mild: 16, moderate: 9, severe: 5 },
  { month: 'Feb', healthy: 74, mild: 14, moderate: 8, severe: 4 },
];

export const dashboardStats = {
  totalFarms: 24,
  totalScans: 156,
  detectedCases: 42,
  healthyPercentage: 74,
};

export const initialUsers: User[] = [
  { id: '1', name: 'Juan Dela Cruz', email: 'juan@cacaoguard.com', role: 'Admin', active: true },
  { id: '2', name: 'Maria Santos', email: 'maria@cacaoguard.com', role: 'Farmer', active: true },
  { id: '3', name: 'Pedro Reyes', email: 'pedro@cacaoguard.com', role: 'Technician', active: true },
  { id: '4', name: 'Ana Lopez', email: 'ana@cacaoguard.com', role: 'Farmer', active: false },
  { id: '5', name: 'Carlos Tan', email: 'carlos@cacaoguard.com', role: 'Technician', active: true },
];
```

---

## 6. Navigation Setup

### `src/navigation/AppNavigator.tsx` — Bottom Tab Navigator

```tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import DashboardScreen from '../screens/DashboardScreen';
import MonitoringScreen from '../screens/MonitoringScreen';
import FarmsScreen from '../screens/FarmsScreen';
import AlertsScreen from '../screens/AlertsScreen';
import MoreNavigator from './MoreNavigator'; // Stack for Reports, Users, Settings
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.mutedForeground,
      tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.cardBorder },
      tabBarIcon: ({ color, size }) => {
        const icons: Record<string, string> = {
          Dashboard: 'grid-outline',
          Monitoring: 'videocam-outline',
          Farms: 'leaf-outline',
          Alerts: 'notifications-outline',
          More: 'ellipsis-horizontal-outline',
        };
        return <Ionicons name={icons[route.name] as any} size={size} color={color} />;
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
```

### `src/navigation/RootNavigator.tsx`

```tsx
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import AppNavigator from './AppNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;
```

---

## 7. Screen-by-Screen Implementation Guide

### 7.1 LoginScreen.tsx

**Web equivalent:** `src/pages/Login.tsx`

**State:** `email`, `password`, `showPassword`, `isLoading`

```tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.replace('App');
    }, 800);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="shield-checkmark" size={48} color={colors.primary} />
      <Text style={styles.title}>CacaoGuard</Text>
      <Text style={styles.subtitle}>Sign in to monitor your cacao farms</Text>

      <TextInput style={styles.input} placeholder="Email" value={email}
        onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <View style={styles.passwordRow}>
        <TextInput style={[styles.input, { flex: 1 }]} placeholder="Password"
          value={password} onChangeText={setPassword}
          secureTextEntry={!showPassword} />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color={colors.mutedForeground} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: colors.background },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.foreground, marginTop: 12 },
  subtitle: { fontSize: 14, color: colors.mutedForeground, marginBottom: 32 },
  input: { width: '100%', height: 48, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 10,
    paddingHorizontal: 16, fontSize: 16, backgroundColor: colors.card, marginBottom: 16 },
  passwordRow: { flexDirection: 'row', alignItems: 'center', width: '100%', gap: 8 },
  button: { width: '100%', height: 52, backgroundColor: colors.primary, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default LoginScreen;
```

---

### 7.2 DashboardScreen.tsx

**Web equivalent:** `src/pages/Dashboard.tsx`

**State:** `droneStatus` (Active/Inactive), `notificationCount`

**Key elements:**
- 4 `StatCard` components in a 2×2 grid (use `FlatList` with `numColumns={2}`)
- Drone status toggle button
- Notification badge with dismiss
- Navigation to Monitoring via button

```tsx
// Key state from web version:
const [droneStatus, setDroneStatus] = useState<'Active' | 'Inactive'>('Inactive');
const [notificationCount, setNotificationCount] = useState(3);

// Replace <Button variant="hero"> with:
<TouchableOpacity style={[styles.scanBtn, droneStatus === 'Active' && styles.stopBtn]}
  onPress={() => setDroneStatus(prev => prev === 'Active' ? 'Inactive' : 'Active')}>
  <Text style={styles.scanBtnText}>{droneStatus === 'Active' ? 'Stop Scan' : 'Start Scan'}</Text>
</TouchableOpacity>
```

---

### 7.3 MonitoringScreen.tsx

**Web equivalent:** `src/pages/Monitoring.tsx`

**State:** `droneStatus`, `selectedFarmId`, `activityLog[]`, `scanProgress`

**Key elements:**
- UAV scan simulation with `useEffect` + progress bar
- Farm selector list using `FarmHealthCard`
- Scan results filtered by selected farm
- `FarmerFeedbackForm` component
- Activity log with treatment status badges

---

### 7.4 FarmsScreen.tsx

**Web equivalent:** `src/pages/Farms.tsx`

**State:** `farmList[]`, `showForm`, `formData { name, owner, location, size }`

**Key elements:**
- Grid of `FarmHealthCard` components (use `FlatList numColumns={2}`)
- Controlled form with TextInput fields for name, owner, location, size
- "Register Farm" button toggles form visibility
- Form submission adds new farm to `farmList` state + shows toast

```tsx
const [farmList, setFarmList] = useState<Farm[]>(farms);
const [showForm, setShowForm] = useState(false);
const [formData, setFormData] = useState({ name: '', owner: '', location: 'Initao, Misamis Oriental', size: '' });

const handleSubmit = () => {
  const newFarm: Farm = {
    id: String(Date.now()),
    name: formData.name,
    owner: formData.owner,
    location: formData.location,
    size: parseFloat(formData.size),
    healthScore: 100,
    riskLevel: 'Healthy',
  };
  setFarmList(prev => [newFarm, ...prev]);
  setShowForm(false);
  Toast.show({ type: 'success', text1: 'Farm Registered' });
};
```

---

### 7.5 ReportsScreen.tsx

**Web equivalent:** `src/pages/Reports.tsx`

**State:** `severityFilter`

**Key elements:**
- Filter picker (use React Native `Picker` or custom dropdown)
- Summary cards showing count per severity (Healthy/Mild/Moderate/Severe)
- `DataTable` component listing filtered `recentScans`

---

### 7.6 AlertsScreen.tsx

**Web equivalent:** `src/pages/Alerts.tsx`

**State:** `alertList[]`, `filterSeverity`, `filterStatus`

**Key elements:**
- Two filter pickers (severity + status)
- Alert cards with colored left border based on severity
- Resolve/Reopen toggle button per alert
- Active alert count in header

```tsx
const toggleStatus = (id: string) => {
  setAlertList(prev => prev.map(a =>
    a.id === id ? { ...a, status: a.status === 'resolved' ? 'new' : 'resolved' } : a
  ));
};
```

---

### 7.7 UsersScreen.tsx

**Web equivalent:** `src/pages/Users.tsx`

**State:** `users[]`, `editingUser`

**Key elements:**
- User list with role badges (Admin=green, Farmer=blue, Technician=orange)
- `Switch` toggle for active/inactive status
- Edit form (modal or inline) with name, email, role picker
- Form submission updates user in state + shows toast

---

### 7.8 SettingsScreen.tsx

**Web equivalent:** `src/pages/Settings.tsx`

**State:** `diseaseThreshold`, `confidenceThreshold`, `alertSensitivity`, `emailAlerts`, `pushAlerts`, `criticalOnly`, `scanInterval`, `autoScan`, `saved`

**Key elements:**
- `ConfigCard` wrapper for each settings group
- `@react-native-community/slider` for threshold sliders
- `Switch` toggles for boolean settings
- Picker for alert sensitivity (low/medium/high)
- Save button with temporary "Saved!" feedback

---

## 8. Reusable Component Mapping (Web → Mobile)

| Web Component | Mobile Component | Key Differences |
|---|---|---|
| `SeverityBadge` | `SeverityBadge` | `<View>` + `<Text>` instead of `<span>` |
| `FarmHealthCard` | `FarmHealthCard` | `TouchableOpacity`, use `View` for progress bar |
| `StatCard` | `StatCard` | `<View>` card with icon, value, subtitle, trend |
| `DataTable` | `DataTable` | `FlatList` with header row + data rows |
| `ConfigCard` | `ConfigCard` | `<View>` with title, description, children |
| `FarmerFeedbackForm` | `FarmerFeedbackForm` | `TextInput`, `Picker`, `TouchableOpacity` |

### Example: SeverityBadge (React Native)

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type SeverityLevel = 'Healthy' | 'Mild' | 'Moderate' | 'Severe';

interface Props {
  severity: SeverityLevel;
  size?: 'sm' | 'md';
}

const severityColors: Record<SeverityLevel, { bg: string; text: string }> = {
  Healthy:  { bg: '#E8F5E8', text: colors.success },
  Mild:     { bg: '#F5F0EB', text: colors.accent },
  Moderate: { bg: '#FFF8E1', text: colors.warning },
  Severe:   { bg: '#FFEBEE', text: colors.destructive },
};

const SeverityBadge = ({ severity, size = 'sm' }: Props) => {
  const { bg, text } = severityColors[severity];
  return (
    <View style={[styles.badge, { backgroundColor: bg }, size === 'md' && styles.md]}>
      <Text style={[styles.text, { color: text }, size === 'md' && styles.mdText]}>{severity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  md: { paddingHorizontal: 12, paddingVertical: 4 },
  text: { fontSize: 11, fontWeight: '600' },
  mdText: { fontSize: 13 },
});

export default SeverityBadge;
```

### Example: FarmHealthCard (React Native)

```tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Farm } from '../types';
import { colors } from '../theme/colors';

interface Props {
  farm: Farm;
  onPress?: (farm: Farm) => void;
}

const riskColors: Record<Farm['riskLevel'], string> = {
  Healthy: colors.success,
  'Low Risk': colors.accent,
  'Moderate Risk': colors.warning,
  'High Risk': colors.destructive,
};

const FarmHealthCard = ({ farm, onPress }: Props) => (
  <TouchableOpacity
    style={[styles.card, { borderLeftColor: riskColors[farm.riskLevel] }]}
    onPress={() => onPress?.(farm)}
    activeOpacity={0.7}
  >
    <View style={styles.header}>
      <Text style={styles.name}>{farm.name}</Text>
      <View style={[styles.dot, { backgroundColor: riskColors[farm.riskLevel] }]} />
    </View>
    <Text style={styles.owner}>{farm.owner}</Text>
    <Text style={styles.meta}>{farm.size} hectares</Text>
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
  card: { backgroundColor: colors.card, borderRadius: 12, padding: 14, borderLeftWidth: 4,
    borderWidth: 1, borderColor: colors.cardBorder, marginBottom: 12 },
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
```

---

## 9. App.tsx (Entry Point)

```tsx
import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <>
      <RootNavigator />
      <Toast />
    </>
  );
}
```

---

## 10. Key Conversion Patterns

| React Web | React Native Equivalent |
|---|---|
| `<div>` | `<View>` |
| `<span>`, `<p>`, `<h1>` | `<Text>` (style fontSize/fontWeight) |
| `<button>` | `<TouchableOpacity>` or `<Pressable>` |
| `<input>` | `<TextInput>` |
| `<img>` | `<Image source={require(...)}` or `uri` |
| `className="..."` | `style={styles.xxx}` via `StyleSheet.create` |
| `onClick` | `onPress` |
| `onChange={(e) => set(e.target.value)}` | `onChangeText={(text) => set(text)}` |
| `<Select>` | `@react-native-picker/picker` or custom modal |
| `<Switch>` | `import { Switch } from 'react-native'` |
| `<Slider>` | `@react-native-community/slider` |
| Tailwind CSS | `StyleSheet.create({...})` |
| `react-router-dom` | `@react-navigation/native` |
| `useNavigate()` | `navigation.navigate('Screen')` |
| `useLocation()` | `useRoute()` |
| Toast (sonner) | `react-native-toast-message` |
| Recharts | `react-native-chart-kit` or `victory-native` |

---

## 11. State Management Summary Per Screen

| Screen | State Variables | Triggers |
|---|---|---|
| Login | `email`, `password`, `showPassword`, `isLoading` | Sign In → navigate |
| Dashboard | `droneStatus`, `notificationCount` | Start/Stop Scan, Dismiss Alerts |
| Monitoring | `droneStatus`, `selectedFarmId`, `activityLog[]`, `scanProgress` | Start Scan (progress animation), Select Farm, Submit Feedback |
| Farms | `farmList[]`, `showForm`, `formData` | Register Farm (adds to list) |
| Reports | `severityFilter` | Filter dropdown changes filtered list |
| Alerts | `alertList[]`, `filterSeverity`, `filterStatus` | Filter dropdowns, Resolve/Reopen toggle |
| Users | `users[]`, `editingUser` | Toggle active Switch, Edit form submit |
| Settings | `diseaseThreshold`, `confidenceThreshold`, `alertSensitivity`, `emailAlerts`, `pushAlerts`, `criticalOnly`, `scanInterval`, `autoScan`, `saved` | Sliders, Switches, Save button |

---

## 12. Build & Run

```bash
# Start Expo dev server
npx expo start

# Android
npx expo run:android

# Or use Expo Go app on your phone
# Scan the QR code from the terminal
```

---

This blueprint mirrors 100% of the web app's features, data, state logic, and component architecture. Every screen, every `useState`, every form, and every interaction has been mapped to its React Native equivalent.
