import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactRefresh from '@vitejs/plugin-react-refresh';
import EnvironmentPlugin from 'vite-plugin-environment';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  plugins: [react(), reactRefresh(), EnvironmentPlugin('all')],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
