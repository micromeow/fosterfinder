import * as stories from './AnimalCard.stories';
import { render } from '@testing-library/react';
import { composeStories } from '@storybook/react';

const AnimalCardStories = composeStories(stories);

const testCases = Object.values(AnimalCardStories).map((Story) => [
  // The ! is necessary in Typescript only, as the property is part of a partial type
  Story.storyName!,
  Story,
]);

test.each(testCases)('Renders %s story', async (_storyName, Story) => {
  const tree = await render(<Story />);
  expect(tree.baseElement).toMatchSnapshot();
});
