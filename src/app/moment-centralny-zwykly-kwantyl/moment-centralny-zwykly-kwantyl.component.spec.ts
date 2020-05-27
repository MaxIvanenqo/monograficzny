import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentCentralnyZwyklyKwantylComponent } from './moment-centralny-zwykly-kwantyl.component';

describe('MomentCentralnyZwyklyKwantylComponent', () => {
  let component: MomentCentralnyZwyklyKwantylComponent;
  let fixture: ComponentFixture<MomentCentralnyZwyklyKwantylComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentCentralnyZwyklyKwantylComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentCentralnyZwyklyKwantylComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
