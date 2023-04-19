export const commentTypes = [
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

export const commentTypesWithEmoji = [
  { label: `${emojis.build} Build`, value: `${emojis.build} build` },
  { label: `${emojis.chore} Chore`, value: `${emojis.chore} chore` },
  { label: `${emojis.ci} CI`, value: `${emojis.ci} ci` },
  { label: `${emojis.docs} Docs`, value: `${emojis.docs} docs` },
  { label: `${emojis.feat} Feat`, value: `${emojis.feat} feat` },
  { label: `${emojis.fix} Fix`, value: `${emojis.fix} fix` },
  {
    label: `${emojis.refactor} Refactor`,
    value: `${emojis.refactor} refactor`
  },
  { label: `${emojis.style} Style`, value: `${emojis.style} style` },
  { label: `${emojis.test} Test`, value: `${emojis.test} test` },
  {
    label: `${emojis.security} Security`,
    value: `${emojis.security} security`
  }
];
