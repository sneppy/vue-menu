import { defineComponent, h, inject } from 'vue'

import MenuComponent from './Menu.vue'

// Instance key
export const keySym = Symbol('__vue_menu_key')

export default defineComponent({
	name: 'MenuView',
	setup() {

		// Retrieve the plugin instance
		const plugin = inject(keySym)

		return () => {

			// Get the active menu
			let menu = plugin._getMenu()
			if (!menu)
			{
				// Don't render
				return null
			}

			// Get only properties we need
			let { options, pos } = menu

			// This pops the menu
			const onClick = () => plugin._popMenu()

			// This prevents system context menu to pop up on custom menu
			const onContextmenu = (e) => {

				e.preventDefault()
			}

			return h('div', {class: 'menu-container', onClick, onContextmenu}, [
				h(MenuComponent, {options, x: pos[0], y: pos[1]})
			])
		}
	}
})
