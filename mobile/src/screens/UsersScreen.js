import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { initialUsers } from '../data/mockData';
import { colors } from '../theme/colors';

const roleBadge = {
  Admin: { bg: colors.primary + '20', text: colors.primary },
  Farmer: { bg: colors.success + '20', text: colors.success },
  Technician: { bg: colors.warning + '20', text: colors.warning },
};

const roleOptions = ['Admin', 'Farmer', 'Technician'];

const UsersScreen = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);

  const toggleActive = (id) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u))
    );
  };

  const handleEditSubmit = () => {
    if (!editingUser) return;
    setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? editingUser : u)));
    Toast.show({ type: 'success', text1: 'User Updated', text2: `${editingUser.name}'s profile has been saved.` });
    setEditingUser(null);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Users</Text>
        <Text style={styles.pageSubtitle}>{users.filter((u) => u.active).length} active users</Text>
      </View>

      {/* Edit Form */}
      {editingUser && (
        <View style={styles.editCard}>
          <View style={styles.editHeader}>
            <View style={styles.editTitleRow}>
              <Ionicons name="pencil" size={18} color={colors.primary} />
              <Text style={styles.editTitle}>Edit User</Text>
            </View>
            <TouchableOpacity onPress={() => setEditingUser(null)}>
              <Ionicons name="close" size={24} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={editingUser.name}
            onChangeText={(t) => setEditingUser({ ...editingUser, name: t })}
            placeholderTextColor={colors.mutedForeground}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={editingUser.email}
            onChangeText={(t) => setEditingUser({ ...editingUser, email: t })}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.mutedForeground}
          />

          <Text style={styles.label}>Role</Text>
          <View style={styles.roleRow}>
            {roleOptions.map((role) => (
              <TouchableOpacity
                key={role}
                style={[styles.roleChip, editingUser.role === role && { backgroundColor: roleBadge[role].bg, borderColor: roleBadge[role].text }]}
                onPress={() => setEditingUser({ ...editingUser, role })}
              >
                <Text style={[styles.roleChipText, editingUser.role === role && { color: roleBadge[role].text, fontWeight: '600' }]}>
                  {role}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={handleEditSubmit}>
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* User List */}
      {users.map((user) => {
        const badge = roleBadge[user.role];
        return (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                <Text style={[styles.badgeText, { color: badge.text }]}>{user.role}</Text>
              </View>
            </View>
            <View style={styles.userActions}>
              <Switch
                value={user.active}
                onValueChange={() => toggleActive(user.id)}
                trackColor={{ false: colors.muted, true: colors.primary + '40' }}
                thumbColor={user.active ? colors.primary : colors.mutedForeground}
              />
              <TouchableOpacity onPress={() => setEditingUser({ ...user })}>
                <Ionicons name="pencil" size={20} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 32 },
  header: { marginBottom: 20 },
  pageTitle: { fontSize: 24, fontWeight: '700', color: colors.foreground },
  pageSubtitle: { fontSize: 14, color: colors.mutedForeground, marginTop: 2 },
  editCard: {
    backgroundColor: colors.card, borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: colors.cardBorder, marginBottom: 20,
  },
  editHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  editTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  editTitle: { fontSize: 16, fontWeight: '600', color: colors.foreground },
  label: { fontSize: 13, fontWeight: '500', color: colors.foreground, marginBottom: 6, marginTop: 12 },
  input: {
    height: 44, borderWidth: 1, borderColor: colors.cardBorder, borderRadius: 10,
    paddingHorizontal: 14, fontSize: 14, backgroundColor: colors.background, color: colors.foreground,
  },
  roleRow: { flexDirection: 'row', gap: 8 },
  roleChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8,
    borderWidth: 1, borderColor: colors.cardBorder, backgroundColor: colors.background,
  },
  roleChipText: { fontSize: 13, color: colors.mutedForeground },
  saveBtn: {
    backgroundColor: colors.primary, borderRadius: 10, height: 48,
    alignItems: 'center', justifyContent: 'center', marginTop: 20,
  },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  userCard: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.card, borderRadius: 12, padding: 14,
    borderWidth: 1, borderColor: colors.cardBorder, marginBottom: 10,
  },
  userInfo: { flex: 1 },
  userName: { fontSize: 14, fontWeight: '600', color: colors.foreground },
  userEmail: { fontSize: 12, color: colors.mutedForeground, marginTop: 2 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 999, marginTop: 6 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  userActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
});

export default UsersScreen;
