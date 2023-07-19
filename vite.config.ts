import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5050,
    open: false,
    cors: true,
    proxy: {
      '/api': {
        target: "http://localhost:9653",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	css: {
		preprocessorOptions: {
		},
	},
	plugins: [
		vue(),
		Components({
			resolvers: [
				AntDesignVueResolver({
				}),
			],
		}),
	],
	base:'./'
});
