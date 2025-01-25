import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoPerfilPage } from './info-perfil.page';

describe('InfoPerfilPage', () => {
  let component: InfoPerfilPage;
  let fixture: ComponentFixture<InfoPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
