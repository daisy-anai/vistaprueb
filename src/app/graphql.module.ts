
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class GraphQLModule {
  private readonly URI: string = 'http://172.80.13.12:10007/graphql';

  constructor(apollo: Apollo, httpLink: HttpLink){
    const options: any = { uri: this.URI };
    apollo.createNamed('endpoint2', {
      link: httpLink.create(options),
      cache: new InMemoryCache()
    });
  }
}
