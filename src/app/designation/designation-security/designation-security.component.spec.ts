import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationSecurityComponent } from './designation-security.component';

describe('DesignationSecurityComponent', () => {
  let component: DesignationSecurityComponent;
  let fixture: ComponentFixture<DesignationSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationSecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
