import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

// Variables
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalidadService {

  constructor(private apollo: Apollo){}


}
