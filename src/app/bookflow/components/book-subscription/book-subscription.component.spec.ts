import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSubscriptionComponent } from './book-subscription.component';

describe('BookSubscriptionComponent', () => {
  let component: BookSubscriptionComponent;
  let fixture: ComponentFixture<BookSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSubscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
