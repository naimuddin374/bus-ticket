import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Auth Service Proxy
app.use('/auth', createProxyMiddleware({
  target: 'http://localhost:4001',
  changeOrigin: true,
  pathRewrite: {
    '^/auth': '',
  },
}));

// Route Service Proxy
app.use('/routes', createProxyMiddleware({
  target: 'http://localhost:4002',
  changeOrigin: true,
  pathRewrite: {
    '^/routes': '',
  },
}));

// Booking Service Proxy
app.use('/bookings', createProxyMiddleware({
  target: 'http://localhost:4003',
  changeOrigin: true,
  pathRewrite: {
    '^/bookings': '',
  },
}));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
