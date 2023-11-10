module.exports = {
    root: true,
    extends: [
      'universe/native',
    ],
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        rules: {
          'import/order': 'off',
        },
      },
    ],
  };
  