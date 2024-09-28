import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/htmlToFigma/index.ts'),
      name: 'htmlToFigma',
      fileName: 'htmlToFigma'
    },
  },
})
