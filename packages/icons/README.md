# `@pingux/icons`

This package contains iconfonts from IcoMoon as well as svg and scss files. It also generates css and components for UI Library. CSS, font files and svg are put on the cdn and versioned.

## Using the Module

```shell
 yarn add @pingux/icons
 ```

### As Components

```jsx
import { Badge, Cogs } from '@pingux/icons'

<div><Badge /><Cogs /></div>
```
Icons can be chosen from the ui-library list here https://uilibrary.ping-eng.com/4.11.0/#/?selectedSection=undefined&selectedNode=Icons&root=Design
Marketing icons do not have components.

By default, Icon components are 1em x 1em so they take on the text size of their container. They spread any props to the <svg> tag so you can define a style to change the height and width.

### As a font

```jsx
import 'ui-library.css' from '@pingux/icons/lib';

<i className="pingicon-badge" />
```

Import the ui-library css anywhere in your app to be able to use the class names. Icons are prefixed with "pingicon-" to keep them unique. Marketing icons are available from "marketing.css" and are prefixed with "picicon-"

### As scss
```scss
@import '~@pingux/icons/lib/ui-library.scss'
```

You can include the project in your sass file by importing the project .scss file. The icomoon base sass files are availabe in the project folders eg (@pingux/icons/marketing/_styles.scss | _variables.scss). Fonts are in these folders as well and you may need a loader for them to move them into your project. If your font path is different than the default (ui-library/fonts, marketing/fonts), set $icomoon-font-path variable in your project.

### As SVG
```jsx
import Badge from '@pingux/icons/lib/ui-library/svg/badge.svg'

    <img src={Badge} />
    <!-- or try  -->
    <Badge />
```
Raw svg files are in the svg folder of each project. If you are using React it is recommended to use the top-level components if you are using the ui-library. If you choose to use the base svg's you may need a loader in your bundler or use svgr to turn them into React components.

You can also include these svgs in your scss provided that you or your bundler moves the files over from the node_module.


## Using the CDN
```html
<link rel="stylesheet" type="text/css" href="https://assets.pingone.com/ux/icons/0.1.0/ui-library.css">
<link rel="stylesheet" type="text/css" href="https://assets.pingone.com/ux/icons/0.1.0/marketing.css">
```

To make using the icons easier in web products, we put them on Ping's production cdn. The fonts are available at the top level to use with css classes.
https://assets.pingone.com/ux/icons/0.1.0/ui-library.css prefix:"pingicon-"
https://assets.pingone.com/ux/icons/0.1.0/marketing.css prefix:"picicon-"

SVGs are in the project/svg folder
https://assets.pingone.com/ux/icons/0.1.0/ui-library/svg/help.svg

## Development
Icons are added from Ping's icomoon account. Download SVGs to put in the svg folder. Download font files with sass as the preprocessor. Font folder and selection.json can just be moved over, but style.scss and variables.css need to be renamed with an _ before them.

## Publishing
When your changes are merged in, go to Jenkins Ice cream, select the generic release package to release the project. Select your branch, your version type ("minor") and your package name (this is the folder name for your package and not the npm name)


## TODOS
*Demo:* Integrate into a demo site (ideally UI Library) to showcase all icons
*Testing:* Since components are generated at build time, not much testing should be required if we trust svgr library. Maybe some file comparison could help with changes from icomoon.
