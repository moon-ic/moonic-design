import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: 'index.ts',
			name: 'Bydesign-components',
			fileName: 'Bydesign-components'
		},
		minify: false,
		rollupOptions: {
			external: [/react.*/, 'react-dom'],
			output: {
				format: 'es',
				dir: 'dist'
			}
		}
	}
});
