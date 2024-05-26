import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookUserClubComponent } from './book-user-club.component';

describe('BookUserClubComponent', () => {
  let component: BookUserClubComponent;
  let fixture: ComponentFixture<BookUserClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookUserClubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookUserClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
