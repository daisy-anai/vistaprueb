import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { StorageService } from './shared/services/storage.service';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink, service: StorageService){
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
        uri: environment.URIBackRevista,
        headers: new HttpHeaders({
          authorization: `Bearer ${service.getCurrentToken()}`
        })
      }),
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'ignore'
        }
      }
    });
  }
}
