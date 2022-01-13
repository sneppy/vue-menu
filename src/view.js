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
			let { options, pos, arg } = menu

			/* This is called when closing the menu. */
			const onClose = () => plugin._popMenu()

			/* Called when clicking the backdrop, close the menu. */
			const onClick = () => onClose()

			/* Prevents system ctx menu from showing when right-clicking backdrop. */
			const onContextmenu = (e) => {

				onClose()
				e.preventDefault()
			}

			return h('div', {class: 'menu-container'}, [
				h('div', {class: 'menu-backdrop', onClick, onContextmenu}),
				h(MenuComponent, {options, x: pos[0], y: pos[1], arg, onClose})
			])
		}
	}
})
