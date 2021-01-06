import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
  input: './src/index.ts',
  output: [
    {
      file: 'lib/index.js', // 输出的文件
      format: 'cjs', // 格式化方式,cjs=>CommonJS
      sourcemap: true// 是否生成sourcemap
    },
    {
      file: 'es/index.es.js',
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    }),
    commonjs(),
    postcss({
      plugins: []
    })
  ],
  external: [
    'react',
    'react-dom',
    '@share/shareui',
    'classnames',
    'cascade-hooks'
  ]
};
