// vite.config.ts
import path from "node:path";
import process from "node:process";
import Uni from "file:///F:/github%20project/travel_service/node_modules/.pnpm/@uni-helper+plugin-uni@0.1.0_@dcloudio+vite-plugin-uni@3.0.0-4060620250520001_postcss@8.4.49__2erfvoz25mjj5nyaoo2723rbay/node_modules/@uni-helper/plugin-uni/src/index.js";
import Components from "file:///F:/github%20project/travel_service/node_modules/.pnpm/@uni-helper+vite-plugin-uni-components@0.2.0_rollup@4.41.1/node_modules/@uni-helper/vite-plugin-uni-components/dist/index.mjs";
import UniLayouts from "file:///F:/github%20project/travel_service/node_modules/.pnpm/@uni-helper+vite-plugin-uni-layouts@0.1.11_rollup@4.41.1/node_modules/@uni-helper/vite-plugin-uni-layouts/dist/index.mjs";
import UniManifest from "file:///F:/github%20project/travel_service/node_modules/.pnpm/@uni-helper+vite-plugin-uni-manifest@0.2.8_vite@5.2.8_@types+node@20.17.9_sass@1.77.8_terser@5.36.0_/node_modules/@uni-helper/vite-plugin-uni-manifest/dist/index.mjs";
import UniPages from "file:///F:/github%20project/travel_service/node_modules/.pnpm/@uni-helper+vite-plugin-uni-pages@0.2.29_vite@5.2.8_@types+node@20.17.9_sass@1.77.8_terser@5.36.0_/node_modules/@uni-helper/vite-plugin-uni-pages/dist/index.mjs";
import UniPlatform from "file:///F:/github%20project/travel_service/node_modules/.pnpm/@uni-helper+vite-plugin-uni-platform@0.0.5/node_modules/@uni-helper/vite-plugin-uni-platform/dist/index.mjs";
import Optimization from "file:///F:/github%20project/travel_service/node_modules/.pnpm/@uni-ku+bundle-optimizer@1.3.3_postcss@8.4.49_rollup@4.41.1_vite@5.2.8_@types+node@20.17.9_sa_a4xv2oaxrfnd2f23tf2dxlp77i/node_modules/@uni-ku/bundle-optimizer/dist/index.mjs";
import dayjs from "file:///F:/github%20project/travel_service/node_modules/.pnpm/dayjs@1.11.10/node_modules/dayjs/dayjs.min.js";
import { visualizer } from "file:///F:/github%20project/travel_service/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@4.41.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import UnoCSS from "file:///F:/github%20project/travel_service/node_modules/.pnpm/unocss@65.4.2_postcss@8.4.49_rollup@4.41.1_vite@5.2.8_@types+node@20.17.9_sass@1.77.8_terser@_2fevxufamkwgjybl6imbmjzg54/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///F:/github%20project/travel_service/node_modules/.pnpm/unplugin-auto-import@0.17.8_rollup@4.41.1/node_modules/unplugin-auto-import/dist/vite.js";
import { defineConfig, loadEnv } from "file:///F:/github%20project/travel_service/node_modules/.pnpm/vite@5.2.8_@types+node@20.17.9_sass@1.77.8_terser@5.36.0/node_modules/vite/dist/node/index.js";
import ViteRestart from "file:///F:/github%20project/travel_service/node_modules/.pnpm/vite-plugin-restart@0.4.2_vite@5.2.8_@types+node@20.17.9_sass@1.77.8_terser@5.36.0_/node_modules/vite-plugin-restart/dist/index.js";
var vite_config_default = ({ command, mode }) => {
  console.log("command, mode -> ", command, mode);
  const { UNI_PLATFORM } = process.env;
  console.log("UNI_PLATFORM -> ", UNI_PLATFORM);
  const env = loadEnv(mode, path.resolve(process.cwd(), "env"));
  const {
    VITE_APP_PORT,
    VITE_SERVER_BASEURL,
    VITE_DELETE_CONSOLE,
    VITE_SHOW_SOURCEMAP,
    VITE_APP_PUBLIC_BASE,
    VITE_APP_PROXY,
    VITE_APP_PROXY_PREFIX
  } = env;
  console.log("\u73AF\u5883\u53D8\u91CF env -> ", env);
  return defineConfig({
    envDir: "./env",
    // 自定义env目录
    base: VITE_APP_PUBLIC_BASE,
    plugins: [
      UniPages({
        exclude: ["**/components/**/**.*"],
        subPackages: ["src/packages/public", "src/packages/home", "src/packages/mine", "src/packages/news", "src/packages/order"],
        dts: "src/types/uni-pages.d.ts"
      }),
      UniLayouts(),
      UniPlatform(),
      UniManifest(),
      // UniXXX 需要在 Uni 之前引入
      {
        // 临时解决 dcloudio 官方的 @dcloudio/uni-mp-compiler 出现的编译 BUG
        // 参考 github issue: https://github.com/dcloudio/uni-app/issues/4952
        // 自定义插件禁用 vite:vue 插件的 devToolsEnabled，强制编译 vue 模板时 inline 为 true
        name: "fix-vite-plugin-vue",
        configResolved(config) {
          const plugin = config.plugins.find((p) => p.name === "vite:vue");
          if (plugin && plugin.api && plugin.api.options) {
            plugin.api.options.devToolsEnabled = false;
          }
        }
      },
      UnoCSS(),
      AutoImport({
        imports: ["vue", "uni-app"],
        dts: "src/types/auto-import.d.ts",
        dirs: ["src/hooks"],
        // 自动导入 hooks
        vueTemplate: true
        // default false
      }),
      // Optimization 插件需要 page.json 文件，故应在 UniPages 插件之后执行
      Optimization({
        enable: {
          "optimization": true,
          "async-import": true,
          "async-component": true
        },
        dts: {
          base: "src/types"
        },
        logger: false
      }),
      ViteRestart({
        // 通过这个插件，在修改vite.config.js文件则不需要重新运行也生效配置
        restart: ["vite.config.js"]
      }),
      // h5环境增加 BUILD_TIME 和 BUILD_BRANCH
      UNI_PLATFORM === "h5" && {
        name: "html-transform",
        transformIndexHtml(html) {
          return html.replace("%BUILD_TIME%", dayjs().format("YYYY-MM-DD HH:mm:ss"));
        }
      },
      // 打包分析插件，h5 + 生产环境才弹出
      UNI_PLATFORM === "h5" && mode === "production" && visualizer({
        filename: "./node_modules/.cache/visualizer/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true
      }),
      // 只有在 app 平台时才启用 copyNativeRes 插件
      // UNI_PLATFORM === 'app' && copyNativeRes(),
      Components({
        extensions: ["vue"],
        deep: true,
        // 是否递归扫描子目录，
        directoryAsNamespace: false,
        // 是否把目录名作为命名空间前缀，true 时组件名为 目录名+组件名，
        dts: "src/types/components.d.ts"
        // 自动生成的组件类型声明文件路径（用于 TypeScript 支持）
      }),
      Uni()
    ],
    define: {
      __UNI_PLATFORM__: JSON.stringify(UNI_PLATFORM),
      __VITE_APP_PROXY__: JSON.stringify(VITE_APP_PROXY)
    },
    css: {
      postcss: {
        plugins: [
          // autoprefixer({
          //   // 指定目标浏览器
          //   overrideBrowserslist: ['> 1%', 'last 2 versions'],
          // }),
        ]
      }
    },
    resolve: {
      alias: {
        "@": path.join(process.cwd(), "./src"),
        "@img": path.join(process.cwd(), "./src/static/images")
      }
    },
    server: {
      host: "0.0.0.0",
      hmr: true,
      port: Number.parseInt(VITE_APP_PORT, 10),
      // 仅 H5 端生效，其他端不生效（其他端走build，不走devServer)
      proxy: JSON.parse(VITE_APP_PROXY) ? {
        [VITE_APP_PROXY_PREFIX]: {
          target: VITE_SERVER_BASEURL,
          changeOrigin: true,
          rewrite: (path2) => path2.replace(new RegExp(`^${VITE_APP_PROXY_PREFIX}`), "")
        }
      } : void 0
    },
    esbuild: {
      drop: VITE_DELETE_CONSOLE === "true" ? ["console", "debugger"] : ["debugger"]
    },
    build: {
      sourcemap: false,
      // 方便非h5端调试
      // sourcemap: VITE_SHOW_SOURCEMAP === 'true', // 默认是false
      target: "es6",
      // 开发环境不用压缩
      minify: mode === "development" ? false : "esbuild"
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxnaXRodWIgcHJvamVjdFxcXFx0cmF2ZWxfc2VydmljZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcZ2l0aHViIHByb2plY3RcXFxcdHJhdmVsX3NlcnZpY2VcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L2dpdGh1YiUyMHByb2plY3QvdHJhdmVsX3NlcnZpY2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgVW5pIGZyb20gJ0B1bmktaGVscGVyL3BsdWdpbi11bmknXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktY29tcG9uZW50cydcbi8vIEBzZWUgaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktbGF5b3V0c1xuaW1wb3J0IFVuaUxheW91dHMgZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLWxheW91dHMnXG4vLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1tYW5pZmVzdFxuaW1wb3J0IFVuaU1hbmlmZXN0IGZyb20gJ0B1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1tYW5pZmVzdCdcbi8vIEBzZWUgaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktcGFnZXNcbmltcG9ydCBVbmlQYWdlcyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktcGFnZXMnXG4vLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1wbGF0Zm9ybVxuLy8gXHU5NzAwXHU4OTgxXHU0RTBFIEB1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1wYWdlcyBcdTYzRDJcdTRFRjZcdTRFMDBcdThENzdcdTRGN0ZcdTc1MjhcbmltcG9ydCBVbmlQbGF0Zm9ybSBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktcGxhdGZvcm0nXG4vKipcbiAqIFx1NTIwNlx1NTMwNVx1NEYxOFx1NTMxNlx1MzAwMVx1NkEyMVx1NTc1N1x1NUYwMlx1NkI2NVx1OERFOFx1NTMwNVx1OEMwM1x1NzUyOFx1MzAwMVx1N0VDNFx1NEVGNlx1NUYwMlx1NkI2NVx1OERFOFx1NTMwNVx1NUYxNVx1NzUyOFxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdW5pLWt1L2J1bmRsZS1vcHRpbWl6ZXJcbiAqL1xuaW1wb3J0IE9wdGltaXphdGlvbiBmcm9tICdAdW5pLWt1L2J1bmRsZS1vcHRpbWl6ZXInXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IFZpdGVSZXN0YXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLXJlc3RhcnQnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCAoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcbiAgLy8gQHNlZSBodHRwczovL3Vub2Nzcy5kZXYvXG4gIC8vIGNvbnN0IFVub0NTUyA9IChhd2FpdCBpbXBvcnQoJ3Vub2Nzcy92aXRlJykpLmRlZmF1bHRcbiAgLy8gY29uc29sZS5sb2cobW9kZSA9PT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIC8vIHRydWVcblxuICAvLyBtb2RlOiBcdTUzM0FcdTUyMDZcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdThGRDhcdTY2MkZcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcbiAgY29uc29sZS5sb2coJ2NvbW1hbmQsIG1vZGUgLT4gJywgY29tbWFuZCwgbW9kZSlcbiAgLy8gcG5wbSBkZXY6aDUgXHU2NUY2XHU1Rjk3XHU1MjMwID0+IHNlcnZlIGRldmVsb3BtZW50XG4gIC8vIHBucG0gYnVpbGQ6aDUgXHU2NUY2XHU1Rjk3XHU1MjMwID0+IGJ1aWxkIHByb2R1Y3Rpb25cbiAgLy8gcG5wbSBkZXY6bXAtd2VpeGluIFx1NjVGNlx1NUY5N1x1NTIzMCA9PiBidWlsZCBkZXZlbG9wbWVudCAoXHU2Q0U4XHU2MTBGXHU1MzNBXHU1MjJCXHVGRjBDY29tbWFuZFx1NEUzQWJ1aWxkKVxuICAvLyBwbnBtIGJ1aWxkOm1wLXdlaXhpbiBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgcHJvZHVjdGlvblxuICAvLyBwbnBtIGRldjphcHAgXHU2NUY2XHU1Rjk3XHU1MjMwID0+IGJ1aWxkIGRldmVsb3BtZW50IChcdTZDRThcdTYxMEZcdTUzM0FcdTUyMkJcdUZGMENjb21tYW5kXHU0RTNBYnVpbGQpXG4gIC8vIHBucG0gYnVpbGQ6YXBwIFx1NjVGNlx1NUY5N1x1NTIzMCA9PiBidWlsZCBwcm9kdWN0aW9uXG4gIC8vIGRldiBcdTU0OEMgYnVpbGQgXHU1NDdEXHU0RUU0XHU1M0VGXHU0RUU1XHU1MjA2XHU1MjJCXHU0RjdGXHU3NTI4IC5lbnYuZGV2ZWxvcG1lbnQgXHU1NDhDIC5lbnYucHJvZHVjdGlvbiBcdTc2ODRcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcblxuICBjb25zdCB7IFVOSV9QTEFURk9STSB9ID0gcHJvY2Vzcy5lbnZcbiAgY29uc29sZS5sb2coJ1VOSV9QTEFURk9STSAtPiAnLCBVTklfUExBVEZPUk0pIC8vIFx1NUY5N1x1NTIzMCBtcC13ZWl4aW4sIGg1LCBhcHAgXHU3QjQ5XG5cbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ2VudicpKVxuICBjb25zdCB7XG4gICAgVklURV9BUFBfUE9SVCxcbiAgICBWSVRFX1NFUlZFUl9CQVNFVVJMLFxuICAgIFZJVEVfREVMRVRFX0NPTlNPTEUsXG4gICAgVklURV9TSE9XX1NPVVJDRU1BUCxcbiAgICBWSVRFX0FQUF9QVUJMSUNfQkFTRSxcbiAgICBWSVRFX0FQUF9QUk9YWSxcbiAgICBWSVRFX0FQUF9QUk9YWV9QUkVGSVgsXG4gIH0gPSBlbnZcbiAgY29uc29sZS5sb2coJ1x1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRiBlbnYgLT4gJywgZW52KVxuXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIGVudkRpcjogJy4vZW52JywgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5ZW52XHU3NkVFXHU1RjU1XG4gICAgYmFzZTogVklURV9BUFBfUFVCTElDX0JBU0UsXG4gICAgcGx1Z2luczogW1xuICAgICAgVW5pUGFnZXMoe1xuICAgICAgICBleGNsdWRlOiBbJyoqL2NvbXBvbmVudHMvKiovKiouKiddLFxuICAgICAgICBzdWJQYWNrYWdlczogWydzcmMvcGFja2FnZXMvcHVibGljJywgJ3NyYy9wYWNrYWdlcy9ob21lJywgJ3NyYy9wYWNrYWdlcy9taW5lJywgJ3NyYy9wYWNrYWdlcy9uZXdzJywgJ3NyYy9wYWNrYWdlcy9vcmRlciddLFxuICAgICAgICBkdHM6ICdzcmMvdHlwZXMvdW5pLXBhZ2VzLmQudHMnLFxuICAgICAgfSksXG4gICAgICBVbmlMYXlvdXRzKCksXG4gICAgICBVbmlQbGF0Zm9ybSgpLFxuICAgICAgVW5pTWFuaWZlc3QoKSxcbiAgICAgIC8vIFVuaVhYWCBcdTk3MDBcdTg5ODFcdTU3MjggVW5pIFx1NEU0Qlx1NTI0RFx1NUYxNVx1NTE2NVxuICAgICAge1xuICAgICAgICAvLyBcdTRFMzRcdTY1RjZcdTg5RTNcdTUxQjMgZGNsb3VkaW8gXHU1Qjk4XHU2NUI5XHU3Njg0IEBkY2xvdWRpby91bmktbXAtY29tcGlsZXIgXHU1MUZBXHU3M0IwXHU3Njg0XHU3RjE2XHU4QkQxIEJVR1xuICAgICAgICAvLyBcdTUzQzJcdTgwMDMgZ2l0aHViIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vZGNsb3VkaW8vdW5pLWFwcC9pc3N1ZXMvNDk1MlxuICAgICAgICAvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTYzRDJcdTRFRjZcdTc5ODFcdTc1Mjggdml0ZTp2dWUgXHU2M0QyXHU0RUY2XHU3Njg0IGRldlRvb2xzRW5hYmxlZFx1RkYwQ1x1NUYzQVx1NTIzNlx1N0YxNlx1OEJEMSB2dWUgXHU2QTIxXHU2NzdGXHU2NUY2IGlubGluZSBcdTRFM0EgdHJ1ZVxuICAgICAgICBuYW1lOiAnZml4LXZpdGUtcGx1Z2luLXZ1ZScsXG4gICAgICAgIGNvbmZpZ1Jlc29sdmVkKGNvbmZpZykge1xuICAgICAgICAgIGNvbnN0IHBsdWdpbiA9IGNvbmZpZy5wbHVnaW5zLmZpbmQocCA9PiBwLm5hbWUgPT09ICd2aXRlOnZ1ZScpXG4gICAgICAgICAgaWYgKHBsdWdpbiAmJiBwbHVnaW4uYXBpICYmIHBsdWdpbi5hcGkub3B0aW9ucykge1xuICAgICAgICAgICAgcGx1Z2luLmFwaS5vcHRpb25zLmRldlRvb2xzRW5hYmxlZCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIFVub0NTUygpLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIGltcG9ydHM6IFsndnVlJywgJ3VuaS1hcHAnXSxcbiAgICAgICAgZHRzOiAnc3JjL3R5cGVzL2F1dG8taW1wb3J0LmQudHMnLFxuICAgICAgICBkaXJzOiBbJ3NyYy9ob29rcyddLCAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgaG9va3NcbiAgICAgICAgdnVlVGVtcGxhdGU6IHRydWUsIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgIH0pLFxuICAgICAgLy8gT3B0aW1pemF0aW9uIFx1NjNEMlx1NEVGNlx1OTcwMFx1ODk4MSBwYWdlLmpzb24gXHU2NTg3XHU0RUY2XHVGRjBDXHU2NTQ1XHU1RTk0XHU1NzI4IFVuaVBhZ2VzIFx1NjNEMlx1NEVGNlx1NEU0Qlx1NTQwRVx1NjI2N1x1ODg0Q1xuICAgICAgT3B0aW1pemF0aW9uKHtcbiAgICAgICAgZW5hYmxlOiB7XG4gICAgICAgICAgJ29wdGltaXphdGlvbic6IHRydWUsXG4gICAgICAgICAgJ2FzeW5jLWltcG9ydCc6IHRydWUsXG4gICAgICAgICAgJ2FzeW5jLWNvbXBvbmVudCc6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGR0czoge1xuICAgICAgICAgIGJhc2U6ICdzcmMvdHlwZXMnLFxuICAgICAgICB9LFxuICAgICAgICBsb2dnZXI6IGZhbHNlLFxuICAgICAgfSksXG5cbiAgICAgIFZpdGVSZXN0YXJ0KHtcbiAgICAgICAgLy8gXHU5MDFBXHU4RkM3XHU4RkQ5XHU0RTJBXHU2M0QyXHU0RUY2XHVGRjBDXHU1NzI4XHU0RkVFXHU2NTM5dml0ZS5jb25maWcuanNcdTY1ODdcdTRFRjZcdTUyMTlcdTRFMERcdTk3MDBcdTg5ODFcdTkxQ0RcdTY1QjBcdThGRDBcdTg4NENcdTRFNUZcdTc1MUZcdTY1NDhcdTkxNERcdTdGNkVcbiAgICAgICAgcmVzdGFydDogWyd2aXRlLmNvbmZpZy5qcyddLFxuICAgICAgfSksXG4gICAgICAvLyBoNVx1NzNBRlx1NTg4M1x1NTg5RVx1NTJBMCBCVUlMRF9USU1FIFx1NTQ4QyBCVUlMRF9CUkFOQ0hcbiAgICAgIFVOSV9QTEFURk9STSA9PT0gJ2g1JyAmJiB7XG4gICAgICAgIG5hbWU6ICdodG1sLXRyYW5zZm9ybScsXG4gICAgICAgIHRyYW5zZm9ybUluZGV4SHRtbChodG1sKSB7XG4gICAgICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZSgnJUJVSUxEX1RJTUUlJywgZGF5anMoKS5mb3JtYXQoJ1lZWVktTU0tREQgSEg6bW06c3MnKSlcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICAvLyBcdTYyNTNcdTUzMDVcdTUyMDZcdTY3OTBcdTYzRDJcdTRFRjZcdUZGMENoNSArIFx1NzUxRlx1NEVBN1x1NzNBRlx1NTg4M1x1NjI0RFx1NUYzOVx1NTFGQVxuICAgICAgVU5JX1BMQVRGT1JNID09PSAnaDUnXG4gICAgICAmJiBtb2RlID09PSAncHJvZHVjdGlvbidcbiAgICAgICYmIHZpc3VhbGl6ZXIoe1xuICAgICAgICBmaWxlbmFtZTogJy4vbm9kZV9tb2R1bGVzLy5jYWNoZS92aXN1YWxpemVyL3N0YXRzLmh0bWwnLFxuICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgICBnemlwU2l6ZTogdHJ1ZSxcbiAgICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcbiAgICAgIH0pLFxuICAgICAgLy8gXHU1M0VBXHU2NzA5XHU1NzI4IGFwcCBcdTVFNzNcdTUzRjBcdTY1RjZcdTYyNERcdTU0MkZcdTc1MjggY29weU5hdGl2ZVJlcyBcdTYzRDJcdTRFRjZcbiAgICAgIC8vIFVOSV9QTEFURk9STSA9PT0gJ2FwcCcgJiYgY29weU5hdGl2ZVJlcygpLFxuICAgICAgQ29tcG9uZW50cyh7XG4gICAgICAgIGV4dGVuc2lvbnM6IFsndnVlJ10sXG4gICAgICAgIGRlZXA6IHRydWUsIC8vIFx1NjYyRlx1NTQyNlx1OTAxMlx1NUY1Mlx1NjI2Qlx1NjNDRlx1NUI1MFx1NzZFRVx1NUY1NVx1RkYwQ1xuICAgICAgICBkaXJlY3RvcnlBc05hbWVzcGFjZTogZmFsc2UsIC8vIFx1NjYyRlx1NTQyNlx1NjI4QVx1NzZFRVx1NUY1NVx1NTQwRFx1NEY1Q1x1NEUzQVx1NTQ3RFx1NTQwRFx1N0E3QVx1OTVGNFx1NTI0RFx1N0YwMFx1RkYwQ3RydWUgXHU2NUY2XHU3RUM0XHU0RUY2XHU1NDBEXHU0RTNBIFx1NzZFRVx1NUY1NVx1NTQwRCtcdTdFQzRcdTRFRjZcdTU0MERcdUZGMENcbiAgICAgICAgZHRzOiAnc3JjL3R5cGVzL2NvbXBvbmVudHMuZC50cycsIC8vIFx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1NzY4NFx1N0VDNFx1NEVGNlx1N0M3Qlx1NTc4Qlx1NThGMFx1NjYwRVx1NjU4N1x1NEVGNlx1OERFRlx1NUY4NFx1RkYwOFx1NzUyOFx1NEU4RSBUeXBlU2NyaXB0IFx1NjUyRlx1NjMwMVx1RkYwOVxuICAgICAgfSksXG4gICAgICBVbmkoKSxcbiAgICBdLFxuICAgIGRlZmluZToge1xuICAgICAgX19VTklfUExBVEZPUk1fXzogSlNPTi5zdHJpbmdpZnkoVU5JX1BMQVRGT1JNKSxcbiAgICAgIF9fVklURV9BUFBfUFJPWFlfXzogSlNPTi5zdHJpbmdpZnkoVklURV9BUFBfUFJPWFkpLFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwb3N0Y3NzOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICAvLyBhdXRvcHJlZml4ZXIoe1xuICAgICAgICAgIC8vICAgLy8gXHU2MzA3XHU1QjlBXHU3NkVFXHU2ODA3XHU2RDRGXHU4OUM4XHU1NjY4XG4gICAgICAgICAgLy8gICBvdmVycmlkZUJyb3dzZXJzbGlzdDogWyc+IDElJywgJ2xhc3QgMiB2ZXJzaW9ucyddLFxuICAgICAgICAgIC8vIH0pLFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJy4vc3JjJyksXG4gICAgICAgICdAaW1nJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICcuL3NyYy9zdGF0aWMvaW1hZ2VzJyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgICBobXI6IHRydWUsXG4gICAgICBwb3J0OiBOdW1iZXIucGFyc2VJbnQoVklURV9BUFBfUE9SVCwgMTApLFxuICAgICAgLy8gXHU0RUM1IEg1IFx1N0FFRlx1NzUxRlx1NjU0OFx1RkYwQ1x1NTE3Nlx1NEVENlx1N0FFRlx1NEUwRFx1NzUxRlx1NjU0OFx1RkYwOFx1NTE3Nlx1NEVENlx1N0FFRlx1OEQ3MGJ1aWxkXHVGRjBDXHU0RTBEXHU4RDcwZGV2U2VydmVyKVxuICAgICAgcHJveHk6IEpTT04ucGFyc2UoVklURV9BUFBfUFJPWFkpXG4gICAgICAgID8ge1xuICAgICAgICAgICAgW1ZJVEVfQVBQX1BST1hZX1BSRUZJWF06IHtcbiAgICAgICAgICAgICAgdGFyZ2V0OiBWSVRFX1NFUlZFUl9CQVNFVVJMLFxuICAgICAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke1ZJVEVfQVBQX1BST1hZX1BSRUZJWH1gKSwgJycpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgIH0sXG4gICAgZXNidWlsZDoge1xuICAgICAgZHJvcDogVklURV9ERUxFVEVfQ09OU09MRSA9PT0gJ3RydWUnID8gWydjb25zb2xlJywgJ2RlYnVnZ2VyJ10gOiBbJ2RlYnVnZ2VyJ10sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICAgIC8vIFx1NjVCOVx1NEZCRlx1OTc1RWg1XHU3QUVGXHU4QzAzXHU4QkQ1XG4gICAgICAvLyBzb3VyY2VtYXA6IFZJVEVfU0hPV19TT1VSQ0VNQVAgPT09ICd0cnVlJywgLy8gXHU5RUQ4XHU4QkE0XHU2NjJGZmFsc2VcbiAgICAgIHRhcmdldDogJ2VzNicsXG4gICAgICAvLyBcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcdTRFMERcdTc1MjhcdTUzOEJcdTdGMjlcbiAgICAgIG1pbmlmeTogbW9kZSA9PT0gJ2RldmVsb3BtZW50JyA/IGZhbHNlIDogJ2VzYnVpbGQnLFxuXG4gICAgfSxcbiAgfSlcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFIsT0FBTyxVQUFVO0FBQzNTLE9BQU8sYUFBYTtBQUNw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
