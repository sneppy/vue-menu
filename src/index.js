import { reactive } from 'vue'

import MenuView, { keySym } from './view'
import '../style/less/index.less'

// Symbol used to identify event handler
const eventHandlerSym = Symbol('__vue_menu_handler')

// Symbol for main name
const mainNameSym = Symbol('__vue_menu_main')

// Global install flag
let installed = false

/* Plugin entry point. */
export default function install(app, options) {

	if (installed)
	{
		console.warn('A instance of vue-menu already exists')
		return
	}
	installed = true

	let states = {}

	/* Return state by name */
	const _getState = (name) => {

		// Create if it does not exist
		states[name] = states[name] || reactive([])
		return states[name]
	}

	/* Push menu to state */
	const _setMenu = (menu, name = mainNameSym) => {

		let state = _getState(name)
		state.pop()
		state.push(menu)
	}

	/* Pop menu from state */
	const _popMenu = (menu, name = mainNameSym) => {

		let state = _getState(name)
		state.pop()
	}

	/* Return the active menu. */
	const _getMenu = (name = mainNameSym) => {

		let state = _getState(name)
		return state[state.length - 1]
	}

	// Register component
	app.component('MenuView', MenuView)

	// Register directive
	app.directive('menu', {
		mounted(el, { value, arg }, vnode) {

			const eventHandler = (e) => {

				// Push to state
				_setMenu({options: value, pos: [e.clientX, e.clientY], arg})

				// Don't show system menu
				e.preventDefault()
			}

			// Register event handler
			el.addEventListener('contextmenu', eventHandler)
			el[eventHandlerSym] = eventHandler
		},
		beforeUnmount(el) {

			// Remove event listener
			const eventHandler = el[eventHandlerSym]
			el.removeEventListener('contextmenu', eventHandler)
		}
	})

	// Provide this instance
	app.provide(keySym, {_setMenu, _popMenu, _getMenu})
}
