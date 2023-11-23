import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  "base": "/Notes-App-FullStack-React-FrontEnd-Part/",
  plugins: [react()],
})
