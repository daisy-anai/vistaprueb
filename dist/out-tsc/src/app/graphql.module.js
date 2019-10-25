import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
let GraphQLModule = class GraphQLModule {
    constructor(apollo, httpLink) {
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
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'ignore'
                }
            }
        });
    }
};
GraphQLModule = tslib_1.__decorate([
    NgModule({
        imports: [
            HttpClientModule,
            ApolloModule,
            HttpLinkModule
        ]
    })
], GraphQLModule);
export { GraphQLModule };
