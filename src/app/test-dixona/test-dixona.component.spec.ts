import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDixonaComponent } from './test-dixona.component';

describe('TestDixonaComponent', () => {
  let component: TestDixonaComponent;
  let fixture: ComponentFixture<TestDixonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDixonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDixonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
