import { Component } from '@angular/core';
import { initTest, queryByCss } from '../../test.utils';

describe('FaStackItemSizeDirective', () => {
  it('should attach la-stack-1x or la-stack-2x classes to icons', () => {
    @Component({
      selector: 'la-host',
      template: `
        <la-stack>
          <la-icon [icon]="circle" stackItemSize="2x"></la-icon>
          <la-icon [icon]="user" [inverse]="true" stackItemSize="1x"></la-icon>
        </la-stack>
      `,
      standalone: false
    })
    class HostComponent {
      circle: string[] = ['las', 'circle'];
      user: string[] = ['las', 'user'];
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.la-stack-1x')).toBeTruthy();
    expect(queryByCss(fixture, '.la-stack-2x')).toBeTruthy();
  });

  it('should throw an error when setting size input together with stackItemSize', () => {
    @Component({
      selector: 'la-host',
      template: `
        <la-stack>
          <la-icon [icon]="circle" stackItemSize="2x"></la-icon>
          <la-icon [icon]="user" [inverse]="true" size="1x" stackItemSize="1x"></la-icon>
        </la-stack>
      `,
      standalone: false
    })
    class HostComponent {
      circle: string[] = ['las', 'circle'];
      user: string[] = ['las', 'user'];
    }

    const fixture = initTest(HostComponent);
    expect(() => fixture.detectChanges()).toThrow(
      new Error(
        'la-icon is not allowed to customize size when used inside la-stack. ' +
        'Set size on the enclosing la-stack instead: <la-stack size="4x">...</la-stack>.',
      ),
    );
  });
});
