const path = require('path')
const fs = require('fs')
const os = require('os')
const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('koa-router')()
const uuid = require('uuid/v1')

const app = new Koa()
const port = process.env.NODE_PORT || 8989
const artifact = path.resolve(os.homedir(), '.artifacts')
const log = console.log.bind(console)

ensureArtifact(artifact)

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFieldsSize: 10 * 1024 * 1024
  }
}))

router.post('/upload', async (ctx) => {
  if (!ctx.request.files) {
    ctx.status = 400
    ctx.body = {
      code: 1,
      message: '缺少files参数'
    }
    return
  }
  const name = uuid()
  log(`[Create filename] -- ${name}`)
  const file = ctx.request.files.file
  log(`[Temp file] -- ${file.path}`)
  const filename = ctx.request.body.name || '.tar.gz'
  log(`[Upload filename] -- ${filename}`)
  const reader = fs.createReadStream(file.path)
  reader.pipe(fs.createWriteStream(path.join(artifact, `${name}${getFullExtname(filename)}`)))
  ctx.body = name
})

app.use(router.routes())

app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})

function ensureArtifact(artifact) {
  (fs.existsSync(artifact) && fs.statSync(artifact).isDirectory()) || fs.mkdirSync(artifact)
}

function getFullExtname(filename) {
  return filename.substr(filename.indexOf('.'))
}
