// rollup.config.js
import path from 'path';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import json from "@rollup/plugin-json";
import typescript from '@rollup/plugin-typescript';

const projectRoot = path.resolve(__dirname, '..');

const commonSettings = {
  external: ['vue', 'vue-demi', 'vega-embed'],
}

const commonPlugins = [
  alias({
    entries: [
      {
        find: '@',
        replacement: `${path.resolve(projectRoot, 'src')}`,
      },
    ],
  }),
  typescript({
    experimentalDecorators: true,
    tsconfig: './tsconfig.json',
    module: 'es2015'
  }),
  json()
];

export default [
  // ESM build to be used with webpack/rollup.
  {
    ...commonSettings,
    input: 'src/entry.ts',
    output: {
      format: 'esm',
      file: 'dist/library.esm.js'
    },
    plugins: [
      ...commonPlugins,
      vue()
    ]
  },
  // SSR build.
  {
    ...commonSettings,
    input: 'src/entry.ts',
    output: {
      format: 'cjs',
      file: 'dist/library.ssr.js'
    },
    plugins: [
      ...commonPlugins,
      vue({ template: { optimizeSSR: true } })
    ]
  }/*,
  // Browser build.
  {
    ...commonSettings,
    input: 'src/entry.iife.ts',
    output: {
      format: 'iife',
      file: 'dist/library.js'
    },
    plugins: [
      ...commonPlugins,
      vue()
    ]
  }*/
];
