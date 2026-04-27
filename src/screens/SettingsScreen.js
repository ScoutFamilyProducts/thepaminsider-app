import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Linking,
  Alert,
} from 'react-native';
import { colors, theme } from '../theme/colors';
import {
  Card,
  Heading,
  Paragraph,
  Button,
} from '../components/UIComponents';

const VERSION = '1.0.0';
const SUPPORT_EMAIL = 'thepaminsider@gmail.com';

export default function SettingsScreen() {
  const handleFeedback = () => {
    const subject = encodeURIComponent('The PAM Field Guide Feedback');
    const body = encodeURIComponent(
      'Feedback Type: [Bug / Suggestion / Other]\nContent Title: [If applicable]\n\nYour feedback:\n\n---\nPlease do not include sensitive information in this email.'
    );
    const url = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;

    Linking.openURL(url).catch(err =>
      Alert.alert('Error', 'Could not open email client')
    );
  };

  const handleSupport = () => {
    Linking.openURL('https://buymeacoffee.com/thepaminsider').catch(() =>
      Alert.alert('Error', 'Could not open browser')
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* About Section */}
        <Card>
          <Heading level={3} style={styles.sectionTitle}>
            About
          </Heading>
          <Paragraph style={styles.sectionContent}>
            <Text style={styles.bold}>The PAM Field Guide</Text>
          </Paragraph>
          <Paragraph style={styles.sectionContent}>
            By The PAM Insider
          </Paragraph>
          <Paragraph style={styles.sectionContent}>
            Version {VERSION}
          </Paragraph>
          <Paragraph style={styles.sectionContent}>
            Privileged access, explained without vendor fog. A practical PAM
            education app for everyone.
          </Paragraph>
        </Card>

        {/* Privacy Section */}
        <Card>
          <Heading level={3} style={styles.sectionTitle}>
            Privacy by Design
          </Heading>
          <View style={styles.privacyList}>
            <PrivacyItem icon="✓" text="No accounts required" />
            <PrivacyItem icon="✓" text="No tracking" />
            <PrivacyItem icon="✓" text="No analytics" />
            <PrivacyItem icon="✓" text="No data collection" />
            <PrivacyItem icon="✓" text="Local storage only" />
            <PrivacyItem icon="✓" text="Feedback is email only" />
          </View>
          <Paragraph style={styles.privacyNote}>
            Your saved terms, completed scenarios, and progress stay on your
            device. Nothing leaves unless you choose to send feedback.
          </Paragraph>
        </Card>

        {/* Feedback */}
        <Card>
          <Heading level={3} style={styles.sectionTitle}>
            Feedback
          </Heading>
          <Paragraph style={styles.sectionContent}>
            Found a bug? Have an idea? Want to contribute content? We'd love to
            hear from you.
          </Paragraph>
          <Button
            title="Send Feedback"
            onPress={handleFeedback}
            variant="primary"
            size="md"
            style={styles.feedbackButton}
          />
        </Card>

        {/* Support */}
        <Card>
          <Heading level={3} style={styles.sectionTitle}>
            Support the Project
          </Heading>
          <Paragraph style={styles.sectionContent}>
            This app is free and private by design. If it helped you, you can
            optionally support the project. Donations help maintain the app,
            improve content, and fund future educational tools.
          </Paragraph>
          <Paragraph style={styles.supportNote}>
            Donations do not unlock features. The app stays free for everyone.
          </Paragraph>
          <Button
            title="Support the Project"
            onPress={handleSupport}
            variant="secondary"
            size="md"
            style={styles.feedbackButton}
          />
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Paragraph style={styles.footerText}>
            The PAM Field Guide © 2024
          </Paragraph>
          <Paragraph style={styles.footerText}>
            By The PAM Insider
          </Paragraph>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PrivacyItem({ icon, text }) {
  return (
    <View style={styles.privacyItemContainer}>
      <Text style={styles.privacyIcon}>{icon}</Text>
      <Text style={styles.privacyItemText}>{text}</Text>
    </View>
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
    paddingBottom: theme.spacing.xl,
  },
  sectionTitle: {
    marginBottom: theme.spacing.md,
  },
  sectionContent: {
    marginBottom: theme.spacing.sm,
  },
  bold: {
    fontWeight: '700',
  },
  privacyList: {
    marginBottom: theme.spacing.md,
  },
  privacyItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  privacyIcon: {
    color: colors.neonGreen,
    fontSize: 16,
    marginRight: theme.spacing.md,
    fontWeight: '700',
  },
  privacyItemText: {
    color: colors.mutedTextGray,
    fontSize: 14,
  },
  privacyNote: {
    marginTop: theme.spacing.md,
    fontSize: 12,
    color: colors.dimTextGray,
    fontStyle: 'italic',
  },
  feedbackButton: {
    marginTop: theme.spacing.md,
    width: '100%',
  },
  supportNote: {
    marginBottom: theme.spacing.md,
    fontSize: 12,
    color: colors.dimTextGray,
  },
  footer: {
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.borderGray,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: colors.dimTextGray,
    fontSize: 12,
  },
});
