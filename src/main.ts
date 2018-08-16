import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

document.write('<script src="https://js.stripe.com/v3/"></script>');
if (environment.production) {
  enableProdMode();
}
document.write(`<script type="text/javascript">
    var stripe = Stripe("${environment.stripeKey}"); // use your test publishable key
    var elements = stripe.elements();
</script>`);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
