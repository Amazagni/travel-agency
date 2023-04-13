import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WycieczkiComponent } from './wycieczki.component';

describe('WycieczkiComponent', () => {
  let component: WycieczkiComponent;
  let fixture: ComponentFixture<WycieczkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WycieczkiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WycieczkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
