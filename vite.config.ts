/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

export default defineConfig({
	build: {
		// 打包后文件目录
		outDir: 'dist',
		lib: {
			entry: './packages/components/index.tsx',
			name: 'by-design',
			fileName: 'by-design',
			formats: ['es', 'umd', 'cjs']
		},
		// 压缩
		minify: false,
		rollupOptions: {
			// 忽略打包的外部依赖
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM'
				},
				dir: 'dist'
			}
		}
	},
	plugins: [
		react(),
		dts({
			tsConfigFilePath: './tsconfig.json'
		})
	],
	test: {
		globals: true,
		environment: 'jsdom',
		coverage: {
			reporter: ['text', 'json', 'html']
		}
	}
});
