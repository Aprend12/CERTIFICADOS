/**
 * Entry point for bootstrapping the Angular application on the server (SSR).
 * Configures the application to be rendered server-side.
 */
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

/**Bootstrap function that initializes the Angular application with server configuration.*/
const bootstrap = (context: BootstrapContext) =>
    bootstrapApplication(App, config, context);

export default bootstrap;
