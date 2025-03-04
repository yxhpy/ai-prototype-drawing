import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { startServer } from './src/server';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// 准备Next.js应用
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // 启动MCP服务器
  startServer().catch(err => {
    console.error('无法启动MCP服务器:', err);
    process.exit(1);
  });
  
  // 创建HTTP服务器
  createServer(async (req, res) => {
    try {
      // 解析URL
      const parsedUrl = parse(req.url!, true);
      
      // 让Next.js处理请求
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('内部服务器错误');
    }
  }).listen(port, () => {
    console.log(`> 准备就绪，在 http://${hostname}:${port} 上运行`);
  });
}); 