const STORAGE_KEY = 'playIngles_progress';

const defaultProgress = {
  correct: 0,
  incorrect: 0,
  history: [],
  lastCategory: 'reg'
};

export const storage = {
  getProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : { ...defaultProgress };
    } catch (error) {
      console.error('Error reading progress:', error);
      return { ...defaultProgress };
    }
  },

  saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  },

  updateScore(isCorrect, word) {
    const progress = this.getProgress();
    
    if (isCorrect) {
      progress.correct++;
    } else {
      progress.incorrect++;
    }

    progress.history.push({
      word: word.english,
      translation: word.spanish,
      correct: isCorrect,
      timestamp: Date.now()
    });

    this.saveProgress(progress);
    return progress;
  },

  setCategory(category) {
    const progress = this.getProgress();
    progress.lastCategory = category;
    this.saveProgress(progress);
  },

  getLastCategory() {
    const progress = this.getProgress();
    return progress.lastCategory || 'reg';
  },

  resetProgress() {
    this.saveProgress({ ...defaultProgress });
    return { ...defaultProgress };
  },

  getStats() {
    const progress = this.getProgress();
    return {
      correct: progress.correct,
      incorrect: progress.incorrect,
      total: progress.correct + progress.incorrect,
      percentage: progress.correct + progress.incorrect > 0 
        ? Math.round((progress.correct / (progress.correct + progress.incorrect)) * 100)
        : 0
    };
  }
};
