import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.paper, { opacity: fadeAnim }]}>

        {/* Top rule */}
        <View style={styles.topRule} />

        {/* Header band */}
        <View style={styles.headerBand}>
          <Text style={styles.headerBandText}>✦  FIELD MANUAL · CYBERSECURITY  ✦</Text>
        </View>

        <View style={styles.topRule} />

        {/* CLASSIFIED stamp — top right */}
        <View style={styles.classifiedStamp}>
          <Text style={styles.classifiedText}>CLASSIFIED</Text>
        </View>

        {/* Main title block */}
        <View style={styles.titleBlock}>
          <Text style={styles.mainTitle}>THE PAM{'\n'}FIELD GUIDE</Text>
          <View style={styles.titleDivider} />
          <Text style={styles.byLine}>BY THE PAM INSIDER</Text>
        </View>

        {/* Classification box */}
        <View style={styles.classificationBox}>
          <Text style={styles.classificationLabel}>CLASSIFICATION</Text>
          <View style={styles.classificationDividerH} />
          <Text style={styles.classificationValue}>PRIVILEGED ACCESS</Text>
        </View>

        {/* Doc number */}
        <Text style={styles.docNumber}>FM-PAM-001  ·  EDITION 1.0  ·  2024</Text>

        {/* FOR AUTHORIZED PERSONNEL stamp — lower left */}
        <View style={styles.authorizedStamp}>
          <Text style={styles.authorizedText}>FOR AUTHORIZED PERSONNEL ONLY</Text>
        </View>

        {/* Bottom rule */}
        <View style={styles.topRule} />
        <View style={styles.bottomBand}>
          <Text style={styles.headerBandText}>✦  ✦  ✦  ✦  ✦  ✦  ✦  ✦  ✦  ✦  ✦</Text>
        </View>
        <View style={styles.topRule} />

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#160E07',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  paper: {
    backgroundColor: '#D6C898',
    width: '100%',
    maxWidth: 380,
    paddingHorizontal: 28,
    paddingVertical: 24,
    borderWidth: 3,
    borderColor: '#4A2E10',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 10 },
    shadowOpacity: 0.85,
    shadowRadius: 16,
    elevation: 16,
  },

  topRule: {
    height: 2,
    backgroundColor: '#4A2E10',
    marginVertical: 0,
  },
  headerBand: {
    backgroundColor: '#C4B07A',
    paddingVertical: 7,
    alignItems: 'center',
    marginBottom: 2,
    marginTop: 2,
  },
  headerBandText: {
    fontFamily: 'monospace',
    fontSize: 9,
    color: '#2A1506',
    letterSpacing: 2.5,
    fontWeight: '700',
  },
  bottomBand: {
    backgroundColor: '#C4B07A',
    paddingVertical: 7,
    alignItems: 'center',
    marginBottom: 2,
    marginTop: 2,
  },

  classifiedStamp: {
    alignSelf: 'flex-end',
    borderWidth: 3,
    borderColor: '#8B0000',
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginTop: 18,
    marginBottom: 6,
    transform: [{ rotate: '6deg' }],
  },
  classifiedText: {
    fontFamily: 'monospace',
    fontSize: 15,
    fontWeight: '900',
    color: '#8B0000',
    letterSpacing: 5,
  },

  titleBlock: {
    alignItems: 'center',
    marginVertical: 20,
  },
  mainTitle: {
    fontFamily: 'monospace',
    fontSize: 38,
    fontWeight: '900',
    color: '#140A02',
    letterSpacing: 5,
    textAlign: 'center',
    lineHeight: 46,
    textTransform: 'uppercase',
  },
  titleDivider: {
    width: '75%',
    height: 3,
    backgroundColor: '#4A2E10',
    marginVertical: 14,
  },
  byLine: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#3D2108',
    letterSpacing: 4,
    textAlign: 'center',
    fontWeight: '700',
  },

  classificationBox: {
    borderWidth: 2,
    borderColor: '#4A2E10',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 14,
    alignItems: 'center',
    backgroundColor: '#C8B07A',
  },
  classificationLabel: {
    fontFamily: 'monospace',
    fontSize: 8,
    color: '#3D2108',
    letterSpacing: 3,
    fontWeight: '600',
    marginBottom: 4,
  },
  classificationDividerH: {
    width: '60%',
    height: 1,
    backgroundColor: '#4A2E10',
    marginBottom: 6,
  },
  classificationValue: {
    fontFamily: 'monospace',
    fontSize: 15,
    fontWeight: '900',
    color: '#140A02',
    letterSpacing: 4,
  },

  docNumber: {
    fontFamily: 'monospace',
    fontSize: 8,
    color: '#5C3A18',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 16,
  },

  authorizedStamp: {
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#1F5C1F',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 18,
    marginLeft: 4,
    transform: [{ rotate: '-4deg' }],
    backgroundColor: 'transparent',
  },
  authorizedText: {
    fontFamily: 'monospace',
    fontSize: 8,
    fontWeight: '800',
    color: '#1F5C1F',
    letterSpacing: 2,
  },
});
