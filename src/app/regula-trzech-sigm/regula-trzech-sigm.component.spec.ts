import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulaTrzechSigmComponent } from './regula-trzech-sigm.component';

describe('RegulaTrzechSigmComponent', () => {
  let component: RegulaTrzechSigmComponent;
  let fixture: ComponentFixture<RegulaTrzechSigmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulaTrzechSigmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulaTrzechSigmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
