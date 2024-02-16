import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://52.169.2.6:8443',
        realm: 'master',
        clientId: 'sample_keyclock_js',
      },
      initOptions: {
        onLoad: 'check-sso',  // allowed values 'login-required', 'check-sso';
        flow: "standard",         // allowed values 'standard', 'implicit', 'hybrid';
        silentCheckSsoRedirectUri:
		          window.location.origin + '/assets/verificar-sso.html'
      },
    });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
