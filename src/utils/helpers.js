  export const activeClasses = ['bg-indigo-600', 'text-white', 'shadow-md'];
  export const inactiveClasses = ['bg-gray-200', 'text-gray-600', 'hover:bg-gray-300', 'transition-all'];

export function updateCategoryStyles(allButtons, activeBtn) {

  allButtons.forEach(btn => {
    btn.classList.remove(...activeClasses);
    btn.classList.add(...inactiveClasses);
  });

  activeBtn.classList.remove(...inactiveClasses);
  activeBtn.classList.add(...activeClasses);
}

export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function createResultRow(word, isCorrect) {
  const row = document.createElement('tr');
  row.className = 'hover:bg-gray-50 transition-colors';
  row.innerHTML = `
    <td class="px-4 py-2 font-medium text-indigo-600">
      <details class="cursor-pointer">
        <summary class="list-none outline-none">${word.english}</summary>
        <div class="mt-2 text-sm text-gray-500 italic">
          Traducción: ${word.spanish} (${word.pron_pre || word.pron || ''})
        </div>
      </details>
    </td>
    <td class="px-4 py-2 text-center text-xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}">
      ${isCorrect ? '✓' : '✕'}
    </td>
  `;
  return row;
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
