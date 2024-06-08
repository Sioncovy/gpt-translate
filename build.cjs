const fs = require('fs')
const { name, version, description } = require('./package.json')
const path = require('path')

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
  permissions: ['storage', 'activeTab', 'scripting'],
  web_accessible_resources: [
    {
      resources: ["popup/*", "contentPage/*", "assets/*", "js/*"],
      matches: ["<all_urls>"],
      use_dynamic_url: true
    }
  ]
}


// 拷贝目录文件
const copyDirectory = (srcDir, destDir) => {
  // 判断目标目录是否存在，不存在则创建
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir)
  }

  fs.readdirSync(srcDir).forEach((file) => {
    const srcPath = path.join(srcDir, file)
    const destPath = path.join(destDir, file)

    if (fs.lstatSync(srcPath).isDirectory()) {
      // 递归复制子目录
      copyDirectory(srcPath, destPath)
    } else {
      // 复制文件
      fs.copyFileSync(srcPath, destPath)
    }
  })
}

// 删除目录及文件
const deleteDirectory = (dir) => {
  if (fs.existsSync(dir)) {
    fs.readdirSync(dir).forEach((file) => {
      const curPath = path.join(dir, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        // 递归删除子目录
        deleteDirectory(curPath)
      } else {
        // 删除文件
        fs.unlinkSync(curPath)
      }
    })
    // 删除空目录
    fs.rmdirSync(dir)
  }
}

function build() {
  // 检测是否存在 dist 目录，没有则创建
  if (!fs.existsSync('./dist')) {
    fs.mkdirSync('./dist')
  }
  // 读取 src/manifest.ts 编译，并将 js 对象转化为 json 写入 manifest.json
  const manifestJson = JSON.stringify(manifest, null, 2)
  fs.writeFileSync('./dist/manifest.json', manifestJson)

  // 将 popup 的 html 文件复制到 dist 目录下
  const popup = fs.readFileSync('./src/popup/popup.html', 'utf-8')
  fs.writeFileSync('./dist/popup.html', popup)

  // 源目录：content script临时生成目录
  const contentOutDir = path.resolve('./dist-content')
  const popupOutDir = path.resolve('./dist-popup')
  // // 源目录：background script临时生成目录
  // // const backgroundOutDir = path.resolve('./')
  // // 目标目录：Chrome Extension 最终build目录
  // const outDir = path.resolve('./dist')

  // // 将复制源目录内的文件和目录全部复制到目标目录中
  copyDirectory(contentOutDir, './dist')
  copyDirectory(popupOutDir, './dist')
  // // copyDirectory(backgroundOutDir, outDir)

  // // 删除源目录
  deleteDirectory(contentOutDir)
  deleteDirectory(popupOutDir)
  // // deleteDirectory(backgroundOutDir)
}
build()

