import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelWidgetComponent } from './funnel-widget.component';

describe('FunnelWidgetComponent', () => {
  let component: FunnelWidgetComponent;
  let fixture: ComponentFixture<FunnelWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunnelWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunnelWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
