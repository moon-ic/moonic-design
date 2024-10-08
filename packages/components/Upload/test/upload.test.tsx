import React from 'react';
import axios from 'axios';
import { beforeEach, describe, expect, it, vitest, type Mocked } from 'vitest';
import {
	render,
	RenderResult,
	fireEvent,
	waitFor,
	createEvent
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Upload, { UploadProps } from '../upload';

vitest.mock('../Icon/icon', () => {
	return ({ icon, onClick }: { icon: string; onClick?: () => void }) => {
		return <span onClick={onClick}>{icon}</span>;
	};
});
vitest.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

const testProps: UploadProps = {
	action: 'fakeurl.com',
	onSuccess: vitest.fn(),
	onChange: vitest.fn(),
	onRemove: vitest.fn(),
	drag: true
};
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' });
describe('test upload component', () => {
	beforeEach(() => {
		wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
		fileInput = wrapper.container.querySelector(
			'.file-input'
		) as HTMLInputElement;
		uploadArea = wrapper.queryByText('Click to upload') as HTMLElement;
	});
	it('upload process should works fine', async () => {
		const { queryByText, getByText } = wrapper;
		// mockedAxios.post.mockImplementation(() => {
		//   return Promise.resolve({'data': 'cool'})
		// })
		mockedAxios.post.mockResolvedValue({ data: 'cool' });
		expect(uploadArea).toBeInTheDocument();
		expect(fileInput).not.toBeVisible();
		fireEvent.change(fileInput, { target: { files: [testFile] } });
		expect(queryByText('spinner')).toBeInTheDocument();
		await waitFor(() => {
			expect(queryByText('test.png')).toBeInTheDocument();
		});
		expect(queryByText('check-circle')).toBeInTheDocument();
		expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile);
		expect(testProps.onChange).toHaveBeenCalledWith(testFile);

		//remove the uploaded file
		expect(queryByText('times')).toBeInTheDocument();
		fireEvent.click(getByText('times'));
		expect(queryByText('test.png')).not.toBeInTheDocument();
		expect(testProps.onRemove).toHaveBeenCalledWith(
			expect.objectContaining({
				raw: testFile,
				status: 'success',
				name: 'test.png'
			})
		);
	});
	it('drag and drop files should works fine', async () => {
		fireEvent.dragOver(uploadArea);
		expect(uploadArea).toHaveClass('is-dragover');
		fireEvent.dragLeave(uploadArea);
		expect(uploadArea).not.toHaveClass('is-dragover');
		const mockDropEvent = createEvent.drop(uploadArea);
		Object.defineProperty(mockDropEvent, 'dataTransfer', {
			value: {
				files: [testFile]
			}
		});
		fireEvent(uploadArea, mockDropEvent);

		await waitFor(() => {
			expect(wrapper.queryByText('test.png')).toBeInTheDocument();
		});
		expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile);
	});
});
