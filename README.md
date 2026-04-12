# yaozijie00.github.io

Personal portfolio site built with Vue 3 + Vite.

## Scripts

- npm run dev: start local development server
- npm run build: build production bundle
- npm run preview: preview production bundle
- npm run lint: run ESLint checks
- npm run lint:fix: auto-fix lint issues when possible
- npm run format: format files with Prettier
- npm run format:check: verify Prettier formatting

## Asset Policy

- Keep runtime assets in public/.
- Keep web-optimized videos in public/ (for example, *_web.mp4).
- Keep large original masters outside public/ in source-assets/ to avoid shipping them.
- source-assets/ is ignored by git.

## FFmpeg Transcode Example

Use this command to generate a web-friendly H.264 file with faststart:

```bash
ffmpeg -i input_1080p.mp4 -c:v libx264 -preset medium -profile:v high -level 4.1 -pix_fmt yuv420p -b:v 4500k -maxrate 5000k -bufsize 10000k -c:a aac -b:a 128k -movflags +faststart output_web_h264.mp4
```
