export const colors = {
  // Background
  backgroundBlack: '#050607',
  deepCharcoal: '#111318',
  cardCharcoal: '#181B22',
  
  // Borders & Dividers
  borderGray: '#2A2F3A',
  
  // Primary & Accent
  neonGreen: '#9DFF00',
  purple: '#8B5CF6',
  electricBlue: '#38BDF8',
  
  // Status
  riskOrange: '#F97316',
  criticalRed: '#EF4444',
  
  // Text
  textWhite: '#F8FAFC',
  mutedTextGray: '#CBD5E1',
  dimTextGray: '#64748B',
};

export const theme = {
  colors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      letterSpacing: 0.3,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
      letterSpacing: 0.2,
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    bodySm: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 16,
    },
    mono: {
      fontSize: 12,
      fontFamily: 'monospace',
    },
  },
};
