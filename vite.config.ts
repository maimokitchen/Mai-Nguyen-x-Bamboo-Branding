import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// LINT.IfChange(aistudio_media_plugin)
function aistudioMediaPlugin(): Plugin {
  return {
    name: 'vite-plugin-aistudio-media',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // API to upload and save Mai Nguyen portrait
        if (req.url === '/api/upload-portrait' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { imageBase64 } = JSON.parse(body);
              if (!imageBase64) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'No image provided' }));
                return;
              }
              const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
              const buffer = Buffer.from(base64Data, 'base64');
              const publicAssetsDir = path.resolve(__dirname, 'public', 'assets');
              if (!fs.existsSync(publicAssetsDir)) {
                fs.mkdirSync(publicAssetsDir, { recursive: true });
              }
              const targetFile = path.resolve(publicAssetsDir, 'mai-nguyen.jpg');
              fs.writeFileSync(targetFile, buffer);
              
              // Also save as EVT-51.jpg in public root for direct access
              const evtTarget = path.resolve(__dirname, 'public', 'EVT-51.JPG');
              fs.writeFileSync(evtTarget, buffer);

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, url: '/assets/mai-nguyen.jpg' }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: String(err) }));
            }
          });
          return;
        }

        // API to check if portrait file exists on disk
        if (req.url === '/api/portrait-status' && req.method === 'GET') {
          const targetFile = path.resolve(__dirname, 'public', 'assets', 'mai-nguyen.jpg');
          const exists = fs.existsSync(targetFile);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ exists, url: exists ? '/assets/mai-nguyen.jpg' : null }));
          return;
        }

        // API to get persistent feedbacks from disk
        if (req.url === '/api/feedbacks' && req.method === 'GET') {
          const dataFile = path.resolve(__dirname, 'data', 'feedbacks.json');
          if (fs.existsSync(dataFile)) {
            try {
              const content = fs.readFileSync(dataFile, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(content || '[]');
              return;
            } catch {
              res.setHeader('Content-Type', 'application/json');
              res.end('[]');
              return;
            }
          }
          res.setHeader('Content-Type', 'application/json');
          res.end('[]');
          return;
        }

        // API to save persistent feedbacks to disk
        if (req.url === '/api/feedbacks' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const dataDir = path.resolve(__dirname, 'data');
              if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
              }
              const dataFile = path.resolve(dataDir, 'feedbacks.json');
              fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, count: Array.isArray(data) ? data.length : 0 }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: String(err) }));
            }
          });
          return;
        }

        // API to get consultation leads
        if (req.url === '/api/leads' && req.method === 'GET') {
          const dataFile = path.resolve(__dirname, 'data', 'leads.json');
          if (fs.existsSync(dataFile)) {
            try {
              const content = fs.readFileSync(dataFile, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(content || '[]');
              return;
            } catch {
              res.setHeader('Content-Type', 'application/json');
              res.end('[]');
              return;
            }
          }
          res.setHeader('Content-Type', 'application/json');
          res.end('[]');
          return;
        }

        // API to save consultation leads
        if (req.url === '/api/leads' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const dataDir = path.resolve(__dirname, 'data');
              if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
              }
              const dataFile = path.resolve(dataDir, 'leads.json');
              fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, count: Array.isArray(data) ? data.length : 0 }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: String(err) }));
            }
          });
          return;
        }

        // API to upload general feedback or case study media
        if (req.url === '/api/upload-media' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { dataBase64, filename } = JSON.parse(body);
              if (!dataBase64) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'dataBase64 is required' }));
                return;
              }
              const safeName = (filename || `media_${Date.now()}.jpg`).replace(/[^a-zA-Z0-9_.-]/g, '_');
              const mediaDir = path.resolve(__dirname, 'public', 'assets', 'feedbacks');
              if (!fs.existsSync(mediaDir)) {
                fs.mkdirSync(mediaDir, { recursive: true });
              }
              const targetFile = path.resolve(mediaDir, safeName);
              const cleanBase64 = dataBase64.replace(/^data:[^;]+;base64,/, '');
              fs.writeFileSync(targetFile, Buffer.from(cleanBase64, 'base64'));

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, url: `/assets/feedbacks/${safeName}` }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: String(err) }));
            }
          });
          return;
        }

        if (req.url && req.url.startsWith('/assets/aistudio/')) {
          const rawPath = req.url.split('?')[0].split('#')[0];
          try {
            const decodedPath = decodeURIComponent(rawPath);
            const relativePath = decodedPath.replace(/^\//, '');
            const aistudioDir = path.resolve(
              __dirname,
              'public',
              'assets',
              'aistudio',
            );
            const filePath = path.resolve(__dirname, 'public', relativePath);
            if (
              filePath.startsWith(aistudioDir + path.sep) &&
              fs.existsSync(filePath) &&
              fs.statSync(filePath).isFile()
            ) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeMap: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
                '.bmp': 'image/bmp',
                '.ico': 'image/x-icon',
                '.mp4': 'video/mp4',
                '.webm': 'video/webm',
                '.ogv': 'video/ogg',
                '.mp3': 'audio/mpeg',
                '.wav': 'audio/wav',
                '.ogg': 'audio/ogg',
                '.pdf': 'application/pdf',
              };
              res.setHeader(
                'Content-Type',
                mimeMap[ext] || 'application/octet-stream',
              );
              res.setHeader('Cache-Control', 'no-cache');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          } catch {
            // Fall through if URI decoding or file access fails
          }
        }
        next();
      });
    },
  };
}
// LINT.ThenChange(//depot/google3/java/com/google/alkali/boq/makersuite/applet_dev_service/templates/initializers/react_theme/vite.config.ts:aistudio_media_plugin)

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), aistudioMediaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
