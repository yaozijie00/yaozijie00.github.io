# yaozijie00.github.io

个人作品集网站，基于 `Vue 3 + Vite` 构建，面向环境美术/3D 场景作品展示。

当前版本已针对线上访问做了媒体优化（视频双码率、图片 WebP、按需加载），重点提升首屏速度与弱网流畅度。

## 技术栈

- `Vue 3`
- `Vite 5`
- `SCSS`
- `ESLint + Prettier`

## 本地开发

```bash
npm install
npm run dev
```

## 常用命令

- `npm run dev`：启动本地开发服务
- `npm run build`：构建生产包
- `npm run preview`：本地预览生产包
- `npm run lint`：运行 ESLint
- `npm run lint:fix`：自动修复可修复的 ESLint 问题
- `npm run format`：格式化代码
- `npm run format:check`：检查格式

## 项目结构

```text
.
├─ public/
│  ├─ assets/
│  │  ├─ models/               # marmoset .mview
│  │  └─ works/                # 作品图片/视频（线上资源）
│  ├─ images/
│  ├─ resume.pdf
│  └─ portfolio.pdf
├─ source-assets/              # 原始母版素材（不入库）
├─ src/
│  ├─ components/
│  ├─ data/siteData.js         # 作品与站点数据配置
│  └─ styles/
└─ README.md
```

## 媒体资源规范

1. 原始素材放在 `source-assets/`，不要直接发布。
2. 线上可访问资源放在 `public/`。
3. 视频使用 `*_web.mp4` 命名；建议同时生成 `*_web_low.mp4` 低码率版本。
4. 图片优先使用 `webp`。
5. `src/data/siteData.js` 中统一维护资源引用（含 `srcLow`）。

## 视频转码建议（FFmpeg）

### 高码率 web 版

```bash
ffmpeg -i input.mp4 -map 0:v:0 -map 0:a? -vf "scale='min(1920,iw)':-2:flags=lanczos" -c:v libx264 -preset medium -crf 23 -profile:v high -level 4.1 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart output_web.mp4
```

### 低码率回退版

```bash
ffmpeg -i input.mp4 -map 0:v:0 -map 0:a? -vf "scale='min(1280,iw)':-2:flags=lanczos" -c:v libx264 -preset medium -crf 30 -profile:v high -level 4.0 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart output_web_low.mp4
```

## 当前已做的性能优化

- 作品图片批量转为 `webp`，显著降低下载体积
- 作品视频启用高/低双源（`src` + `srcLow`）
- 作品视频 `preload` 设为 `none`，减少无效预加载
- PDF 预览改为“点击后加载”，避免初次滚动即下载大文件
- 资源路径统一走 `BASE_URL` 兼容子路径部署

## 素材更新流程（建议）

1. 把原始视频放进 `source-assets/works/<ProjectName>/`
2. 用 FFmpeg 产出 `*_web.mp4` 与 `*_web_low.mp4` 到 `public/assets/works/...`
3. 把静态图转为 `webp` 放到同目录
4. 更新 `src/data/siteData.js`：
   - 新增/删除条目
   - 调整展示顺序
   - 为视频补 `srcLow`
5. 运行 `npm run build` 验证
6. 提交并推送

## 部署

该仓库用于 GitHub Pages（`main` 分支）。

```bash
npm run build
git add .
git commit -m "update portfolio assets and performance optimizations"
git push origin main
```

## 备注

- `source-assets/` 已在 `.gitignore` 中排除，避免上传母版大文件。
- 若后续继续更新作品，优先复用本 README 的“素材更新流程”。
