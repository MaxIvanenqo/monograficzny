import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DystrybuantaEmpirycznaComponent } from './dystrybuanta-empiryczna.component';

describe('DystrybuantaEmpirycznaComponent', () => {
  let component: DystrybuantaEmpirycznaComponent;
  let fixture: ComponentFixture<DystrybuantaEmpirycznaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DystrybuantaEmpirycznaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DystrybuantaEmpirycznaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
