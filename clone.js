const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const args = process.argv;

const modeIdx = args.findIndex((item) => item === '--mode');

const mode = modeIdx > -1 ? args[modeIdx + 1] : 'production';

console.log('---------------------------------', mode);
const packageStr = readFileSync(
  path.resolve(__dirname, './package.json'),
  'utf-8',
);

const packageMap = JSON.parse(packageStr);

packageMap.scripts = Object.keys(packageMap.scripts).reduce((tar, cur) => {
  if (cur.includes('pm2') || cur.includes('docker') || cur === 'start') {
    tar = { ...tar, [cur]: packageMap.scripts[cur] };
  }
  return tar;
}, {});
delete packageMap.devDependencies;

writeFileSync(
  path.resolve(__dirname, './dist/package.json'),
  JSON.stringify(packageMap, null, 2),
);

console.log('=== 文件拷贝完毕 ===');

process.exit(0);
