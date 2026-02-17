/**
 * Punto de entrada para el bootstrapping de la aplicación Angular en el servidor (SSR).
 * Configura la aplicación para ser renderizada del lado del servidor.
 */
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

/**Función de bootstrap que inicializa la aplicación Angular con configuración de servidor.*/
const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(App, config, context);

export default bootstrap;
