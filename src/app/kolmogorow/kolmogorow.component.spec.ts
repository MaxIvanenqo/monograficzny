import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KolmogorowComponent } from './kolmogorow.component';

describe('KolmogorowComponent', () => {
  let component: KolmogorowComponent;
  let fixture: ComponentFixture<KolmogorowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KolmogorowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KolmogorowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
