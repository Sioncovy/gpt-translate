const fs = require('fs')
const { name, version, description } = require('./package.json')

const manifest = {
  manifest_version: 3,
  name,
  version,
  description,
  icons: {
    16: './assets/favicon.png',
    32: './assets/favicon.png',
    64: './assets/favicon.png',
    128: './assets/favicon.png'
  },
  content_scripts: [
    {
      // 应用于哪些页面地址（可以使用正则，<all_urls>表示匹配所有地址）
      matches: ["<all_urls>"],
      // // 注入到目标页面的css，注意不要污染目标页面的样式
      // "css": ["static/css/content.css"],
      // // 注入到目标页面js，这个js是在沙盒里运行，与目标页面是隔离的，没有污染问题。
      js: ["content.js"],
      // // 代码注入的时机，可选document_start、document_end、document_idle（默认）
      // "run_at": "document_end"
    }
  ],
  action: {
    default_popup: 'popup.html',
    default_icon: './assets/favicon.png'
  },
  // background: {
  //   service_worker: 'background.js'
  // },
  permissions: ['storage', 'activeTab', 'scripting']
}

function build() {
  // 读取 src/manifest.ts 编译，并将 js 对象转化为 json 写入 manifest.json
  const manifestJson = JSON.stringify(manifest, null, 2)
  fs.writeFileSync('./dist/manifest.json', manifestJson)

  // 将 popup 的 html 文件复制到 dist 目录下
  const popup = fs.readFileSync('./src/popup/popup.html', 'utf-8')
  fs.writeFileSync('./dist/popup.html', popup)
}
build()

