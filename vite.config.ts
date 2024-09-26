import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	build: {
		// 打包后文件目录
		outDir: 'dist',
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
		},
		lib: {
			entry: './index.ts',
			name: 'by-design',
			fileName: 'by-design',
			formats: ['es', 'umd', 'cjs']
		}
	},
	plugins: [react()]
});
