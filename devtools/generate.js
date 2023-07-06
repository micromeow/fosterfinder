const { generateTemplateFiles } = require('generate-template-files');

const config = require('../package.json');

generateTemplateFiles([
  {
    option: 'Storybook and Test Files for a UI Component',
    defaultCase: '(PascalCase)',
    entry: {
      folderPath: './devtools/templates/stories',
    },
    stringReplacers: [
      {
        question: 'What component do you want to make a story for?',
        slot: '__component__',
      },
    ],
    output: {
      path: './components/ui/',
      pathAndFileNameDefaultCase: '(PascalCase)',
      overwrite: true,
    },
  },
  {
    option: 'ADR (Architectural Decision Record',
    defaultCase: '(kebab-case)',
    entry: {
      folderPath: './devtools/templates/adr',
    },
    stringReplacers: [
      {
        question: 'What is the title of the ADR? (Long title)',
        slot: '**title**',
      },
      {
        question:
          'What would you like to name the file? (without the .md extension, in kebab-case)',
        slot: '__file_name__',
      },
    ],
    output: {
      path: './docs/adr/',
      pathAndFileNameDefaultCase: '(kebab-case)',
      overwrite: true,
    },
  },
]);
