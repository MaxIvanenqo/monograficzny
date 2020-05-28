import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RozszerzenieZakresuHistogramuComponent } from './rozszerzenie-zakresu-histogramu.component';

describe('RozszerzenieZakresuHistogramuComponent', () => {
  let component: RozszerzenieZakresuHistogramuComponent;
  let fixture: ComponentFixture<RozszerzenieZakresuHistogramuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RozszerzenieZakresuHistogramuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RozszerzenieZakresuHistogramuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
