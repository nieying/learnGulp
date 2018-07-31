const SRC_DIR = './src/' // 源文件目录
const DIST_DIR = './dist/' // 处理后的文件存放位置

var gulpConfig = {
  src: SRC_DIR,
  dist: DIST_DIR,

  html: {
    src: SRC_DIR + '*.html',
    dist: DIST_DIR
  },
 
  css: {
    src: SRC_DIR + 'assets/css/*',
    dist: DIST_DIR + 'assets/css',
    build_name: 'main.css'
  },

  img: {
    src: SRC_DIR + 'assets/images/*',
    dist: DIST_DIR + 'assets/images',
  },

  js: {
    src: SRC_DIR + '/js/*.js',
    dist: DIST_DIR + 'js',
    build_name: 'main.js'
  },
}

module.exports = gulpConfig;