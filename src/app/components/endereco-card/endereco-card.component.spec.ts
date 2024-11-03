import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EnderecoCardComponent } from './endereco-card.component';

describe('EnderecoCardComponent', () => {
  let component: EnderecoCardComponent;
  let fixture: ComponentFixture<EnderecoCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EnderecoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnderecoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
