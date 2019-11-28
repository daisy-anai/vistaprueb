import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteFisicoMecanicaComponent } from './reporte-fisico-mecanica.component';

describe('ReporteFisicoMecanicaComponent', () => {
  let component: ReporteFisicoMecanicaComponent;
  let fixture: ComponentFixture<ReporteFisicoMecanicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteFisicoMecanicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteFisicoMecanicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
