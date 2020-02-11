import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HoursPage } from './hours.page';

describe('HoursPage', () => {
  let component: HoursPage;
  let fixture: ComponentFixture<HoursPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoursPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HoursPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
