import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { colors, theme } from '../theme/colors';
import { Card, Heading, Paragraph, Divider } from '../components/UIComponents';
import { rolePages } from '../data/staticContent';
import termsData from '../data/terms.json';
import scenariosData from '../data/scenarios.json';

export default function RoleDetailScreen({ route, navigation }) {
  const { roleId } = route.params;
  const role = rolePages.find(r => r.id === roleId);

  if (!role) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Role not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const relatedTerms = role.termsToKnow.map(termId =>
    termsData.find(t => t.id === termId)
  ).filter(Boolean);

  const relatedScenarios = role.relevantScenarios.map(scenarioId =>
    scenariosData.find(s => s.id === scenarioId)
  ).filter(Boolean);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>{role.icon}</Text>
          <Heading level={1} style={styles.roleTitle}>
            {role.title}
          </Heading>
        </View>

        <Divider style={styles.divider} />

        {/* What It Means */}
        <Card>
          <Heading level={3} style={styles.sectionHeading}>
            What PAM Means for This Role
          </Heading>
          <Paragraph style={styles.sectionContent}>
            {role.whatItMeans}
          </Paragraph>
        </Card>

        {/* Top Concerns */}
        <Card>
          <Heading level={3} style={styles.sectionHeading}>
            Top Concerns
          </Heading>
          {role.topConcerns.map((concern, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.concernText}>{concern}</Text>
            </View>
          ))}
        </Card>

        {/* Questions to Ask */}
        <Card>
          <Heading level={3} style={styles.sectionHeading}>
            Questions to Ask
          </Heading>
          {role.questionsToAsk.map((question, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.questionMark}>❓</Text>
              <Text style={styles.questionText}>{question}</Text>
            </View>
          ))}
        </Card>

        {/* Terms to Know */}
        {relatedTerms.length > 0 && (
          <Card>
            <Heading level={3} style={styles.sectionHeading}>
              Terms to Know
            </Heading>
            {relatedTerms.map(term => (
              <TouchableOpacity
                key={term.id}
                style={styles.termLink}
                onPress={() =>
                  navigation.push('TermDetail', { termId: term.id })
                }
              >
                <View style={styles.termLinkContent}>
                  <Text style={styles.termLinkTitle}>{term.term}</Text>
                  <Text style={styles.termLinkDesc} numberOfLines={1}>
                    {term.definition}
                  </Text>
                </View>
                <Text style={styles.linkArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </Card>
        )}

        {/* Relevant Scenarios */}
        {relatedScenarios.length > 0 && (
          <Card>
            <Heading level={3} style={styles.sectionHeading}>
              Relevant Scenarios
            </Heading>
            {relatedScenarios.map(scenario => (
              <TouchableOpacity
                key={scenario.id}
                style={styles.scenarioLink}
                onPress={() =>
                  navigation.push('ScenarioDetail', { scenarioId: scenario.id })
                }
              >
                <View style={styles.scenarioLinkContent}>
                  <Text style={styles.scenarioLinkTitle}>
                    {scenario.title}
                  </Text>
                  <Text style={styles.scenarioLinkCategory}>
                    {scenario.category} • {scenario.difficulty}
                  </Text>
                </View>
                <Text style={styles.linkArrow}>→</Text>
              </TouchableOpacity>
            ))}
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
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  roleTitle: {
    textAlign: 'center',
    marginBottom: 0,
  },
  divider: {
    marginVertical: theme.spacing.lg,
  },
  sectionHeading: {
    marginBottom: theme.spacing.md,
    color: colors.neonGreen,
  },
  sectionContent: {
    lineHeight: 22,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  bullet: {
    color: colors.neonGreen,
    fontWeight: '700',
    marginRight: theme.spacing.md,
    fontSize: 16,
    minWidth: 16,
  },
  concernText: {
    flex: 1,
    color: colors.mutedTextGray,
    fontSize: 14,
    lineHeight: 20,
  },
  questionMark: {
    marginRight: theme.spacing.md,
    fontSize: 14,
    minWidth: 16,
  },
  questionText: {
    flex: 1,
    color: colors.mutedTextGray,
    fontSize: 14,
    lineHeight: 20,
  },
  termLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  termLinkContent: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  termLinkTitle: {
    color: colors.neonGreen,
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 2,
  },
  termLinkDesc: {
    color: colors.dimTextGray,
    fontSize: 12,
    lineHeight: 16,
  },
  linkArrow: {
    color: colors.neonGreen,
    fontWeight: '700',
    fontSize: 16,
  },
  scenarioLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  scenarioLinkContent: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  scenarioLinkTitle: {
    color: colors.textWhite,
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 4,
  },
  scenarioLinkCategory: {
    color: colors.dimTextGray,
    fontSize: 12,
  },
  errorText: {
    color: colors.textWhite,
    fontSize: 16,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
});
