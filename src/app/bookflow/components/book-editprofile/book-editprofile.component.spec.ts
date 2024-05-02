import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEditprofileComponent } from './book-editprofile.component';

describe('BookEditprofileComponent', () => {
  let component: BookEditprofileComponent;
  let fixture: ComponentFixture<BookEditprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookEditprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookEditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
