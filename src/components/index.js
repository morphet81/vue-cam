import Vue from 'vue'
import Cam from './Cam.vue'

// List components we want to make available in the library
// const Components = {
//     Cam
// }
const components = {
    'vc-cam': Cam
}

// Globally register all the components
Object.keys(components).forEach(name => {
    Vue.component(name, components[name])
})

// Export
export default components

