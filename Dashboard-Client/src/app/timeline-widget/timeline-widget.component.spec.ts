import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineWidgetComponent } from './timeline-widget.component';

describe('TimelineWidgetComponent', () => {
  let component: TimelineWidgetComponent;
  let fixture: ComponentFixture<TimelineWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimelineWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
