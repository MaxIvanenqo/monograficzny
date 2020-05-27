import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PearsonComponent } from './pearson.component';

describe('PearsonComponent', () => {
  let component: PearsonComponent;
  let fixture: ComponentFixture<PearsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PearsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PearsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
