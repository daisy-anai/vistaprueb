import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink){
    apollo.createNamed('servicios', {
      link: httpLink.create({
        uri: environment.URIServicios
      }),
      cache: new InMemoryCache()
    });

    apollo.createNamed('sicac', {
      link: httpLink.create({
        uri: environment.URISicac
      }),
      cache: new InMemoryCache()
    });

    apollo.createNamed('backrevista', {
      link: httpLink.create({
        uri: environment.URIBackRevista
      }),
      cache: new InMemoryCache()
    });
  }
}
