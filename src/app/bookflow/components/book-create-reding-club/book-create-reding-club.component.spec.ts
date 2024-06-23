import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreateRedingClubComponent } from './book-create-reding-club.component';

describe('BookCreateRedingClubComponent', () => {
  let component: BookCreateRedingClubComponent;
  let fixture: ComponentFixture<BookCreateRedingClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCreateRedingClubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookCreateRedingClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
