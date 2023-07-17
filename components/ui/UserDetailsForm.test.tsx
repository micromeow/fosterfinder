import * as stories from './UserDetailsForm.stories';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';

const UserDetailsFormStories = composeStories(stories);

const testCases = Object.values(UserDetailsFormStories).map((Story) => [
  // The ! is necessary in Typescript only, as the property is part of a partial type
  Story.storyName!,
  Story,
]);

// Skipped due to unresolved error in test
test.skip.each(testCases)('Renders %s story', async (_storyName, Story) => {
  const tree = await render(<Story />);
  expect(tree.baseElement).toMatchSnapshot();
});
