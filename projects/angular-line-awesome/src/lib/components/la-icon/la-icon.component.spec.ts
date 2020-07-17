import { ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SizeProp, IconProp } from '../../line-awesome.core';
import { queryByCss, initTest } from '../../test.utils';
import { Transform } from '../../line-awesome.core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

describe('LaIconComponent', () => {
  it('should render the icon with proper icons class', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon [icon]="icon"></la-icon>'
    })
    class HostComponent {
      icon: IconProp = ['las', 'user'];
    }

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').classList).toContain('las');
    expect(queryByCss(fixture, 'svg').classList).toContain('la-user');
  });

  it('should render the icon without prefix class (use the default prefix)', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="user"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').classList).toContain('las');
    expect(queryByCss(fixture, 'svg').classList).toContain('la-user');
  });

  it('should render the icon with the passed prefix class', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="lab github"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').classList).toContain('lab');
    expect(queryByCss(fixture, 'svg').classList).toContain('la-github');
  });

  it('should render the icon with the passed prefix class using Angular Object binding syntax', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon [icon]="icon"></la-icon>'
    })
    class HostComponent {
      icon: IconProp = { prefix: 'lab', iconName: 'twitter' };
    }

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').classList).toContain('lab');
    expect(queryByCss(fixture, 'svg').classList).toContain('la-twitter');
  });

  it('should render the icon with the passed prefix class using Angular Array binding syntax', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon [icon]="icon"></la-icon>'
    })
    class HostComponent {
      icon: IconProp = ['lab', 'twitter'];
    }

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').classList).toContain('lab');
    expect(queryByCss(fixture, 'svg').classList).toContain('la-twitter');
  });

  it('should render the icon with Angular async pipe', () => {
    const laDog: IconProp = { prefix: 'las', iconName: 'dog' };
    const laCat: IconProp = { prefix: 'las', iconName: 'cat' };

    @Component({
      selector: 'la-host',
      template: '<la-icon [icon]="icon | async"></la-icon>'
    })
    class HostComponent {
      iconSubject = new Subject<any>();

      icon = this.iconSubject.pipe(startWith(laDog));
    }

    const fixture = initTest(HostComponent);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.la-dog')).toBeTruthy();
    fixture.componentInstance.iconSubject.next(laCat);
    fixture.detectChanges();
    expect(queryByCss(fixture, '.la-cat')).toBeTruthy();
  });

  it('should render the icon with the passed classes in the input', () => {
    @Component({
      selector: 'la-host',
      template: `
        <la-icon icon="user" [classes]="['my-custom-class']"></la-icon>
      `
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').classList).toContain('my-custom-class');
  });

  it('should render the icon with size class', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="user" size="2x"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').classList).toContain('la-2x');
  });

  it('should render the icon with size class using Angular binding syntax', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon [icon]="icon" [size]="size"></la-icon>'
    })
    class HostComponent {
      icon: IconProp = ['las', 'user'];
      size: SizeProp = '2x';
    }

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').classList).toContain('la-2x');
  });

  it('should render the icon with rotate class', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="user" rotate="90"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').classList).toContain('la-rotate-90');
  });

  it('should render the icon with css transform grow applied', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="user" transform="grow-1"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').style.transform).toContain('scale(1.1)');
  });

  it('should render the icon with css transform shrink applied', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="user" transform="shrink-1"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').style.transform).toContain('scale(0.9)');
  });

  it('should render the icon with css transform rotate applied', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="user" transform="rotate-90"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').style.transform).toContain('rotate(90deg)');
  });

  it('should render the icon with css transform flip-v applied', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="user" transform="flip-v"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').style.transform).toContain('scaleY(-1)');
  });

  it('should render the icon with css transform flip-h applied', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="user" transform="flip-h"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').style.transform).toContain('scaleX(-1)');
  });

  it('should render the icon with css transform up-1 applied', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="user" transform="up-1"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').style.transform).toContain('translateY(-1px)');
  });

  it('should render the icon with css transform down-1 applied', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="user" transform="down-1"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').style.transform).toContain('translateY(1px)');
  });

  it('should render the icon with css transform left-1 applied', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="user" transform="left-1"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').style.transform).toContain('translateX(-1px)');
  });

  it('should render the icon with css transform right-1 applied', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="user" transform="right-1"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').style.transform).toContain('translateX(1px)');
  });

  it('should render the icon with several transforms applied', () => {
    @Component({
      selector: 'la-host',
      template:
        '<la-icon icon="user" transform="grow-1 up-1 right-1 rotate-90 flip-v flip-h"></la-icon>'
    })
    class HostComponent {}

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    fixture.detectChanges();
    const transformMock =
      'scale(1.1) translateX(1px) translateY(-1px) rotate(90deg) scaleX(-1) scaleY(-1)';
    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').style.transform).toContain(transformMock);
  });

  it('should render the icon with several transforms, when transform input is set using Angular binding syntax', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="user" [transform]="transform"></la-icon>'
    })
    class HostComponent {
      transform: Transform = {
        size: 1,
        x: 1,
        y: -1,
        rotate: 90,
        flipX: true,
        flipY: true
      };
    }

    const fixture: ComponentFixture<HostComponent> = initTest(HostComponent);
    const transformMock =
      'scale(1.1) translateX(1px) translateY(-1px) rotate(90deg) scaleX(-1) scaleY(-1)';
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'svg').style.transform).toContain(transformMock);
  });

  it('should render the title attribute, when title input is set using Angular binding syntax', () => {
    @Component({
      selector: 'la-host',
      template: `
        <la-icon icon="user" [title]="'User John Smith'"></la-icon>
      `
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);
    fixture.detectChanges();

    expect(queryByCss(fixture, 'svg')).toBeTruthy();
    expect(queryByCss(fixture, 'la-icon').getAttribute('title')).toBe('User John Smith');
  });

  it('should throw an error when icon attribute is missing', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon [icon]="undefined"></la-icon>'
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);

    expect(() => fixture.detectChanges()).toThrow(
      new Error('Property `icon` is required for `la-icon` component.')
    );
  });

  it('should throw an error if the icon is not found in the icon library', () => {
    @Component({
      selector: 'la-host',
      template: '<la-icon icon="lab angular"></la-icon>'
    })
    class HostComponent {}

    const fixture = initTest(HostComponent);

    expect(() => fixture.detectChanges()).toThrow(
      new Error('Could not find icon with prefix=lab and iconName=angular in the icon library.')
    );
  });
});
