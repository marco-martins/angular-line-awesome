import { Component } from '@angular/core';
import { initTest, queryByCss } from '../../test.utils';
import { IconProp } from '../../line-awesome.core';

describe('FaStackComponent', () => {
  it('should render stack icon', () => {
    @Component({
      selector: 'la-host',
      template: `
        <la-stack>
          <la-icon [icon]="circle" stackItemSize="2x"></la-icon>
          <la-icon [icon]="user" [inverse]="true" stackItemSize="1x"></la-icon>
        </la-stack>
      `
    })
    class HostComponent {
      circle: IconProp = ['las', 'circle'];
      user: IconProp = ['las', 'user'];
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement).toBeTruthy();
  });

  it('should include size class', () => {
    @Component({
      selector: 'la-host',
      template: `
        <la-stack size="2x">
          <la-icon [icon]="circle" stackItemSize="2x"></la-icon>
          <la-icon [icon]="user" [inverse]="true" stackItemSize="1x"></la-icon>
        </la-stack>
      `
    })
    class HostComponent {
      circle: IconProp = ['las', 'circle'];
      user: IconProp = ['las', 'user'];
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.la-2x')).toBeTruthy();
  });
});
