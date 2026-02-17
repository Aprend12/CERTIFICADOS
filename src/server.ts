/** Servidor Express para Angular Universal (SSR - Server Side Rendering).*/
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

/**Ruta a la carpeta de archivos estáticos del navegador */
const browserDistFolder = join(import.meta.dirname, '../browser');

/**Instancia de la aplicación Express*/
const app = express();

/**Motor de aplicación Angular para SSR*/
const angularApp = new AngularNodeAppEngine();

/**Servir archivos estáticos desde la carpeta /browserConfiguración optimizada para caché a largo plazo*/
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**Manejar todas las demás solicitudes renderizando la aplicación Angular.*/
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**Iniciar el servidor si este módulo es el punto de entrada principalo si se ejecuta a través de PM2.*/
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
