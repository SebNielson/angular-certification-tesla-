import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsSelectionComponent } from './options-selection.component';

describe('OptionsSelectionComponent', () => {
  let component: OptionsSelectionComponent;
  let fixture: ComponentFixture<OptionsSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OptionsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
