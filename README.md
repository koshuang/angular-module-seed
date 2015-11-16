# angular-module-seed

## Angular + Karma + Jasmine + Gulp

## How to use

- Rename module name in src/test folders, package.json, bower.json
- Rename field output in gulpfile.js, field main in package.json

## How to release

```
gulp build
git commit -m "XXX"
bower version x.x.x
git push --with-tags
```

## Gulp tasks

- gulp test
- gulp test:watch
- gulp lint
  - gulp jshint
  - gulp jscs
  - gulp eslint
- gulp watch
- gulp build
