import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  ProgressBarAndroid,
} from 'react-native';
import { colors, theme } from '../theme/colors';
import { Card, Heading, Paragraph, Badge } from '../components/UIComponents';
import scenariosData from '../data/scenarios.json';
import { storage } from '../utils/storage';

export default function ScenariosScreen({ navigation }) {
  const [completedScenarios, setCompletedScenarios] = useState([]);

  React.useEffect(() => {
    const loadCompletedScenarios = async () => {
      const completed = await storage.getCompletedScenarios();
      setCompletedScenarios(completed);
    };
    loadCompletedScenarios();
  }, []);

  const completionPercentage =
    (completedScenarios.length / scenariosData.length) * 100;

  const getDifficultyColor = difficulty => {
    switch (difficulty) {
      case 'Beginner':
        return colors.electricBlue;
      case 'Intermediate':
        return colors.riskOrange;
      case 'Advanced':
        return colors.criticalRed;
      default:
        return colors.neonGreen;
    }
  };

  const renderScenario = ({ item }) => {
    const isCompleted = completedScenarios.includes(item.id);

    return (
      <Card
        onPress={() =>
          navigation.navigate('ScenarioDetail', { scenarioId: item.id })
        }
      >
        <View style={styles.scenarioHeader}>
          <View style={styles.scenarioInfo}>
            <Heading level={3} style={styles.scenarioTitle}>
              {item.title}
            </Heading>
            <View style={styles.scenarioMeta}>
              <Badge
                label={item.difficulty}
                variant={
                  item.difficulty === 'Beginner'
                    ? 'secondary'
                    : item.difficulty === 'Advanced'
                    ? 'danger'
                    : 'warning'
                }
                size="sm"
              />
              <Badge
                label={item.category}
                variant="primary"
                size="sm"
              />
            </View>
          </View>
          {isCompleted && <Text style={styles.completedBadge}>✓</Text>}
        </View>

        <Paragraph numberOfLines={2} style={styles.scenarioSnippet}>
          {item.scenario}
        </Paragraph>

        <Text style={styles.tapMore}>Tap to see the scenario →</Text>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Heading level={2} style={styles.headerTitle}>
          What Went Wrong?
        </Heading>
        <Paragraph style={styles.headerSubtitle}>
          Real-world PAM failures and lessons
        </Paragraph>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressStats}>
          <Text style={styles.progressText}>
            {completedScenarios.length} / {scenariosData.length} completed
          </Text>
          <Text style={styles.progressPercent}>
            {Math.round(completionPercentage)}%
          </Text>
        </View>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={completionPercentage / 100}
          color={colors.neonGreen}
          style={styles.progressBar}
        />
      </View>

      <FlatList
        data={scenariosData}
        renderItem={renderScenario}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundBlack,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  headerTitle: {
    marginBottom: theme.spacing.sm,
  },
  headerSubtitle: {
    color: colors.neonGreen,
    fontSize: 12,
  },
  progressContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    backgroundColor: colors.deepCharcoal,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  progressText: {
    color: colors.mutedTextGray,
    fontSize: 14,
  },
  progressPercent: {
    color: colors.neonGreen,
    fontWeight: '700',
    fontSize: 18,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
  },
  scenarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  scenarioInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  scenarioTitle: {
    marginBottom: theme.spacing.sm,
  },
  scenarioMeta: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  completedBadge: {
    fontSize: 24,
    color: colors.neonGreen,
    fontWeight: '700',
  },
  scenarioSnippet: {
    marginBottom: theme.spacing.md,
    lineHeight: 20,
  },
  tapMore: {
    color: colors.neonGreen,
    fontSize: 12,
    fontWeight: '600',
  },
});
