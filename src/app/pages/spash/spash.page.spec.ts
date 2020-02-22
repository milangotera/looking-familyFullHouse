import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpashPage } from './spash.page';

describe('SpashPage', () => {
  let component: SpashPage;
  let fixture: ComponentFixture<SpashPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpashPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpashPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
