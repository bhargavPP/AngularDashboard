import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeKpiComponent } from './realtime-kpi.component';

describe('RealtimeKpiComponent', () => {
  let component: RealtimeKpiComponent;
  let fixture: ComponentFixture<RealtimeKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealtimeKpiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealtimeKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
