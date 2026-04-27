import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { colors, theme } from '../theme/colors';
import { Card, Heading, Paragraph } from '../components/UIComponents';
import { rolePages } from '../data/staticContent';

export default function RolesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Heading level={2} style={styles.headerTitle}>
            Roles
          </Heading>
          <Paragraph style={styles.headerSubtitle}>
            PAM from different perspectives
          </Paragraph>
        </View>

        {rolePages.map(role => (
          <Card
            key={role.id}
            onPress={() =>
              navigation.navigate('RoleDetail', { roleId: role.id })
            }
          >
            <View style={styles.roleHeader}>
              <Text style={styles.roleIcon}>{role.icon}</Text>
              <Heading level={3} style={styles.roleTitle}>
                {role.title}
              </Heading>
            </View>

            <Paragraph numberOfLines={2} style={styles.roleDescription}>
              {role.whatItMeans}
            </Paragraph>

            <Text style={styles.tapMore}>
              View {role.title.toLowerCase()}'s perspective →
            </Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const { Text } = require('react-native');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundBlack,
  },
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBlack,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  headerTitle: {
    marginBottom: theme.spacing.sm,
  },
  headerSubtitle: {
    color: colors.neonGreen,
    fontSize: 12,
  },
  roleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  roleIcon: {
    fontSize: 32,
    marginRight: theme.spacing.md,
  },
  roleTitle: {
    flex: 1,
    marginBottom: 0,
  },
  roleDescription: {
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  tapMore: {
    color: colors.neonGreen,
    fontSize: 12,
    fontWeight: '600',
  },
});
