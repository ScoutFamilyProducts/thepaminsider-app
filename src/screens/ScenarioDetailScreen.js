import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { colors, theme } from '../theme/colors';
import { Card, Heading, Paragraph, Divider, Button, Badge } from '../components/UIComponents';
import scenariosData from '../data/scenarios.json';
import termsData from '../data/terms.json';
import { storage } from '../utils/storage';

export default function ScenarioDetailScreen({ route, navigation }) {
  const { scenarioId } = route.params;
  const scenario = scenariosData.find(s => s.id === scenarioId);
  const [stage, setStage] = useState('scenario'); // scenario, quiz, lesson
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const checkCompletion = async () => {
      const completed = await storage.getCompletedScenarios();
      setIsCompleted(completed.includes(scenarioId));
    };
    checkCompletion();
  }, [scenarioId]);

  if (!scenario) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Scenario not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleAnswerSelect = answerId => {
    setSelectedAnswer(answerId);
  };

  const handleSubmitAnswer = () => {
    setStage('lesson');
  };

  const handleCompleteScenario = async () => {
    if (!isCompleted) {
      await storage.markScenarioComplete(scenarioId);
      setIsCompleted(true);
    }
  };

  const getAnswerText = () => {
    const answer = scenario.answers.find(a => a.id === selectedAnswer);
    return answer ? answer.text : '';
  };

  const isAnswerCorrect = selectedAnswer && 
    scenario.answers.find(a => a.id === selectedAnswer)?.correct;

  const handleTermTap = termId => {
    navigation.push('TermDetail', { termId });
  };

  const handleSendFeedback = () => {
    const subject = encodeURIComponent(
      `Feedback on "${scenario.title}" - The PAM Field Guide`
    );
    const body = encodeURIComponent(
      `I have feedback about the scenario "${scenario.title}":\n\n[Your feedback here]\n\n---\nPlease do not include sensitive information in this email.`
    );
    const url = `mailto:thepaminsider@gmail.com?subject=${subject}&body=${body}`;

    Linking.openURL(url).catch(err =>
      Alert.alert('Error', 'Could not open email client')
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerMeta}>
            <Badge label={scenario.difficulty} variant="secondary" size="sm" />
            <Badge label={scenario.category} variant="primary" size="sm" />
            {isCompleted && (
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>✓ Completed</Text>
              </View>
            )}
          </View>
          <Heading level={2} style={styles.scenarioTitle}>
            {scenario.title}
          </Heading>
        </View>

        <Divider style={styles.divider} />

        {/* Scenario Stage */}
        {stage === 'scenario' && (
          <>
            <Card>
              <Heading level={3} style={styles.stageHeading}>
                The Scenario
              </Heading>
              <Paragraph style={styles.scenarioText}>
                {scenario.scenario}
              </Paragraph>
            </Card>

            <Button
              title="See the Quiz"
              onPress={() => setStage('quiz')}
              variant="primary"
              style={styles.button}
            />
          </>
        )}

        {/* Quiz Stage */}
        {stage === 'quiz' && (
          <>
            <Card>
              <Heading level={3} style={styles.stageHeading}>
                {scenario.question}
              </Heading>

              <View style={styles.answersContainer}>
                {scenario.answers.map(answer => (
                  <TouchableOpacity
                    key={answer.id}
                    style={[
                      styles.answerOption,
                      selectedAnswer === answer.id &&
                        styles.answerOptionSelected,
                    ]}
                    onPress={() => handleAnswerSelect(answer.id)}
                  >
                    <Text style={styles.answerLabel}>{answer.id.toUpperCase()}.</Text>
                    <Text style={styles.answerText}>{answer.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Card>

            <Button
              title={selectedAnswer ? 'Check Answer' : 'Select an Answer'}
              onPress={handleSubmitAnswer}
              variant="primary"
              disabled={!selectedAnswer}
              style={styles.button}
            />
          </>
        )}

        {/* Lesson Stage */}
        {stage === 'lesson' && (
          <>
            <Card
              style={[
                styles.resultCard,
                isAnswerCorrect && styles.resultCardCorrect,
              ]}
            >
              <Text style={styles.resultIcon}>
                {isAnswerCorrect ? '✓' : '✗'}
              </Text>
              <Heading level={3} style={styles.resultHeading}>
                {isAnswerCorrect ? 'Correct!' : 'Not quite.'}
              </Heading>
              <Paragraph style={styles.yourAnswer}>
                <Text style={styles.bold}>Your answer:</Text> {getAnswerText()}
              </Paragraph>

              {!isAnswerCorrect && (
                <>
                  <Divider style={styles.dividerSmall} />
                  <Paragraph style={styles.correctAnswer}>
                    <Text style={styles.bold}>Correct answer:</Text>{' '}
                    {
                      scenario.answers.find(a => a.correct)?.text
                    }
                  </Paragraph>
                </>
              )}
            </Card>

            <Card>
              <Heading level={3} style={styles.lessonHeading}>
                The Lesson
              </Heading>
              <Paragraph style={styles.lessonText}>
                {scenario.lesson}
              </Paragraph>
            </Card>

            {scenario.pamControls && scenario.pamControls.length > 0 && (
              <Card>
                <Heading level={3} style={styles.controlsHeading}>
                  PAM Controls That Help
                </Heading>
                <View style={styles.controlsList}>
                  {scenario.pamControls.map((control, index) => (
                    <Text key={index} style={styles.controlItem}>
                      • {control}
                    </Text>
                  ))}
                </View>
              </Card>
            )}

            {scenario.relatedTerms && scenario.relatedTerms.length > 0 && (
              <Card>
                <Heading level={3} style={styles.relatedHeading}>
                  Related Terms
                </Heading>
                <View style={styles.relatedTermsContainer}>
                  {scenario.relatedTerms.map(termId => {
                    const term = termsData.find(t => t.id === termId);
                    if (!term) return null;

                    return (
                      <TouchableOpacity
                        key={termId}
                        style={styles.termChip}
                        onPress={() => handleTermTap(termId)}
                      >
                        <Text style={styles.termChipText}>{term.term}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </Card>
            )}

            <View style={styles.actionButtons}>
              <Button
                title="Try Another Scenario"
                onPress={() => navigation.navigate('WhatWentWrong')}
                variant="secondary"
                style={styles.actionButton}
              />
              <Button
                title="Back to Quiz"
                onPress={() => {
                  setStage('quiz');
                  setSelectedAnswer(null);
                }}
                variant="tertiary"
                style={styles.actionButton}
              />
            </View>

            {!isCompleted && (
              <Button
                title="Mark as Completed"
                onPress={handleCompleteScenario}
                variant="primary"
                style={styles.completeButton}
              />
            )}

            <Button
              title="Send Feedback on This Scenario"
              onPress={handleSendFeedback}
              variant="tertiary"
              style={styles.feedbackButton}
            />
          </>
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
  },
  headerMeta: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    flexWrap: 'wrap',
  },
  completedBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: colors.neonGreen,
  },
  completedText: {
    color: colors.backgroundBlack,
    fontWeight: '700',
    fontSize: 12,
  },
  scenarioTitle: {
    marginBottom: 0,
  },
  divider: {
    marginVertical: theme.spacing.lg,
  },
  dividerSmall: {
    marginVertical: theme.spacing.md,
  },
  stageHeading: {
    marginBottom: theme.spacing.md,
    color: colors.neonGreen,
  },
  scenarioText: {
    lineHeight: 22,
  },
  button: {
    marginVertical: theme.spacing.lg,
  },
  answersContainer: {
    gap: theme.spacing.md,
  },
  answerOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderGray,
    backgroundColor: colors.deepCharcoal,
  },
  answerOptionSelected: {
    borderColor: colors.neonGreen,
    backgroundColor: colors.cardCharcoal,
  },
  answerLabel: {
    color: colors.neonGreen,
    fontWeight: '700',
    marginRight: theme.spacing.md,
    fontSize: 14,
    minWidth: 24,
  },
  answerText: {
    color: colors.mutedTextGray,
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  resultCard: {
    borderLeftWidth: 4,
    alignItems: 'center',
    textAlign: 'center',
  },
  resultCardCorrect: {
    borderLeftColor: colors.neonGreen,
  },
  resultIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.md,
  },
  resultHeading: {
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  yourAnswer: {
    marginBottom: 0,
  },
  correctAnswer: {
    marginTop: 0,
  },
  bold: {
    fontWeight: '700',
  },
  lessonHeading: {
    marginBottom: theme.spacing.md,
    color: colors.electricBlue,
  },
  lessonText: {
    lineHeight: 22,
  },
  controlsHeading: {
    marginBottom: theme.spacing.md,
    color: colors.electricBlue,
  },
  controlsList: {
    gap: theme.spacing.sm,
  },
  controlItem: {
    color: colors.mutedTextGray,
    fontSize: 14,
    lineHeight: 20,
  },
  relatedHeading: {
    marginBottom: theme.spacing.md,
    color: colors.electricBlue,
  },
  relatedTermsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  termChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: colors.deepCharcoal,
    borderWidth: 1,
    borderColor: colors.neonGreen,
  },
  termChipText: {
    color: colors.neonGreen,
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginVertical: theme.spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
  completeButton: {
    marginBottom: theme.spacing.md,
  },
  feedbackButton: {
    marginBottom: theme.spacing.lg,
  },
  errorText: {
    color: colors.textWhite,
    fontSize: 16,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
});
