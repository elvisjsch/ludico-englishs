import { getVerbsByCategory} from '../data/index.js';
import { irregularVerbs} from '../data/irregularVerbs.js';
import { regularVerbs} from '../data/regularVerbs.js';
import { regularExamples, irregularExamples} from '../data/examples.js';
import { speak } from '../utils/speech.js';
import { updateCategoryStyles } from '../utils/helpers.js';

export function initVerbTable(elements) {
  renderVerbs('reg', elements);
  setupCategoryListeners(elements);
}

function setupCategoryListeners(elements) {
  elements.categoryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = e.currentTarget.dataset.category;
      updateCategoryStyles(elements.categoryButtons, e.currentTarget);
      renderVerbs(category, elements);
    });
  });
}

function renderVerbs(category, elements) {
  const verbs = getVerbsByCategory(category);
  const isConnective = category === 'conect';

  if (isConnective) {
    renderConnectives(verbs, elements);
  } else {
    const examples = category === 'irreg' ? irregularExamples : regularExamples;
    renderVerbTable(verbs, examples, elements);
  }
}

function renderVerbTable(verbs, examples, elements) {
  const fragment = document.createDocumentFragment();
  elements.statsTableBody.innerHTML = '';

  document.getElementById('table-verbo').classList.remove('hidden');
  document.getElementById('table-conect').classList.add('hidden');

  verbs.forEach((verb, index) => {
    const example = examples[index] || {};
    const row = createVerbRow(verb, example);
    fragment.appendChild(row);
  });

  elements.statsTableBody.appendChild(fragment);
}

function renderConnectives(connectives, elements) {
  const fragment = document.createDocumentFragment();
  elements.statsTableBodys.innerHTML = '';

  document.getElementById('table-verbo').classList.add('hidden');
  document.getElementById('table-conect').classList.remove('hidden');

  connectives.forEach(item => {
    const row = createConnectiveRow(item);
    fragment.appendChild(row);
  });

  elements.statsTableBodys.appendChild(fragment);
}

function createVerbRow(verb, example) {
  const row = document.createElement('tr');
  row.className = 'hover:bg-indigo-50/30 transition-colors border-b border-gray-50';

  row.innerHTML = `
    <td class="px-6 py-4 text-base font-medium text-indigo-600">
      <div class="flex items-center gap-2">
        <button class="speak-btn p-1.5 bg-indigo-100 hover:bg-indigo-200 rounded-full transition-colors" title="Escuchar">
          <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
          </svg>
        </button>
        <details name="verb-details" class="group cursor-pointer">
          <summary class="list-none outline-none font-bold hover:text-indigo-800 transition-colors flex items-center justify-start gap-2">
            <svg class="w-3 h-3 transform group-open:rotate-90 transition-transform text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path>
            </svg>
            <div class="flex flex-col">
              ${verb.english}
              <span class="text-[14px] text-stone-400 font-normal">(${verb.pron_pre || '---'})</span>
            </div>
          </summary>
          <div class="mt-2 p-3 bg-indigo-50/50 border-l-2 border-indigo-400 rounded-r-lg text-left text-gray-600">
            <p class="text-sm"><strong>Pres:</strong> "${example.present || ''}"</p>
            <p class="text-sm"><strong>Past:</strong> "${example.past || ''}"</p>
            <p class="text-sm"><strong>Ger:</strong> "${example.gerund || ''}"</p>
          </div>
        </details>
      </div>
    </td>
    <td class="px-6 py-4 text-center">
      <div class="flex flex-col cursor-pointer hover:text-indigo-600">
        <span class="text-base text-gray-600 font-medium">${verb.third_person}</span>
        <span class="text-[14px] text-stone-400 font-normal">(${verb.pron_thp})</span>
      </div>
    </td>
    <td class="px-6 py-4 text-center">
      <div class="flex flex-col cursor-pointer hover:text-indigo-600">
        <span class="text-base text-gray-600 font-medium">${verb.past}</span>
        <span class="text-[14px] text-stone-400 font-normal">(${verb.pron_past || '---'})</span>
      </div>
    </td>
    <td class="px-6 py-4 text-center">
      <div class="flex flex-col cursor-pointer hover:text-indigo-600">
        <span class="text-base text-gray-500 font-medium">${verb.gerundio}</span>
        <span class="text-[14px] text-stone-400 font-normal">(${verb.pron_ger || '---'})</span>
      </div>
    </td>
    <td class="px-6 py-4 text-center bg-blue-50/30">
      <span class="text-base font-bold text-blue-600">${verb.spanish}</span>
    </td>
  `;

  row.querySelector('.speak-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    speak(verb.english);
  });

  const cells = row.querySelectorAll('td');
  if (cells[1]) cells[1].addEventListener('click', () => speak(verb.third_person));
  if (cells[2]) cells[2].addEventListener('click', () => speak(verb.past));
  if (cells[3]) cells[3].addEventListener('click', () => speak(verb.gerundio));

  return row;
}

function createConnectiveRow(item) {
  const row = document.createElement('tr');
  row.className = 'hover:bg-indigo-50/30 transition-colors border-b border-gray-50';

  row.innerHTML = `
    <td class="px-6 py-4 text-base font-medium text-indigo-600">
      <div class="flex items-center gap-2">
        <button class="speak-btn p-1.5 bg-indigo-100 hover:bg-indigo-200 rounded-full transition-colors" title="Escuchar">
          <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
          </svg>
        </button>
        <details name="verb-details" class="group cursor-pointer">
          <summary class="list-none outline-none font-bold hover:text-indigo-800 transition-colors flex items-center justify-start gap-2">
            <svg class="w-3 h-3 transform group-open:rotate-90 transition-transform text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 5l7 7-7 7"></path>
            </svg>
            <div class="flex flex-col">
              ${item.english}
              <span class="text-[14px] text-stone-400 font-normal">(${item.pron || '---'})</span>
            </div>
          </summary>
          <div class="mt-2 p-3 bg-indigo-50/50 border-l-2 border-indigo-400 rounded-r-lg text-left text-gray-600">
            <p class="text-sm"><strong>Ex:</strong> "${item.example || ''}"</p>
          </div>
        </details>
      </div>
    </td>
    <td class="px-6 py-4 text-center bg-blue-50/30">
      <span class="text-base font-bold text-blue-600">${item.spanish}</span>
    </td>
  `;

  row.querySelector('.speak-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    speak(item.english);
  });

  return row;
}

//export { categories };
