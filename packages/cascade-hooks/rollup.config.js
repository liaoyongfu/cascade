import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';

export default {
  input: './index.ts',
  output: [
    {
      file: 'lib/index.js', // 输出的文件
      format: 'cjs', // 格式化方式,cjs=>CommonJS
      sourcemap: false// 是否生成sourcemap
    },
    {
      file: 'es/index.es.js',
      format: 'es',
      sourcemap: false
    }
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      outDir: './'
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
    'classnames'
  ]
};
