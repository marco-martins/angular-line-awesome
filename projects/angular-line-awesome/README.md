# Angular Line Awesome
Simple, easy to use [Angular](https://angular.io) component to manage [Line Awesome](https://icons8.com/line-awesome) icons.

# How to install

**Install Packages**
`npm install --save line-awesome angular-line-awesome`

**Import the module**
```typescript
//...
import { AngularLineAwesomeModule } from 'angular-line-awesome';
@NgModule({
  //...
  imports: [
    //...
    AngularLineAwesomeModule
  ],
  //...
})
export class AppModule { }
```

**If you're using [Angular CLI](https://github.com/angular/angular-cli), add the line-awesome CSS to `styles` inside the `angular-cli.json`**
```json
"styles": [
    "styles.css",
    "./node_modules/line-awesome/dist/line-awesome/css/line-awesome.css"
],
```
**If you're using [Angular CLI](https://github.com/angular/angular-cli) 6.0.0, add the line-awesome CSS to `styles` inside the `angular.json`**
```json
"styles": [
    "styles.css",
    "./node_modules/line-awesome/dist/line-awesome/css/line-awesome.css"
],
```

*NOTE: If using SCSS preprocessor just change the `css` for `scss`
`"./node_modules/line-awesome/dist/line-awesome/scss/line-awesome.scss"`*


**If you're not using the CLI, import the stylesheet to your `index.html` file**
```html
<link rel="stylesheet" type="text/css" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css">
```

# Usage and options

Name        | Type                  | Options                                                    | Optional
---         | ---                   | ---                                                        | ---
icon        | `String, IconProp`    | [Line Awesome Icons](https://icons8.com/line-awesome) <br> *Ignore the ***las*** and ***la-*** part, this will be added by default.* | No
title       | `String`              | Free text                                                  | Yes
size        | `String`              | `xs, lg, sm, lx, 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, 10x`  | Yes
fixedWidth  | `Boolean`             | `true, false`                                              | Yes
rotate      | `Number, String`      | `90, 180, 270`                                             | Yes
flip        | `String`              | `horizontal, vertical, both`                               | Yes
pull        | `String`              | `left, right`                                              | Yes
spin        | `Boolean`             | `true, false`                                              | Yes
pulse       | `Boolean`             | `true, false`                                              | Yes
border      | `Boolean`             | `true, false`                                              | Yes
inverse     | `Boolean`             | `true, false`                                              | Yes
transform   | `String`              | `grow-NUMBER,`<br> `shrink-NUMBER,`<br> `up-NUMBER,`<br> `left-NUMBER,`<br> `right-NUMBER,`<br> `up-NUMBER,`<br> `down-NUMBER,` <br> `rotate-DEGREES,`<br> `flip-v,` <br> `flip-h` <br><br> *NUMBER is a number representings pixel, DEGREES is a number representings degrees, e.g. **grow-1**, **rotate-90*** | Yes

**Examples**
```html
<la-icon icon="hippo" ></la-icon>
<la-icon icon="hippo" size="2x"></la-icon>
<la-icon icon="hippo" rotate="90"></la-icon>
<la-icon icon="hippo" flip="horizontal"></la-icon>
<la-icon icon="hippo" pull="right"></la-icon>
<la-icon icon="hippo" spin="true"></la-icon>
<la-icon icon="hippo" pulse="true"></la-icon>
<la-icon icon="hippo" border="true"></la-icon>
<la-icon icon="hippo" inverse="true"></la-icon>
<la-icon icon="hippo" transform="grow-10 down-4 right-8 rotate-45 flip-v flip-h"></la-icon>
```

**Angular bind sintaxe**
```html
icon: IconProp = { prefix: 'lab', iconName: 'github' };

<la-icon [icon]="icon"></la-icon>
```

```html
icon: IconProp = ['lab', 'github-alt'];
iconSize: string = '2x';

<la-icon [icon]="icon" [size]="iconSize"></la-icon>
```

```html
transform: Transform = { size: 1, x: 1, y: -1, rotate: 90, flipX: true, flipY: true };

<la-icon icon="lab github" [transform]="transform"></la-icon>
```

*Click [here](https://angular-line-awesome.herokuapp.com/) to see the demo examples in the component page.*

# Contributions
```code
Clone repo:
git clone git@github.com:marco-martins/angular-line-awesome.git

Build:
ng build --project=angular-line-awesome

Run the project (demo-example by default):
ng serve

Run the tests:
ng test --project=angular-line-awesome
```

# TODO
- Tree shaking support to import only the necessary icons
