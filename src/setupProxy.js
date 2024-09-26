const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware(
            {
                //Local
                //target: 'http://localhost:3000/',
                //Back
                target: 'http://back-fosters.azurewebsites.net/',
                changeOrigin: true,
                ws: true,
                /* router: {
                    'localhost:3000': 'http://localhost:5000',
                }, */
                onProxyReq: function(request) {
                    //Local
                    //request.setHeader("origin", "http://localhost:3000/");
                    //Back
                    request.setHeader("origin", "http://back-fosters.azurewebsites.net/");
                },
            }
        )
    );
};