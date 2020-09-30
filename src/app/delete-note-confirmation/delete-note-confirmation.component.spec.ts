import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteNoteConfirmationComponent } from './delete-note-confirmation.component';

describe('DeleteNoteConfirmationComponent', () => {
  let component: DeleteNoteConfirmationComponent;
  let fixture: ComponentFixture<DeleteNoteConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteNoteConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteNoteConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
