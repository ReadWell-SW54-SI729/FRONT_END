import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTendenciaComponent } from './book-tendencia.component';

describe('BookTendenciaComponent', () => {
  let component: BookTendenciaComponent;
  let fixture: ComponentFixture<BookTendenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTendenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookTendenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
