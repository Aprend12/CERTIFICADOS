/** Express server for Angular Universal (SSR - Server Side Rendering).*/
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

/**Path to the browser static files folder */
const browserDistFolder = join(import.meta.dirname, '../browser');

/**Express application instance*/
const app = express();

/**Angular application engine for SSR*/
const angularApp = new AngularNodeAppEngine();

/**Serve static files from /browser folder with long-term cache configuration*/
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**Handle all other requests by rendering the Angular application.*/
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**Start the server if this module is the main entry point or if running via PM2.*/
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**Manejador de solicitudes utilizado por la CLI de Angular(para dev-server y durante el build) o Firebase Cloud Functions.*/
export const reqHandler = createNodeRequestHandler(app);
