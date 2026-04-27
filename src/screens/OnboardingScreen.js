import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { colors, theme } from '../theme/colors';
import { storage } from '../utils/storage';
import { Button, Heading, Paragraph } from '../components/UIComponents';

const { width } = Dimensions.get('window');

const onboardingScreens = [
  {
    title: 'The PAM Field Guide',
    subtitle: 'By The PAM Insider',
    content:
      'Privileged access, explained clearly, practically, and without vendor fog.',
    icon: '🛡️',
  },
  {
    title: 'Learn by Term, Scenario, or Role',
    content:
      '200 PAM definitions. 30 real-world failure scenarios. Role-based explanations for admins, auditors, CISOs, helpdesk, and business leaders.',
    icon: '📚',
  },
  {
    title: 'Private by Design',
    content:
      'No social. No accounts. No tracking. No analytics. No data collection. No paywalls. Your saved terms and progress stay on your device.',
    icon: '🔒',
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const handleNext = () => {
    if (currentScreen < onboardingScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const handleSkip = async () => {
    try {
      await storage.dismissOnboarding();
      navigation.navigate('MainTabs');
    } catch (error) {
      console.error('Error dismissing onboarding:', error);
    }
  };

  const handleStart = async () => {
    try {
      await storage.dismissOnboarding();
      navigation.navigate('MainTabs');
    } catch (error) {
      console.error('Error starting app:', error);
    }
  };

  const screen = onboardingScreens[currentScreen];
  const isLastScreen = currentScreen === onboardingScreens.length - 1;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>{screen.icon}</Text>
            </View>

            <Heading level={1} style={styles.title}>
              {screen.title}
            </Heading>

            {screen.subtitle && (
              <Text style={styles.subtitle}>{screen.subtitle}</Text>
            )}

            <Paragraph style={styles.description}>
              {screen.content}
            </Paragraph>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.dotsContainer}>
            {onboardingScreens.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentScreen && styles.dotActive,
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonsContainer}>
            {!isLastScreen ? (
              <>
                <Button
                  title="Skip"
                  onPress={handleSkip}
                  variant="tertiary"
                  style={styles.skipButton}
                />
                <Button
                  title="Next"
                  onPress={handleNext}
                  variant="primary"
                  style={styles.nextButton}
                />
              </>
            ) : (
              <Button
                title="Start Learning"
                onPress={handleStart}
                variant="primary"
                style={styles.startButton}
              />
            )}
          </View>
        </View>
      </View>
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: theme.spacing.xl,
  },
  icon: {
    fontSize: 80,
  },
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.neonGreen,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    color: colors.mutedTextGray,
  },
  footer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.borderGray,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.neonGreen,
    width: 24,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  skipButton: {
    flex: 1,
  },
  nextButton: {
    flex: 1,
  },
  startButton: {
    width: '100%',
  },
});
