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
        subPackages: ["src/packages/public", "src/packages/home"],
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxnaXRodWIgcHJvamVjdFxcXFx0cmF2ZWxfc2VydmljZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRjpcXFxcZ2l0aHViIHByb2plY3RcXFxcdHJhdmVsX3NlcnZpY2VcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Y6L2dpdGh1YiUyMHByb2plY3QvdHJhdmVsX3NlcnZpY2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgVW5pIGZyb20gJ0B1bmktaGVscGVyL3BsdWdpbi11bmknXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktY29tcG9uZW50cydcbi8vIEBzZWUgaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktbGF5b3V0c1xuaW1wb3J0IFVuaUxheW91dHMgZnJvbSAnQHVuaS1oZWxwZXIvdml0ZS1wbHVnaW4tdW5pLWxheW91dHMnXG4vLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1tYW5pZmVzdFxuaW1wb3J0IFVuaU1hbmlmZXN0IGZyb20gJ0B1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1tYW5pZmVzdCdcbi8vIEBzZWUgaHR0cHM6Ly91bmktaGVscGVyLmpzLm9yZy92aXRlLXBsdWdpbi11bmktcGFnZXNcbmltcG9ydCBVbmlQYWdlcyBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktcGFnZXMnXG4vLyBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1wbGF0Zm9ybVxuLy8gXHU5NzAwXHU4OTgxXHU0RTBFIEB1bmktaGVscGVyL3ZpdGUtcGx1Z2luLXVuaS1wYWdlcyBcdTYzRDJcdTRFRjZcdTRFMDBcdThENzdcdTRGN0ZcdTc1MjhcbmltcG9ydCBVbmlQbGF0Zm9ybSBmcm9tICdAdW5pLWhlbHBlci92aXRlLXBsdWdpbi11bmktcGxhdGZvcm0nXG4vKipcbiAqIFx1NTIwNlx1NTMwNVx1NEYxOFx1NTMxNlx1MzAwMVx1NkEyMVx1NTc1N1x1NUYwMlx1NkI2NVx1OERFOFx1NTMwNVx1OEMwM1x1NzUyOFx1MzAwMVx1N0VDNFx1NEVGNlx1NUYwMlx1NkI2NVx1OERFOFx1NTMwNVx1NUYxNVx1NzUyOFxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdW5pLWt1L2J1bmRsZS1vcHRpbWl6ZXJcbiAqL1xuaW1wb3J0IE9wdGltaXphdGlvbiBmcm9tICdAdW5pLWt1L2J1bmRsZS1vcHRpbWl6ZXInXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xuaW1wb3J0IFVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IFZpdGVSZXN0YXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLXJlc3RhcnQnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCAoeyBjb21tYW5kLCBtb2RlIH0pID0+IHtcbiAgLy8gQHNlZSBodHRwczovL3Vub2Nzcy5kZXYvXG4gIC8vIGNvbnN0IFVub0NTUyA9IChhd2FpdCBpbXBvcnQoJ3Vub2Nzcy92aXRlJykpLmRlZmF1bHRcbiAgLy8gY29uc29sZS5sb2cobW9kZSA9PT0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYpIC8vIHRydWVcblxuICAvLyBtb2RlOiBcdTUzM0FcdTUyMDZcdTc1MUZcdTRFQTdcdTczQUZcdTU4ODNcdThGRDhcdTY2MkZcdTVGMDBcdTUzRDFcdTczQUZcdTU4ODNcbiAgY29uc29sZS5sb2coJ2NvbW1hbmQsIG1vZGUgLT4gJywgY29tbWFuZCwgbW9kZSlcbiAgLy8gcG5wbSBkZXY6aDUgXHU2NUY2XHU1Rjk3XHU1MjMwID0+IHNlcnZlIGRldmVsb3BtZW50XG4gIC8vIHBucG0gYnVpbGQ6aDUgXHU2NUY2XHU1Rjk3XHU1MjMwID0+IGJ1aWxkIHByb2R1Y3Rpb25cbiAgLy8gcG5wbSBkZXY6bXAtd2VpeGluIFx1NjVGNlx1NUY5N1x1NTIzMCA9PiBidWlsZCBkZXZlbG9wbWVudCAoXHU2Q0U4XHU2MTBGXHU1MzNBXHU1MjJCXHVGRjBDY29tbWFuZFx1NEUzQWJ1aWxkKVxuICAvLyBwbnBtIGJ1aWxkOm1wLXdlaXhpbiBcdTY1RjZcdTVGOTdcdTUyMzAgPT4gYnVpbGQgcHJvZHVjdGlvblxuICAvLyBwbnBtIGRldjphcHAgXHU2NUY2XHU1Rjk3XHU1MjMwID0+IGJ1aWxkIGRldmVsb3BtZW50IChcdTZDRThcdTYxMEZcdTUzM0FcdTUyMkJcdUZGMENjb21tYW5kXHU0RTNBYnVpbGQpXG4gIC8vIHBucG0gYnVpbGQ6YXBwIFx1NjVGNlx1NUY5N1x1NTIzMCA9PiBidWlsZCBwcm9kdWN0aW9uXG4gIC8vIGRldiBcdTU0OEMgYnVpbGQgXHU1NDdEXHU0RUU0XHU1M0VGXHU0RUU1XHU1MjA2XHU1MjJCXHU0RjdGXHU3NTI4IC5lbnYuZGV2ZWxvcG1lbnQgXHU1NDhDIC5lbnYucHJvZHVjdGlvbiBcdTc2ODRcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcblxuICBjb25zdCB7IFVOSV9QTEFURk9STSB9ID0gcHJvY2Vzcy5lbnZcbiAgY29uc29sZS5sb2coJ1VOSV9QTEFURk9STSAtPiAnLCBVTklfUExBVEZPUk0pIC8vIFx1NUY5N1x1NTIzMCBtcC13ZWl4aW4sIGg1LCBhcHAgXHU3QjQ5XG5cbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ2VudicpKVxuICBjb25zdCB7XG4gICAgVklURV9BUFBfUE9SVCxcbiAgICBWSVRFX1NFUlZFUl9CQVNFVVJMLFxuICAgIFZJVEVfREVMRVRFX0NPTlNPTEUsXG4gICAgVklURV9TSE9XX1NPVVJDRU1BUCxcbiAgICBWSVRFX0FQUF9QVUJMSUNfQkFTRSxcbiAgICBWSVRFX0FQUF9QUk9YWSxcbiAgICBWSVRFX0FQUF9QUk9YWV9QUkVGSVgsXG4gIH0gPSBlbnZcbiAgY29uc29sZS5sb2coJ1x1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRiBlbnYgLT4gJywgZW52KVxuXG4gIHJldHVybiBkZWZpbmVDb25maWcoe1xuICAgIGVudkRpcjogJy4vZW52JywgLy8gXHU4MUVBXHU1QjlBXHU0RTQ5ZW52XHU3NkVFXHU1RjU1XG4gICAgYmFzZTogVklURV9BUFBfUFVCTElDX0JBU0UsXG4gICAgcGx1Z2luczogW1xuICAgICAgVW5pUGFnZXMoe1xuICAgICAgICBleGNsdWRlOiBbJyoqL2NvbXBvbmVudHMvKiovKiouKiddLFxuICAgICAgICBzdWJQYWNrYWdlczogWydzcmMvcGFja2FnZXMvcHVibGljJywgJ3NyYy9wYWNrYWdlcy9ob21lJ10sXG4gICAgICAgIGR0czogJ3NyYy90eXBlcy91bmktcGFnZXMuZC50cycsXG4gICAgICB9KSxcbiAgICAgIFVuaUxheW91dHMoKSxcbiAgICAgIFVuaVBsYXRmb3JtKCksXG4gICAgICBVbmlNYW5pZmVzdCgpLFxuICAgICAgLy8gVW5pWFhYIFx1OTcwMFx1ODk4MVx1NTcyOCBVbmkgXHU0RTRCXHU1MjREXHU1RjE1XHU1MTY1XG4gICAgICB7XG4gICAgICAgIC8vIFx1NEUzNFx1NjVGNlx1ODlFM1x1NTFCMyBkY2xvdWRpbyBcdTVCOThcdTY1QjlcdTc2ODQgQGRjbG91ZGlvL3VuaS1tcC1jb21waWxlciBcdTUxRkFcdTczQjBcdTc2ODRcdTdGMTZcdThCRDEgQlVHXG4gICAgICAgIC8vIFx1NTNDMlx1ODAwMyBnaXRodWIgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kY2xvdWRpby91bmktYXBwL2lzc3Vlcy80OTUyXG4gICAgICAgIC8vIFx1ODFFQVx1NUI5QVx1NEU0OVx1NjNEMlx1NEVGNlx1Nzk4MVx1NzUyOCB2aXRlOnZ1ZSBcdTYzRDJcdTRFRjZcdTc2ODQgZGV2VG9vbHNFbmFibGVkXHVGRjBDXHU1RjNBXHU1MjM2XHU3RjE2XHU4QkQxIHZ1ZSBcdTZBMjFcdTY3N0ZcdTY1RjYgaW5saW5lIFx1NEUzQSB0cnVlXG4gICAgICAgIG5hbWU6ICdmaXgtdml0ZS1wbHVnaW4tdnVlJyxcbiAgICAgICAgY29uZmlnUmVzb2x2ZWQoY29uZmlnKSB7XG4gICAgICAgICAgY29uc3QgcGx1Z2luID0gY29uZmlnLnBsdWdpbnMuZmluZChwID0+IHAubmFtZSA9PT0gJ3ZpdGU6dnVlJylcbiAgICAgICAgICBpZiAocGx1Z2luICYmIHBsdWdpbi5hcGkgJiYgcGx1Z2luLmFwaS5vcHRpb25zKSB7XG4gICAgICAgICAgICBwbHVnaW4uYXBpLm9wdGlvbnMuZGV2VG9vbHNFbmFibGVkID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgVW5vQ1NTKCksXG4gICAgICBBdXRvSW1wb3J0KHtcbiAgICAgICAgaW1wb3J0czogWyd2dWUnLCAndW5pLWFwcCddLFxuICAgICAgICBkdHM6ICdzcmMvdHlwZXMvYXV0by1pbXBvcnQuZC50cycsXG4gICAgICAgIGRpcnM6IFsnc3JjL2hvb2tzJ10sIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBob29rc1xuICAgICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSwgLy8gZGVmYXVsdCBmYWxzZVxuICAgICAgfSksXG4gICAgICAvLyBPcHRpbWl6YXRpb24gXHU2M0QyXHU0RUY2XHU5NzAwXHU4OTgxIHBhZ2UuanNvbiBcdTY1ODdcdTRFRjZcdUZGMENcdTY1NDVcdTVFOTRcdTU3MjggVW5pUGFnZXMgXHU2M0QyXHU0RUY2XHU0RTRCXHU1NDBFXHU2MjY3XHU4ODRDXG4gICAgICBPcHRpbWl6YXRpb24oe1xuICAgICAgICBlbmFibGU6IHtcbiAgICAgICAgICAnb3B0aW1pemF0aW9uJzogdHJ1ZSxcbiAgICAgICAgICAnYXN5bmMtaW1wb3J0JzogdHJ1ZSxcbiAgICAgICAgICAnYXN5bmMtY29tcG9uZW50JzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgZHRzOiB7XG4gICAgICAgICAgYmFzZTogJ3NyYy90eXBlcycsXG4gICAgICAgIH0sXG4gICAgICAgIGxvZ2dlcjogZmFsc2UsXG4gICAgICB9KSxcblxuICAgICAgVml0ZVJlc3RhcnQoe1xuICAgICAgICAvLyBcdTkwMUFcdThGQzdcdThGRDlcdTRFMkFcdTYzRDJcdTRFRjZcdUZGMENcdTU3MjhcdTRGRUVcdTY1Mzl2aXRlLmNvbmZpZy5qc1x1NjU4N1x1NEVGNlx1NTIxOVx1NEUwRFx1OTcwMFx1ODk4MVx1OTFDRFx1NjVCMFx1OEZEMFx1ODg0Q1x1NEU1Rlx1NzUxRlx1NjU0OFx1OTE0RFx1N0Y2RVxuICAgICAgICByZXN0YXJ0OiBbJ3ZpdGUuY29uZmlnLmpzJ10sXG4gICAgICB9KSxcbiAgICAgIC8vIGg1XHU3M0FGXHU1ODgzXHU1ODlFXHU1MkEwIEJVSUxEX1RJTUUgXHU1NDhDIEJVSUxEX0JSQU5DSFxuICAgICAgVU5JX1BMQVRGT1JNID09PSAnaDUnICYmIHtcbiAgICAgICAgbmFtZTogJ2h0bWwtdHJhbnNmb3JtJyxcbiAgICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwpIHtcbiAgICAgICAgICByZXR1cm4gaHRtbC5yZXBsYWNlKCclQlVJTERfVElNRSUnLCBkYXlqcygpLmZvcm1hdCgnWVlZWS1NTS1ERCBISDptbTpzcycpKVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIC8vIFx1NjI1M1x1NTMwNVx1NTIwNlx1Njc5MFx1NjNEMlx1NEVGNlx1RkYwQ2g1ICsgXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU2MjREXHU1RjM5XHU1MUZBXG4gICAgICBVTklfUExBVEZPUk0gPT09ICdoNSdcbiAgICAgICYmIG1vZGUgPT09ICdwcm9kdWN0aW9uJ1xuICAgICAgJiYgdmlzdWFsaXplcih7XG4gICAgICAgIGZpbGVuYW1lOiAnLi9ub2RlX21vZHVsZXMvLmNhY2hlL3Zpc3VhbGl6ZXIvc3RhdHMuaHRtbCcsXG4gICAgICAgIG9wZW46IHRydWUsXG4gICAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgICBicm90bGlTaXplOiB0cnVlLFxuICAgICAgfSksXG4gICAgICAvLyBcdTUzRUFcdTY3MDlcdTU3MjggYXBwIFx1NUU3M1x1NTNGMFx1NjVGNlx1NjI0RFx1NTQyRlx1NzUyOCBjb3B5TmF0aXZlUmVzIFx1NjNEMlx1NEVGNlxuICAgICAgLy8gVU5JX1BMQVRGT1JNID09PSAnYXBwJyAmJiBjb3B5TmF0aXZlUmVzKCksXG4gICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgZXh0ZW5zaW9uczogWyd2dWUnXSxcbiAgICAgICAgZGVlcDogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU5MDEyXHU1RjUyXHU2MjZCXHU2M0NGXHU1QjUwXHU3NkVFXHU1RjU1XHVGRjBDXG4gICAgICAgIGRpcmVjdG9yeUFzTmFtZXNwYWNlOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU2MjhBXHU3NkVFXHU1RjU1XHU1NDBEXHU0RjVDXHU0RTNBXHU1NDdEXHU1NDBEXHU3QTdBXHU5NUY0XHU1MjREXHU3RjAwXHVGRjBDdHJ1ZSBcdTY1RjZcdTdFQzRcdTRFRjZcdTU0MERcdTRFM0EgXHU3NkVFXHU1RjU1XHU1NDBEK1x1N0VDNFx1NEVGNlx1NTQwRFx1RkYwQ1xuICAgICAgICBkdHM6ICdzcmMvdHlwZXMvY29tcG9uZW50cy5kLnRzJywgLy8gXHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwXHU3Njg0XHU3RUM0XHU0RUY2XHU3QzdCXHU1NzhCXHU1OEYwXHU2NjBFXHU2NTg3XHU0RUY2XHU4REVGXHU1Rjg0XHVGRjA4XHU3NTI4XHU0RThFIFR5cGVTY3JpcHQgXHU2NTJGXHU2MzAxXHVGRjA5XG4gICAgICB9KSxcbiAgICAgIFVuaSgpLFxuICAgIF0sXG4gICAgZGVmaW5lOiB7XG4gICAgICBfX1VOSV9QTEFURk9STV9fOiBKU09OLnN0cmluZ2lmeShVTklfUExBVEZPUk0pLFxuICAgICAgX19WSVRFX0FQUF9QUk9YWV9fOiBKU09OLnN0cmluZ2lmeShWSVRFX0FQUF9QUk9YWSksXG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHBvc3Rjc3M6IHtcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgIC8vIGF1dG9wcmVmaXhlcih7XG4gICAgICAgICAgLy8gICAvLyBcdTYzMDdcdTVCOUFcdTc2RUVcdTY4MDdcdTZENEZcdTg5QzhcdTU2NjhcbiAgICAgICAgICAvLyAgIG92ZXJyaWRlQnJvd3NlcnNsaXN0OiBbJz4gMSUnLCAnbGFzdCAyIHZlcnNpb25zJ10sXG4gICAgICAgICAgLy8gfSksXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0sXG5cbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnLi9zcmMnKSxcbiAgICAgICAgJ0BpbWcnOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJy4vc3JjL3N0YXRpYy9pbWFnZXMnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICAgIGhtcjogdHJ1ZSxcbiAgICAgIHBvcnQ6IE51bWJlci5wYXJzZUludChWSVRFX0FQUF9QT1JULCAxMCksXG4gICAgICAvLyBcdTRFQzUgSDUgXHU3QUVGXHU3NTFGXHU2NTQ4XHVGRjBDXHU1MTc2XHU0RUQ2XHU3QUVGXHU0RTBEXHU3NTFGXHU2NTQ4XHVGRjA4XHU1MTc2XHU0RUQ2XHU3QUVGXHU4RDcwYnVpbGRcdUZGMENcdTRFMERcdThENzBkZXZTZXJ2ZXIpXG4gICAgICBwcm94eTogSlNPTi5wYXJzZShWSVRFX0FQUF9QUk9YWSlcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBbVklURV9BUFBfUFJPWFlfUFJFRklYXToge1xuICAgICAgICAgICAgICB0YXJnZXQ6IFZJVEVfU0VSVkVSX0JBU0VVUkwsXG4gICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7VklURV9BUFBfUFJPWFlfUFJFRklYfWApLCAnJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgfSxcbiAgICBlc2J1aWxkOiB7XG4gICAgICBkcm9wOiBWSVRFX0RFTEVURV9DT05TT0xFID09PSAndHJ1ZScgPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFsnZGVidWdnZXInXSxcbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgLy8gXHU2NUI5XHU0RkJGXHU5NzVFaDVcdTdBRUZcdThDMDNcdThCRDVcbiAgICAgIC8vIHNvdXJjZW1hcDogVklURV9TSE9XX1NPVVJDRU1BUCA9PT0gJ3RydWUnLCAvLyBcdTlFRDhcdThCQTRcdTY2MkZmYWxzZVxuICAgICAgdGFyZ2V0OiAnZXM2JyxcbiAgICAgIC8vIFx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4M1x1NEUwRFx1NzUyOFx1NTM4Qlx1N0YyOVxuICAgICAgbWluaWZ5OiBtb2RlID09PSAnZGV2ZWxvcG1lbnQnID8gZmFsc2UgOiAnZXNidWlsZCcsXG5cbiAgICB9LFxuICB9KVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwUixPQUFPLFVBQVU7QUFDM1MsT0FBTyxhQUFhO0FBQ3BCLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUV2QixPQUFPLGdCQUFnQjtBQUV2QixPQUFPLGlCQUFp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
