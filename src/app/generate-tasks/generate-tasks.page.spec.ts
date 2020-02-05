import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateTasksPage } from './generate-tasks.page';

describe('GenerateTasksPage', () => {
  let component: GenerateTasksPage;
  let fixture: ComponentFixture<GenerateTasksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateTasksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
