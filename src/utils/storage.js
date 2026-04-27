import AsyncStorage from '@react-native-async-storage/async-storage';

// Daily rotation logic - same result for all users on the same day
export const getDailyIndex = (arrayLength) => {
  const EPOCH = new Date('2024-01-01').getTime();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysSinceEpoch = Math.floor((today.getTime() - EPOCH) / (1000 * 60 * 60 * 24));
  return daysSinceEpoch % arrayLength;
};

// AsyncStorage helpers
export const storageKeys = {
  ONBOARDING_DISMISSED: '@pam_onboarding_dismissed',
  FAVORITE_TERMS: '@pam_favorite_terms',
  COMPLETED_SCENARIOS: '@pam_completed_scenarios',
  LAST_OPENED: '@pam_last_opened',
};

export const storage = {
  async getFavoritedTerms() {
    try {
      const data = await AsyncStorage.getItem(storageKeys.FAVORITE_TERMS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading favorited terms:', error);
      return [];
    }
  },

  async addFavoriteTerm(termId) {
    try {
      const terms = await this.getFavoritedTerms();
      if (!terms.includes(termId)) {
        terms.push(termId);
        await AsyncStorage.setItem(storageKeys.FAVORITE_TERMS, JSON.stringify(terms));
      }
    } catch (error) {
      console.error('Error adding favorite term:', error);
    }
  },

  async removeFavoriteTerm(termId) {
    try {
      const terms = await this.getFavoritedTerms();
      const filtered = terms.filter(id => id !== termId);
      await AsyncStorage.setItem(storageKeys.FAVORITE_TERMS, JSON.stringify(filtered));
    } catch (error) {
      console.error('Error removing favorite term:', error);
    }
  },

  async getCompletedScenarios() {
    try {
      const data = await AsyncStorage.getItem(storageKeys.COMPLETED_SCENARIOS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading completed scenarios:', error);
      return [];
    }
  },

  async markScenarioComplete(scenarioId) {
    try {
      const completed = await this.getCompletedScenarios();
      if (!completed.includes(scenarioId)) {
        completed.push(scenarioId);
        await AsyncStorage.setItem(storageKeys.COMPLETED_SCENARIOS, JSON.stringify(completed));
      }
    } catch (error) {
      console.error('Error marking scenario complete:', error);
    }
  },

  async isOnboardingDismissed() {
    try {
      const dismissed = await AsyncStorage.getItem(storageKeys.ONBOARDING_DISMISSED);
      return dismissed === 'true';
    } catch (error) {
      console.error('Error checking onboarding state:', error);
      return false;
    }
  },

  async dismissOnboarding() {
    try {
      await AsyncStorage.setItem(storageKeys.ONBOARDING_DISMISSED, 'true');
    } catch (error) {
      console.error('Error dismissing onboarding:', error);
    }
  },
};
