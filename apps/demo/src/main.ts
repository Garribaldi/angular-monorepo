import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { APP_CONFIG, AppConfig } from "@local/shared/feature/config";

fetch('./assets/config/app.config.json')
  .then(response => response.json())
  .then((config: AppConfig) => {
    platformBrowserDynamic([{provide: APP_CONFIG, useValue: config}])
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  });
