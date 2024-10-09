import React from 'react';

export default {
	title: 'Welcome page',
	parameters: {
		docs: {
			description: {
				component: '这是一个简单的欢迎页组件，展示如何安装组件库。'
			}
		}
	}
};

export const Welcome = () => (
	<>
		<h1>欢迎来到 By-design组件库</h1>
		<h3>安装试试</h3>
		<code>npm install By-design --save</code>
	</>
);
