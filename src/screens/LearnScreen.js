import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native';
import { colors, theme } from '../theme/colors';
import {
  SearchInput,
  Card,
  Heading,
  Paragraph,
} from '../components/UIComponents';
import termsData from '../data/terms.json';
import { storage } from '../utils/storage';

const CATEGORIES = ['All', ...new Set(termsData.map(t => t.category))];

export default function LearnScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState([]);

  React.useEffect(() => {
    const loadFavorites = async () => {
      const fav = await storage.getFavoritedTerms();
      setFavorites(fav);
    };
    loadFavorites();
  }, []);

  const filteredTerms = useMemo(() => {
    return termsData.filter(term => {
      const matchesSearch =
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || term.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleToggleFavorite = useCallback(async (termId) => {
    if (favorites.includes(termId)) {
      await storage.removeFavoriteTerm(termId);
      setFavorites(prev => prev.filter(id => id !== termId));
    } else {
      await storage.addFavoriteTerm(termId);
      setFavorites(prev => [...prev, termId]);
    }
  }, [favorites]);

  const renderTerm = useCallback(({ item }) => {
    const isFavorited = favorites.includes(item.id);
    return (
      <Card onPress={() => navigation.push('TermDetail', { termId: item.id })}>
        <View style={styles.termHeader}>
          <View style={styles.termTitleContainer}>
            <Heading level={3} style={styles.termTitle}>
              {item.term}
            </Heading>
          </View>
          <Text
            style={styles.favoriteButton}
            onPress={() => handleToggleFavorite(item.id)}
          >
            {isFavorited ? '⭐' : '☆'}
          </Text>
        </View>

        <View style={styles.termMeta}>
          <Text style={styles.badge}>{item.category}</Text>
        </View>

        <Paragraph style={styles.termDefinition}>
          {item.definition}
        </Paragraph>

        <Text style={styles.tapMore}>Tap to explore →</Text>
      </Card>
    );
  }, [favorites, navigation, handleToggleFavorite]);

  const ListHeader = useCallback(() => (
    <View>
      <View style={styles.header}>
        <Heading level={2} style={styles.headerTitle}>Learn</Heading>
        <Paragraph style={styles.headerSubtitle}>
          {filteredTerms.length} terms
        </Paragraph>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {CATEGORIES.map(category => (
          <Text
            key={category}
            style={[
              styles.filterChip,
              selectedCategory === category && styles.filterChipActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            {category}
          </Text>
        ))}
      </ScrollView>

      <View style={styles.searchContainer}>
        <SearchInput
          placeholder="Search terms or definitions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    </View>
  ), [filteredTerms.length, selectedCategory, searchQuery]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={filteredTerms}
        renderItem={renderTerm}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundBlack,
  },
  listContent: {
    paddingBottom: theme.spacing.xl,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  headerTitle: {
    marginBottom: theme.spacing.sm,
  },
  headerSubtitle: {
    color: colors.neonGreen,
    fontSize: 12,
  },
  filtersContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    flexGrow: 0,
  },
  filtersContent: {
    paddingRight: theme.spacing.lg,
    alignItems: 'center',
  },
  filterChip: {
    color: colors.textWhite,
    fontSize: 13,
    fontWeight: '500',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.borderGray,
    marginRight: 10,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: colors.neonGreen,
    borderColor: colors.neonGreen,
    color: colors.backgroundBlack,
    fontWeight: '700',
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  termHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  termTitleContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  termTitle: {
    marginBottom: 0,
  },
  favoriteButton: {
    fontSize: 20,
  },
  termMeta: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  badge: {
    fontSize: 11,
    color: colors.neonGreen,
    fontWeight: '600',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: colors.borderGray,
    overflow: 'hidden',
  },
  termDefinition: {
    marginBottom: theme.spacing.md,
  },
  tapMore: {
    color: colors.neonGreen,
    fontSize: 12,
    fontWeight: '600',
  },
});
