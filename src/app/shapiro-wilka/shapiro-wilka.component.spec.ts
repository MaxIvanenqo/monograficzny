import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapiroWilkaComponent } from './shapiro-wilka.component';

describe('ShapiroWilkaComponent', () => {
  let component: ShapiroWilkaComponent;
  let fixture: ComponentFixture<ShapiroWilkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapiroWilkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapiroWilkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
