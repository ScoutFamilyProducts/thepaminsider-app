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
import { Card, Heading, Paragraph, Divider, Button } from '../components/UIComponents';
import termsData from '../data/terms.json';
import { storage } from '../utils/storage';

export default function TermDetailScreen({ route, navigation }) {
  const { termId } = route.params;
  const term = termsData.find(t => t.id === termId);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const favorites = await storage.getFavoritedTerms();
      setIsFavorited(favorites.includes(termId));
    };
    checkFavorite();
  }, [termId]);

  if (!term) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Term not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleToggleFavorite = async () => {
    if (isFavorited) {
      await storage.removeFavoriteTerm(termId);
    } else {
      await storage.addFavoriteTerm(termId);
    }
    setIsFavorited(!isFavorited);
  };

  const handleSendFeedback = () => {
    const subject = encodeURIComponent(
      `Feedback on "${term.term}" - The PAM Field Guide`
    );
    const body = encodeURIComponent(
      `I have feedback about the term "${term.term}":\n\n[Your feedback here]\n\n---\nPlease do not include sensitive information in this email.`
    );
    const url = `mailto:thepaminsider@gmail.com?subject=${subject}&body=${body}`;

    Linking.openURL(url).catch(err =>
      Alert.alert('Error', 'Could not open email client')
    );
  };

  const handleRelatedTermTap = relatedTermId => {
    navigation.push('TermDetail', { termId: relatedTermId });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Favorite */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Heading level={1} style={styles.termTitle}>
              {term.term}
            </Heading>
            <View style={styles.termMeta}>
              <Text style={styles.metaBadge}>{term.category}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={styles.favoriteButton}
          >
            <Text style={styles.favoriteIcon}>
              {isFavorited ? '⭐' : '☆'}
            </Text>
          </TouchableOpacity>
        </View>

        <Divider style={styles.divider} />

        {/* Definition */}
        <Card>
          <Heading level={3} style={styles.sectionHeading}>
            Definition
          </Heading>
          <Paragraph style={styles.definition}>
            {term.definition}
          </Paragraph>
        </Card>

        {/* Why It Matters */}
        <Card>
          <Heading level={3} style={styles.sectionHeading}>
            Why It Matters
          </Heading>
          <Paragraph style={styles.content}>
            {term.whyItMatters}
          </Paragraph>
        </Card>

        {/* Today's Takeaway */}
        <Card style={styles.takeawayCard}>
          <Text style={styles.takeawayEmoji}>💡</Text>
          <Heading level={3} style={styles.takeawayHeading}>
            Today's Takeaway
          </Heading>
          <Paragraph style={styles.takeawayContent}>
            "{term.todaysTakeaway}"
          </Paragraph>
        </Card>

        {/* Related Terms */}
        {term.relatedTerms && term.relatedTerms.length > 0 && (
          <Card>
            <Heading level={3} style={styles.sectionHeading}>
              Related Terms
            </Heading>
            <View style={styles.relatedTermsContainer}>
              {term.relatedTerms.map(relatedTermId => {
                const relatedTerm = termsData.find(t => t.id === relatedTermId);
                if (!relatedTerm) return null;

                return (
                  <TouchableOpacity
                    key={relatedTermId}
                    style={styles.relatedTermChip}
                    onPress={() => handleRelatedTermTap(relatedTermId)}
                  >
                    <Text style={styles.relatedTermText}>
                      {relatedTerm.term}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Card>
        )}

        {/* Feedback Button */}
        <Button
          title="Send Feedback on This Term"
          onPress={handleSendFeedback}
          variant="tertiary"
          style={styles.feedbackButton}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  headerContent: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  termTitle: {
    marginBottom: theme.spacing.md,
    lineHeight: 36,
  },
  termMeta: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  metaBadge: {
    fontSize: 11,
    color: colors.neonGreen,
    fontWeight: '700',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: colors.borderGray,
  },
  favoriteButton: {
    padding: theme.spacing.md,
  },
  favoriteIcon: {
    fontSize: 32,
  },
  divider: {
    marginVertical: theme.spacing.lg,
  },
  sectionHeading: {
    marginBottom: theme.spacing.md,
    color: colors.neonGreen,
  },
  definition: {
    lineHeight: 22,
    fontSize: 16,
  },
  content: {
    lineHeight: 22,
  },
  takeawayCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.neonGreen,
  },
  takeawayEmoji: {
    fontSize: 28,
    marginBottom: theme.spacing.md,
  },
  takeawayHeading: {
    marginBottom: theme.spacing.md,
  },
  takeawayContent: {
    fontStyle: 'italic',
    lineHeight: 22,
    fontSize: 15,
  },
  relatedTermsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  relatedTermChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: colors.deepCharcoal,
    borderWidth: 1,
    borderColor: colors.neonGreen,
  },
  relatedTermText: {
    color: colors.neonGreen,
    fontSize: 12,
    fontWeight: '600',
  },
  feedbackButton: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  errorText: {
    color: colors.textWhite,
    fontSize: 16,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
});
