import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  "base": "/FullStack-NotesApp-using-Node-Frontend-Code/",
  plugins: [react()],
})
