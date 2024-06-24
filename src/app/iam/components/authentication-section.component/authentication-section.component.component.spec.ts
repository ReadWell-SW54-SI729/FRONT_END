import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationSectionComponentComponent } from './authentication-section.component.component';

describe('AuthenticationSectionComponentComponent', () => {
  let component: AuthenticationSectionComponentComponent;
  let fixture: ComponentFixture<AuthenticationSectionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthenticationSectionComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthenticationSectionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
