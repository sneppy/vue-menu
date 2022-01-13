# VueMenu

[![npm version](https://badge.fury.io/js/@sneppy%2Fvue-menu.svg)](https://www.npmjs.com/package/@sneppy/vue-menu)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build](https://github.com/sneppy/vue-menu/actions/workflows/build.yml/badge.svg)](https://github.com/sneppy/vue-menu/actions/workflows/build.yml)

A simple and easy-to-use custom context-menu for Vue 3.

![demo](https://i.imgur.com/L9nLv4m.gif)

Installation
------------

You can install the library using npm:

```console
$ npm install --save @sneppy/vue-menu
```

Usage
-----

Import the package and install the plugin with the Vue app:

```javascript
// ...
import VueMenu from '@sneppy/vue-menu'

createApp(App).use(VueMenu)
			  .mount('#app')
```

Then you need to declare a `menu-view` instance. Much like `router-view`, that is where the menu component will be
spawned:

```vue
// App.vue
<template>
	<div id="App">
		<router-view/>
		<menu-view/>
	</div>
</template>
```

Finally, use the `v-menu` directive on the element you want to click to show the context menu:

```html
<div class="tab" v-menu="tabMenuOptions">
```

The `v-menu` directive accepts an object or an array of objects, where each key-value pair is a menu option:

```javascript
const tabMenuOptions = {
	close: {
		title: 'Close',
		action: () => tab.close()
	},
	closeAll: {
		title: 'Close All Tabs',
		action: () => closeAllTabs()
	}
}
```

Each entry has the following properties:

- `action` is a function called when the associated menu option is clicked. It receives the native click event. If the action returns a true-ish value it prevents the menu from closing;
- `title` is the text displayed in the menu. If not provided, the option key is used;
- `options` is an object or array of objects of nested options.

If an array of objects is passed, options are visually subdivided in groups.

Finally, this is the minimum amount of styling needed to get the menu to behave correctly (without nested options):

```css
/* This should cover the browser visible screen */
.menu-container,
.menu-container .menu-backdrop {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
}

.menu-container {
	z-index: 999;
	pointer-events: none;
}

.menu-container>* {
	pointer-events: all;
}

.menu-container .menu-backdrop {
	z-index: 0
}

.menu-container .menu-component {
	position: absolute;
	background-color: white;
}
```

Styling
-------

You can import a default style:

```javascript
import "@sneppy/vue-menu/dist/index.css"
```

(or in CSS)

```css
/* Remember to configure ~ alias */
@import "~/@sneppy/vue-menu/dist/index.css"
```

Or you can provide your own style.

The css selectors for a fully expanded menu are:

```
div.menu-container
	div.menu-backdrop
	div.menu-component
		ul.menu-group
			li.menu-option
				span.option-title
				span.expand-arrow
				div.menu-component.nested
					...
		hr
```

---

Check out other Vue libraries:

- [Stallone](https://www.npmjs.com/package/@sneppy/stallone) is an elegant and intuitive library to create REST API
  clients;
- [vue-pop](https://www.npmjs.com/package/@sneppy/vue-pop) is a Vue 3 plugin to manage pop-up windows and notifications.
