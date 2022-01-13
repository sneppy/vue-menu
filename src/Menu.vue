<template lang="pug">
div(class="menu-component" :style="style")
	template(v-for="group, i in groups" :key="i")
		ul(class="menu-group")
			li(v-for="option, name in group" :key="name" class="menu-option" :class="{parent: name in nested}"
			   v-on="option.on")
				div(class="option-layout")
					span(class="option-title") {{ option.title || name }}
					span(class="expand-arrow")
				menu-component(class="nested" v-bind="nested[name]" v-show="nested[name].show" v-if="nested[name]")
		hr
</template>

<script>
import { computed, reactive, ref } from 'vue'

/* If the argument is not an array, encapsulate it an array. */
const arrify = (x) => Array.isArray(x) ? x : [x]

/* Compute x and y positions for nested component. */
const computeNestedMenuOffset = (rootEl) => {

	let x = '100%'
	let y = rootEl.offsetTop

	return [x, y]
}

export default {
	name: 'MenuComponent',
	props: {
		options: {
			type: [Array, Object],
			required: true
		},
		x: {
			type: [Number, String],
			required: false
		},
		y: {
			type: [Number, String],
			required: false
		},
		arg: null
	},
	setup(props, { emit }) {

		// Nested options
		let nested = reactive({})

		// Computed groups of options
		let groups = computed(() => arrify(props.options).map((group) => {

			let newGroup = {}
			for (let name in group)
			{
				const option = group[name]

				// Default click handler, closes the menu
				let onClick = (...args) => emit('close', ...args)

				// Create new entry
				newGroup[name] = {title: option.title, on: {}}

				if (option.options)
				{
					// Create state for nested menu
					nested[name] = {
						options: option.options,
						x: 0, y: 0,
						show: false
					}

					// Add mouseover/mouseout handlers
					newGroup[name].on['mouseenter'] = (e) => {

						let [ x, y ] = computeNestedMenuOffset(e.target)
						nested[name].x = x
						nested[name].y = y
						nested[name].show = true
					}
					newGroup[name].on['mouseleave'] = (e) => {

						nested[name].show = null
					}
				}

				if (option.action)
				{
					// Change click and contextmenu handlers to execute action
					onClick = (...args) => {

						if (!option.action(...args, props.arg))
						{
							// If action returns a false-ish value, close menu
							emit('close', ...args)
						}
					}
				}

				// Register click and contextmenu handlers
				newGroup[name].on['click'] = onClick
				newGroup[name].on['contextmenu'] = onClick
			}

			return newGroup
		}))

		// Computed style
		let style = computed(() => {

			let style = {}

			if ('x' in props || 'y' in props)
			{
				// Set absolute position
				style.left = typeof props.x === 'string' ? props.x : (props.x || 0) + 'px'
				style.top = typeof props.y === 'string' ? props.y : (props.y || 0) + 'px'
			}

			return style
		})

		return { groups, style, nested }
	}
}
</script>
