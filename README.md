# Angular Line Awesome

Simple, easy to use [Angular](https://angular.io) component to manage [Line Awesome](https://icons8.com/line-awesome) icons.

_Click [here](https://angular-line-awesome.herokuapp.com/) to see the demo examples in the component page._

# How to install

**Install the package**

`npm install --save angular-line-awesome`

**Setup**

1. Import { AngularLineAwesomeModule, LaIconLibrary } from "angular-line-awesome"
2. Add AngularLineAwesomeModule to the imports array
3. Inject LaIconLibrary into the constructor of the module
4. Import an icon like "lasHippo" from "angular-line-awesome/icons"
5. Add icon to the library with library.addIcons([lasHippo]) in the AppModule constructor

```typescript
//...
import { AngularLineAwesomeModule, LaIconLibrary } from 'angular-line-awesome';
import { lasHippo, lasHeart, labAngular } from 'angular-line-awesome/icons';

@NgModule({
  //...
  imports: [
    //...
    AngularLineAwesomeModule
  ]
  //...
})
export class AppModule {
  constructor(library: LaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons([lasHippo, lasHeart, labAngular]);
  }
}
```

# Usage and options

| Name       | Type               | Options                                                                                                                                                                                                                                                                                                           | Optional |
| ---------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| icon       | `String, IconProp` | [Line Awesome Icons](https://icons8.com/line-awesome) <br> \*Ignore the **_las_** and **_la-_** part, this will be added by default.\*                                                                                                                                                                            | No       |
| title      | `String`           | Free text                                                                                                                                                                                                                                                                                                         | Yes      |
| size       | `String`           | `xs, lg, sm, lx, 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, 10x`                                                                                                                                                                                                                                                         | Yes      |
| fixedWidth | `Boolean`          | `true, false`                                                                                                                                                                                                                                                                                                     | Yes      |
| rotate     | `Number, String`   | `90, 180, 270`                                                                                                                                                                                                                                                                                                    | Yes      |
| flip       | `String`           | `horizontal, vertical, both`                                                                                                                                                                                                                                                                                      | Yes      |
| pull       | `String`           | `left, right`                                                                                                                                                                                                                                                                                                     | Yes      |
| spin       | `Boolean`          | `true, false`                                                                                                                                                                                                                                                                                                     | Yes      |
| pulse      | `Boolean`          | `true, false`                                                                                                                                                                                                                                                                                                     | Yes      |
| border     | `Boolean`          | `true, false`                                                                                                                                                                                                                                                                                                     | Yes      |
| inverse    | `Boolean`          | `true, false`                                                                                                                                                                                                                                                                                                     | Yes      |
| transform  | `String`           | `grow-NUMBER,`<br> `shrink-NUMBER,`<br> `up-NUMBER,`<br> `left-NUMBER,`<br> `right-NUMBER,`<br> `up-NUMBER,`<br> `down-NUMBER,` <br> `rotate-DEGREES,`<br> `flip-v,` <br> `flip-h` <br><br> \*NUMBER is a number representings pixel, DEGREES is a number representings degrees, e.g. **grow-1**, **rotate-90\*** | Yes      |

**Examples**

```html
<la-icon icon="hippo"></la-icon>
<la-icon icon="hippo" size="2x"></la-icon>
<la-icon icon="hippo" rotate="90"></la-icon>
<la-icon icon="hippo" flip="horizontal"></la-icon>
<la-icon icon="hippo" pull="right"></la-icon>
<la-icon icon="hippo" spin="true"></la-icon>
<la-icon icon="hippo" pulse="true"></la-icon>
<la-icon icon="hippo" border="true"></la-icon>
<la-icon icon="hippo" inverse="true"></la-icon>
<la-icon icon="las hippo" transform="grow-10 down-4 right-8 rotate-45 flip-v flip-h"></la-icon>
```

Note: the prefix is not necessary because the library uses the prefix 'las' as default.

**Angular bind sintaxe**

```html
<!-- ['las', 'hippo'] is an array that indicates the [prefix, iconName] -->
<la-icon [icon]="['las', 'hippo']"></la-icon>
```

<br>
```javascript
// component ts
icon: IconProp = { prefix: 'lab', iconName: 'angular' };
```

```html
<!-- component view -->
<la-icon [icon]="icon"></la-icon>
```

<br>
```javascript
// component ts
icon: IconProp = ['lab', 'angular'];
iconSize: string = '2x';
```

```html
<!-- component view -->
<la-icon [icon]="icon" [size]="iconSize"></la-icon>
```

<br>
```javascript
// component ts
transform: Transform = { size: 1, x: 1, y: -1, rotate: 90, flipX: true, flipY: true };
```

```html
<!-- component view -->
<la-icon icon="lab angular" [transform]="transform"></la-icon>
```

<br>

**Important release notes and braking changes**

**_1.1.x_**

- Angular 9
- Line Awesome 1.3.0 SVG Icons (the icons are now loaded in SVG format)
- Tree shakable icons (import only the necessary icons)
- Removed the Font Icons support

From the 1.0.x version, there is a small breaking changes:

- You need to import the icons that you are using in your AppModule
- You can now remove the lineawesome package from your node modules
- Remove the lineawesome styles import on your angular.json file

<br>

**_1.0.x_**

- Angular 8
- Line Awesome 1.3.0 Font Icons

# Contributions

```code
Clone repo:
git clone git@github.com:marco-martins/angular-line-awesome.git

Build:
npm run build -- --project='angular-line-awesome'

Run the project (demo-example by default):
ng serve

Run the tests:
ng test --project=angular-line-awesome
```

# TODO

- Create separated icons packages to the regular, solid and brands SVG icons
