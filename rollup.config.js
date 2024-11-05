import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',  // входной файл
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',       // CommonJS для поддержки Node.js
      exports: 'named'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',       // ES-модуль для современных бандлеров
      exports: 'named'
    }
  ],
  plugins: [
    peerDepsExternal(),    // исключает peerDependencies, включая react и react-dom
    resolve(),             // обрабатывает node_modules для любых внешних зависимостей
    commonjs(),            // преобразует CommonJS модули в ES6 для Rollup
    typescript()           // поддержка TypeScript, если библиотека написана на нем
  ],
  external: ['react', 'react-dom']  // явно исключаем react и react-dom
};
