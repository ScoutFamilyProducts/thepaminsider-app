import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, theme } from '../theme/colors';

export const Card = ({ children, style, onPress, disabled }) => {
  const content = (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );

  if (onPress && !disabled) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
        {content}
      </Pressable>
    );
  }

  return content;
};

export const Button = ({ title, onPress, variant = 'primary', size = 'md', loading, disabled }) => {
  const buttonStyles = [
    styles.button,
    variant === 'primary' && styles.buttonPrimary,
    variant === 'secondary' && styles.buttonSecondary,
    variant === 'tertiary' && styles.buttonTertiary,
    size === 'sm' && styles.buttonSm,
    size === 'lg' && styles.buttonLg,
    disabled && styles.buttonDisabled,
  ];

  const textColor = variant === 'primary' ? colors.backgroundBlack : colors.textWhite;

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>
        {loading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

export const Badge = ({ label, variant = 'primary', size = 'md' }) => {
  const badgeStyles = [
    styles.badge,
    variant === 'primary' && styles.badgePrimary,
    variant === 'secondary' && styles.badgeSecondary,
    variant === 'danger' && styles.badgeDanger,
    variant === 'warning' && styles.badgeWarning,
    size === 'sm' && styles.badgeSm,
    size === 'lg' && styles.badgeLg,
  ];

  return (
    <View style={badgeStyles}>
      <Text style={styles.badgeText}>{label}</Text>
    </View>
  );
};

export const SearchInput = ({ placeholder, value, onChangeText, style }) => {
  return (
    <View style={[styles.searchContainer, style]}>
      <MaterialCommunityIcons name="magnify" size={20} color={colors.dimTextGray} />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={colors.dimTextGray}
        value={value}
        onChangeText={onChangeText}
      />
      {value ? (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <MaterialCommunityIcons name="close" size={20} color={colors.dimTextGray} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export const Heading = ({ level = 1, children, style }) => {
  const headingStyles = [
    level === 1 && styles.h1,
    level === 2 && styles.h2,
    level === 3 && styles.h3,
    style,
  ];

  return <Text style={headingStyles}>{children}</Text>;
};

export const Paragraph = ({ children, style, size = 'md' }) => {
  const textStyles = [
    size === 'md' && styles.body,
    size === 'sm' && styles.bodySm,
    style,
  ];

  return <Text style={textStyles}>{children}</Text>;
};

export const Divider = ({ style }) => <View style={[styles.divider, style]} />;

export const ScreenContainer = ({ children, style }) => (
  <ScrollView style={[styles.screenContainer, style]} showsVerticalScrollIndicator={false}>
    {children}
  </ScrollView>
);

export const CategoryChip = ({ label, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
};

export const ExpandableCard = ({ title, children, onPress, expanded }) => {
  return (
    <Card style={styles.expandableCard} onPress={onPress}>
      <View style={styles.expandableHeader}>
        <Text style={styles.expandableTitle}>{title}</Text>
        <MaterialCommunityIcons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={colors.neonGreen}
        />
      </View>
      {expanded && (
        <View style={styles.expandableContent}>
          <Divider style={{ marginBottom: theme.spacing.md }} />
          {children}
        </View>
      )}
    </Card>
  );
};

export const ListItem = ({ title, subtitle, onPress, icon, rightText }) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon && <MaterialCommunityIcons name={icon} size={20} color={colors.neonGreen} />}
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.listItemSubtitle}>{subtitle}</Text>}
      </View>
      {rightText && <Text style={styles.listItemRight}>{rightText}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardCharcoal,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: colors.borderGray,
  },
  button: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.neonGreen,
  },
  buttonSecondary: {
    backgroundColor: colors.purple,
  },
  buttonTertiary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.neonGreen,
  },
  buttonSm: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  buttonLg: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  badgePrimary: {
    backgroundColor: colors.neonGreen,
  },
  badgeSecondary: {
    backgroundColor: colors.purple,
  },
  badgeDanger: {
    backgroundColor: colors.criticalRed,
  },
  badgeWarning: {
    backgroundColor: colors.riskOrange,
  },
  badgeSm: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  badgeLg: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  badgeText: {
    color: colors.backgroundBlack,
    fontWeight: '600',
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.deepCharcoal,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: colors.borderGray,
    marginBottom: theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    color: colors.textWhite,
    fontSize: 16,
  },
  h1: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textWhite,
    marginBottom: theme.spacing.md,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.textWhite,
    marginBottom: theme.spacing.md,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textWhite,
    marginBottom: theme.spacing.sm,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.mutedTextGray,
    marginBottom: theme.spacing.sm,
  },
  bodySm: {
    fontSize: 12,
    lineHeight: 16,
    color: colors.mutedTextGray,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderGray,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.backgroundBlack,
    padding: theme.spacing.lg,
  },
  chip: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.borderGray,
    marginRight: theme.spacing.md,
    marginBottom: theme.spacing.md,
    backgroundColor: 'transparent',
  },
  chipActive: {
    backgroundColor: colors.neonGreen,
    borderColor: colors.neonGreen,
  },
  chipText: {
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: '500',
  },
  chipTextActive: {
    color: colors.backgroundBlack,
  },
  expandableCard: {
    marginBottom: theme.spacing.lg,
  },
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandableTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textWhite,
  },
  expandableContent: {
    marginTop: theme.spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderGray,
  },
  listItemContent: {
    flex: 1,
    marginHorizontal: theme.spacing.md,
  },
  listItemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textWhite,
  },
  listItemSubtitle: {
    fontSize: 12,
    color: colors.dimTextGray,
    marginTop: 2,
  },
  listItemRight: {
    fontSize: 14,
    color: colors.neonGreen,
    fontWeight: '600',
  },
});
