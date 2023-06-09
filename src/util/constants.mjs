const types = [
  { value: 'build', label: 'Build' },
  { value: 'chore', label: 'Chore' },
  { value: 'ci', label: 'CI' },
  { value: 'docs', label: 'Docs' },
  { value: 'feat', label: 'Feat' },
  { value: 'fix', label: 'Fix' },
  { value: 'refactor', label: 'Refactor' },
  { value: 'style', label: 'Style' },
  { value: 'test', label: 'Test' },
  { value: 'security', label: 'Security' }
];

const emojis = {
  build: '🔨',
  chore: '🔧',
  ci: '🔬',
  docs: '📝',
  feat: '✨',
  fix: '🐞',
  refactor: '🔨',
  style: '💅',
  test: '🔬',
  security: '🔒'
};

export const commitTypes = types.map((commitType) => {
  return commitType.value;
});

export const commitTypesWithEmoji = types.map((commitType) => {
  return `${emojis[commitType.value]} ${commitType.value}`;
});

export const flags = {
  saveEmoji: {
    type: Boolean,
    description: 'enable emoji',
    default: false,
    alias: 'e' //enable  emoji
  },
  deleteEmoji: {
    type: Boolean,
    description: 'disable emoji',
    alias: 'd' //disable emoji
  }
};
