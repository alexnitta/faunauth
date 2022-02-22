export default {
    files: ['!tests/refresh.js'],
    extensions: {
        ts: 'module',
        js: true,
    },
    nodeArguments: [
        '--experimental-loader=esbuild-node-loader',
        '--experimental-specifier-resolution=node',
    ],
};
