import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native';
import { colors, theme } from '../theme/colors';
import { getDailyIndex } from '../utils/storage';
import { Card, Heading, Paragraph } from '../components/UIComponents';
import termsData from '../data/terms.json';
import scenariosData from '../data/scenarios.json';
import { mythBusters, rolePages } from '../data/staticContent';

export default function HomeScreen({ navigation }) {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const loadDailyData = () => {
      // Today's Term
      const termIndex = getDailyIndex(termsData.length);
      const dailyTerm = termsData[termIndex];

      // Today's Scenario
      const scenarioIndex = getDailyIndex(scenariosData.length);
      const dailyScenario = scenariosData[scenarioIndex];

      // Today's Myth Buster
      const mythIndex = getDailyIndex(mythBusters.length);
      const dailyMyth = mythBusters[mythIndex];

      // Today's Role Lens
      const roleIndex = getDailyIndex(rolePages.length);
      const dailyRole = rolePages[roleIndex];

      setDailyData({
        term: dailyTerm,
        scenario: dailyScenario,
        myth: dailyMyth,
        role: dailyRole,
      });
    };

    loadDailyData();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Heading level={2} style={styles.headerTitle}>
            THE PAM FIELD GUIDE
          </Heading>
          <Paragraph style={styles.headerSubtitle}>
            By The PAM Insider
          </Paragraph>
        </View>

        {/* PAM Term of the Day */}
        {dailyData.term && (
          <Card
            onPress={() =>
              navigation.push('TermDetail', { termId: dailyData.term.id })
            }
          >
            <Text style={styles.cardLabel}>📖 Term of the Day</Text>
            <Heading level={3} style={styles.cardTitle}>
              {dailyData.term.term}
            </Heading>
            <Paragraph style={styles.cardDefinition}>
              {dailyData.term.definition}
            </Paragraph>
            <Text style={styles.tapMore}>Tap to learn more →</Text>
          </Card>
        )}

        {/* What Went Wrong Scenario */}
        {dailyData.scenario && (
          <Card
            style={styles.warningCard}
            onPress={() =>
              navigation.push('ScenarioDetail', {
                scenarioId: dailyData.scenario.id,
              })
            }
          >
            <Text style={styles.cardLabel}>⚠️ What Went Wrong?</Text>
            <Heading level={3} style={styles.cardTitle}>
              {dailyData.scenario.title}
            </Heading>
            <Paragraph numberOfLines={2} style={styles.cardSnippet}>
              {dailyData.scenario.scenario}
            </Paragraph>
            <Text style={styles.tapMore}>Tap to see the lesson →</Text>
          </Card>
        )}

        {/* Myth Buster */}
        {dailyData.myth && (
          <Card>
            <Text style={styles.cardLabel}>💡 Myth Buster</Text>
            <Heading level={3} style={styles.cardTitle}>
              {dailyData.myth.title}
            </Heading>
            <Paragraph style={styles.cardContent}>
              {dailyData.myth.debunk}
            </Paragraph>
          </Card>
        )}

        {/* Role Lens */}
        {dailyData.role && (
          <Card
            onPress={() =>
              navigation.push('RoleDetail', { roleId: dailyData.role.id })
            }
          >
            <Text style={styles.cardLabel}>
              {dailyData.role.icon} Role Lens
            </Text>
            <Heading level={3} style={styles.cardTitle}>
              {dailyData.role.title}
            </Heading>
            <Paragraph numberOfLines={2} style={styles.cardSnippet}>
              {dailyData.role.whatItMeans}
            </Paragraph>
            <Text style={styles.tapMore}>Tap to see this role's view →</Text>
          </Card>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

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
    alignItems: 'center',
  },
  headerTitle: {
    textAlign: 'center',
    letterSpacing: 1,
  },
  headerSubtitle: {
    textAlign: 'center',
    color: colors.neonGreen,
    fontSize: 14,
    marginTop: theme.spacing.sm,
  },
  cardLabel: {
    fontSize: 12,
    color: colors.dimTextGray,
    marginBottom: theme.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardTitle: {
    marginBottom: theme.spacing.md,
  },
  cardDefinition: {
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  cardSnippet: {
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  cardContent: {
    lineHeight: 20,
  },
  tapMore: {
    color: colors.neonGreen,
    fontSize: 12,
    fontWeight: '600',
    marginTop: theme.spacing.sm,
  },
  warningCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.riskOrange,
  },
});
