import { TestBed } from '@angular/core/testing';

import { PlantillasCromaticaService } from './plantillas-cromatica.service';

describe('PlantillasCromaticaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlantillasCromaticaService = TestBed.get(PlantillasCromaticaService);
    expect(service).toBeTruthy();
  });
});
