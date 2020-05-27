import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGrubbsaComponent } from './test-grubbsa.component';

describe('TestGrubbsaComponent', () => {
  let component: TestGrubbsaComponent;
  let fixture: ComponentFixture<TestGrubbsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGrubbsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGrubbsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
