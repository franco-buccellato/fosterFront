const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use(
//         '/api',
//         createProxyMiddleware({
//             target: 'https://back-fosters.azurewebsites.net',
//             changeOrigin: true,
//             ws: false, // 👈 Desactivado
//             onProxyReq: function(request) {
//                 request.setHeader("origin", "https://back-fosters.azurewebsites.net");
//             },
//         })
//     );
// };


module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000', // 👈 Apunta a tu Node.js local
            changeOrigin: true,
            ws: false,
        })
    );
};