// vite.config.ts
import { defineConfig } from "file:///C:/Users/HP/OneDrive/Documents/EcommerceAndelaTeamProjectFE/ecommerce-app-cogito-fe/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/HP/OneDrive/Documents/EcommerceAndelaTeamProjectFE/ecommerce-app-cogito-fe/node_modules/@vitejs/plugin-react/dist/index.mjs";
import reactRefresh from "file:///C:/Users/HP/OneDrive/Documents/EcommerceAndelaTeamProjectFE/ecommerce-app-cogito-fe/node_modules/@vitejs/plugin-react-refresh/index.js";
import path from "path";
import dotenv from "file:///C:/Users/HP/OneDrive/Documents/EcommerceAndelaTeamProjectFE/ecommerce-app-cogito-fe/node_modules/dotenv/lib/main.js";
import EnvironmentPlugin from "file:///C:/Users/HP/OneDrive/Documents/EcommerceAndelaTeamProjectFE/ecommerce-app-cogito-fe/node_modules/vite-plugin-environment/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\HP\\OneDrive\\Documents\\EcommerceAndelaTeamProjectFE\\ecommerce-app-cogito-fe";
dotenv.config();
var vite_config_default = defineConfig({
  plugins: [react(), reactRefresh(), EnvironmentPlugin("all")],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__vite_injected_original_dirname, "src") }]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxIUFxcXFxPbmVEcml2ZVxcXFxEb2N1bWVudHNcXFxcRWNvbW1lcmNlQW5kZWxhVGVhbVByb2plY3RGRVxcXFxlY29tbWVyY2UtYXBwLWNvZ2l0by1mZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcSFBcXFxcT25lRHJpdmVcXFxcRG9jdW1lbnRzXFxcXEVjb21tZXJjZUFuZGVsYVRlYW1Qcm9qZWN0RkVcXFxcZWNvbW1lcmNlLWFwcC1jb2dpdG8tZmVcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0hQL09uZURyaXZlL0RvY3VtZW50cy9FY29tbWVyY2VBbmRlbGFUZWFtUHJvamVjdEZFL2Vjb21tZXJjZS1hcHAtY29naXRvLWZlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCByZWFjdFJlZnJlc2ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QtcmVmcmVzaCc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcbmltcG9ydCBFbnZpcm9ubWVudFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lbnZpcm9ubWVudCc7XHJcblxyXG5kb3RlbnYuY29uZmlnKCk7XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCksIHJlYWN0UmVmcmVzaCgpLCBFbnZpcm9ubWVudFBsdWdpbignYWxsJyldLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiBbeyBmaW5kOiAnQCcsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJykgfV0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeWIsU0FBUyxvQkFBb0I7QUFDdGQsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFlBQVk7QUFDbkIsT0FBTyx1QkFBdUI7QUFMOUIsSUFBTSxtQ0FBbUM7QUFPekMsT0FBTyxPQUFPO0FBRWQsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxhQUFhLEdBQUcsa0JBQWtCLEtBQUssQ0FBQztBQUFBLEVBQzNELFNBQVM7QUFBQSxJQUNQLE9BQU8sQ0FBQyxFQUFFLE1BQU0sS0FBSyxhQUFhLEtBQUssUUFBUSxrQ0FBVyxLQUFLLEVBQUUsQ0FBQztBQUFBLEVBQ3BFO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
