import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoEnderecoPage } from './info-endereco.page';

describe('InfoEnderecoPage', () => {
  let component: InfoEnderecoPage;
  let fixture: ComponentFixture<InfoEnderecoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEnderecoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
