import React from 'react';
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import AutoComplete from './autoComplete';
interface LakerPlayerProps {
	value: string;
	number: number;
}
interface GithubUserProps {
	login: string;
	url: string;
	avatar_url: string;
}

const SimpleComplete = () => {
	const handleFetch = (query: string) => {
		return fetch(`https://api.github.com/search/users?q=${query}`)
			.then((res) => res.json())
			.then(({ items }) => {
				console.log(items);
				return items
					.slice(0, 10)
					.map((item: any) => ({ value: item.login, ...item }));
			});
	};

	return (
		<AutoComplete
			fetchSuggestions={handleFetch}
			onSelect={action('selected')}
		/>
	);
};

// Meta configuration for Storybook
export default {
	title: 'AutoComplete Component',
	component: AutoComplete
} as Meta;

// Define story
const Template: Story = () => <SimpleComplete />;

// Export the story using composeStory style
export const AutoCompleteStory = Template.bind({});
