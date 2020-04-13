module.exports = {
  name: 'ng-transition',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ng-transition',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
