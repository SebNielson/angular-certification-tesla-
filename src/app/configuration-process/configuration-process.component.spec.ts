import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationProcessComponent } from './configuration-process.component';

describe('ConfigurationProcessComponent', () => {
  let component: ConfigurationProcessComponent;
  let fixture: ComponentFixture<ConfigurationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigurationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
