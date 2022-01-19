/**
 * Component Generator
 */

/* eslint strict: ["off"] */

'use strict';

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add an unconnected component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Button',
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'wantCustomHook',
      default: false,
      message: 'Do you want to have custom hook for this component?',
    },
    {
      type: 'confirm',
      name: 'wantStyledComponent',
      default: true,
      message: 'Do you want to have styled-component for this component?',
    },
    {
      type: 'confirm',
      name: 'wantMergeClasses',
      default: true,
      message: 'Do you want to have merge classes util for this component?',
    },
  ],
  actions: (data) => {
    const actions = [
      {
        type: 'add',
        path: '../src/components/{{properCase name}}/{{properCase name}}.tsx',
        templateFile: './component/component.ts.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/components/{{properCase name}}/{{camelCase name}}.module.css',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../src/components/{{properCase name}}/index.ts',
        templateFile: './component/entry.ts.hbs',
        abortOnFail: true,
      },
    ];

    // If the user wants custom hook
    if (data.wantCustomHook) {
      actions.push({
        type: 'add',
        path: '../src/components/{{properCase name}}/use{{properCase name}}.ts',
        templateFile: './component/customHook.ts.hbs',
        abortOnFail: true,
      });
    }

    // If the user wants styled-component
    if (data.wantStyledComponent) {
      actions.push({
        type: 'add',
        path: '../../app/components/{{properCase name}}/{{properCase name}}Styled.ts',
        templateFile: './component/styled.ts.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/components/',
    });

    return actions;
  },
};
