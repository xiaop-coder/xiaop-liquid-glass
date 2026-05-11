import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';

const production = !process.env.ROLLUP_WATCH;

export default [
    // UMD build (for browsers via <script> tag)
    {
        input: 'src/index.js',
        output: {
            file: 'dist/liquid-glass.js',
            format: 'umd',
            name: 'LiquidGlass',
            sourcemap: true,
            banner: `/**
 * XiaoP Liquid Glass Design System v2.1.1
 * (c) 2026 XiaoP
 * @license MIT
 */`
        },
        plugins: [
            resolve(),
            commonjs(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**',
                presets: [
                    ['@babel/preset-env', {
                        targets: '> 0.25%, not dead',
                        modules: false
                    }]
                ]
            }),
            production && terser({
                format: {
                    comments: /^!/
                }
            })
        ]
    },
    // ESM build (for modern bundlers)
    {
        input: 'src/index.js',
        output: {
            file: 'dist/liquid-glass.esm.js',
            format: 'es',
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs(),
            production && terser()
        ]
    },
    // CommonJS build (for Node.js)
    {
        input: 'src/index.js',
        output: {
            file: 'dist/liquid-glass.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        },
        plugins: [
            resolve(),
            commonjs(),
            production && terser()
        ]
    }
];
