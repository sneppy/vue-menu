<template lang="pug">
div(class="menu-component" :style="style")
	template(v-for="group, i in groups" :key="i")
		ul(class="menu-group")
			li(v-for="option, name in group" :key="name" class="menu-option" @click="option.action")
				| {{ option.title || name }}
		hr
</template>

<script>
import { computed } from 'vue'

/* If the argument is not an array, encapsulate it an array. */
const arrify = (x) => Array.isArray(x) ? x : [x]

export default {
	name: 'MenuComponent',
	props: {
		options: {
			type: [Array, Object],
			required: true
		},
		x: {
			type: Number,
			required: false
		},
		y: {
			type: Number,
			required: false
		}
	},
	setup(props) {

		// Computed groups of options
		let groups = computed(() => arrify(props.options))

		// Compute style
		let style = computed(() => {

			let style = {}

			if ('x' in props || 'y' in props)
			{
				// Set absolute position
				style.left = (props.x || 0) + 'px'
				style.top = (props.y || 0) + 'px'
			}

			return style
		})

		return { groups, style }
	},
}
</script>
