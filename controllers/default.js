module.exports = function(app) {
    app.get("/", (req, res) => {
        let routes = app._router.stack
            .filter((r) => r.route)
            .map((r) => {
                return { path: r.route.path, methods: r.route.methods };
            });

        let getRoutes = "";
        let postRoutes = "";

        routes.forEach((r) => {
            if (r.path != "/" && r.methods.get)
                getRoutes += `<li><a href="${r.path}">${r.path}</a></li>`;

            if (r.path != "/" && r.methods.post)
                postRoutes += `<li><a href="${r.path}">${r.path}</a></li>`;
        });

        let html = `<!DOCTYPE html>
    <html>
        <head>
            <title>Nuwan94 API</title>
            <link rel=icon type=image/png sizes=32x32 href="https://nuwan.dev/img/icons/favicon-32x32.png">
            <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,300italic,700,700italic">
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css">
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.css">
            <style>
                body{
                    padding: 3em;
                }
            </style>
        <head>
        <body>
            <div class="container">
            
                <div class"row">
                    <div class="column">
                        <h1>API for Nuwan94</h1>
                    </div>
                </div>
            
                <hr/>

                <div class"row">
                    <div class="column">
                    <h3>Public endpoints</h3>
                    <hr/>
                    <h4>GET /</h4>
                        <ul>${getRoutes}</ul>
                        <hr/>
                    <h4>POST /</h4>
                        <ul>${postRoutes}</ul>
                    </div>
                </div>

                <hr>
                <p>© 2020 | Nuwan94 | <a href="https://github.com/nuwan94/nuwan94-api" target="_blank">View Source</a></p>
            </div>
        </body>
    </html>`;

        res.send(html);
    });
};