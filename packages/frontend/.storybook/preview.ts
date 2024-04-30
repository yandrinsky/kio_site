import type { Preview } from '@storybook/react';
import { withRouter } from 'storybook-addon-remix-react-router';
import '../src/styles/normalize.css';
import '../src/styles/index.css';
import '../src/styles/utils.module.css';

const preview: Preview = {
  decorators: [withRouter],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
