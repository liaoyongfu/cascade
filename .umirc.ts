import { defineConfig } from 'dumi';

const repo = 'cascade';

export default defineConfig({
    title: repo,
    favicon:
        'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    logo:
        'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
    outputPath: 'docs-dist',
    mode: 'doc',
    hash: true,
    // Because of using GitHub Pages
    base: `/${repo}/`,
    publicPath: `/${repo}/`,
    navs: [
        null,
        {
            title: 'GitHub',
            path: 'https://github.com/umijs/dumi-template',
        },
    ],
    externals: {
        jQuery: 'window.$'
    },
    scripts: [
        { src : 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js'},
        { src : 'https://cdn.bootcdn.net/ajax/libs/bootstrap-datetimepicker/1.0.0/js/bootstrap-datetimepicker.min.js'}
    ],
    exportStatic:{},
    // more config: https://d.umijs.org/config
});
