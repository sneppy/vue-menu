# VueMenu

[![npm version](https://badge.fury.io/js/@sneppy%2Fvue-menu.svg)](https://www.npmjs.com/package/@sneppy/vue-menu)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build](https://github.com/sneppy/vue-menu/actions/workflows/build.yml/badge.svg)](https://github.com/sneppy/vue-menu/actions/workflows/build.yml)

A simple and easy-to-use custom context-menu for Vue 3.

![demo](https://i.imgur.com/ibu96KY.gif)

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

- `action` is a function called when the associated menu option is clicked. It receives the native click event;
- `title` is the text displayed in the menu. If not provided, the option key is used.

If an array of objects is passed, options are visually subdivided in groups.

Finally, this is the minimum amount of styling needed to get the menu to behave correctly:

```css
/* This should cover the browser visible screen */
.menu-view {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
}

.menu-view .menu-component {
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

Or you can provide your own style using any preprocessor, e.g.:

```less
.menu-view {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	z-index: 999;
}

.menu-component {
	.menu-group {
		list-style-type: none;
		margin-block-start: 0.5em;
		margin-block-end: 0.5em;
		padding-inline-start: 0;

		.menu-option {
			padding: 0.25em 2em;
			cursor: pointer;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	hr {
		margin: 0.5em 1em;

		&:last-of-type {
			display: none;
		}
	}
}
```

---

Check out other Vue libraries:

- [Stallone](https://www.npmjs.com/package/@sneppy/stallone) is an elegant and intuitive library to create REST API
  clients;
- [vue-pop](https://www.npmjs.com/package/@sneppy/vue-pop) is a Vue 3 plugin to manage pop-up windows and notifications.
