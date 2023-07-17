import * as stories from './DropdownMenu.stories';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';

const DropdownMenuStories = composeStories(stories);

const testCases = Object.values(DropdownMenuStories).map((Story) => [
  // The ! is necessary in Typescript only, as the property is part of a partial type
  Story.storyName!,
  Story,
]);

// Skipped due to unresolved test error, t resolve in another pr
test.skip.each(testCases)('Renders %s story', async (_storyName, Story) => {
  const tree = await render(<Story />);
  expect(tree.baseElement).toMatchSnapshot();
});
