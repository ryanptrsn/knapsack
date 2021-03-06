import React from 'react';
import { CodeBlock, languageList } from '@knapsack/design-system';
import { Slice } from './types';

type Data = {
  items: {
    name?: string;
    language?: string;
    code?: string;
  }[];
};

export const codeBlockSlice: Slice<Data> = {
  id: 'code-block-slice',
  title: 'Code Block',
  description: 'A tabbed panel of code blocks with syntax highlighting',
  // hasMinimumViableData: data => true,
  render: props => {
    const { data } = props;
    const { items } = data;
    // // @todo improve, maybe considering `hasMinimumViableData`
    // if (items.length === 0) return <h5>Not enough data</h5>;
    return <CodeBlock items={items} key={JSON.stringify(items)} />;
  },
  schema: {
    title: 'Code Block Slice',
    type: 'object',
    required: [],
    properties: {
      items: {
        type: 'array',
        default: [],
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            language: {
              type: 'string',
              enum: languageList,
              default: languageList[0],
            },
            code: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  uiSchema: {
    items: {
      'ui:detailsOpen': true,
      items: {
        classNames: 'ks-rjsf-custom-object-grid-2',
        code: {
          'ui:widget': 'textarea',
          'ui:options': {
            rows: 5,
          },
        },
      },
    },
  },
  initialData: {
    items: [
      {
        name: 'Some Code',
        language: 'css',
        code: `
body {
  z-index: 42;
}
        `.trim(),
      },
    ],
  },
};
