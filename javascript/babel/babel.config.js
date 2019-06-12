let defaultPresets;

if (process.env.BABEL_ENV === 'es') {
  defaultPresets = [];
} else {
  defaultPresets = [
    [
      '@babel/preset-env',
      {
        modules: ['esm', 'umd'].includes(process.env.BABEL_ENV) ? false : 'commonjs'
      }
    ]
  ];
}

const productionPlugins = [
  '@babel/plugin-transform-react-constant-elements'
];

module.exports = {
  presets: defaultPresets.concat(['@babel/preset-react']),
  plugins: [
    '@babel/plugin-transform-runtime'
  ],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  env: {
    umd: {
      plugins: productionPlugins.concat([
        '@babel/plugin-transform-modules-umd'
      ])
    }
  }
};
