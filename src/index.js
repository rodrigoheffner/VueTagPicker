import VueTouch from 'vue-touch';
module.exports = {
    TagPicker: require('./components/TagPicker.vue'),
    install(Vue) {
        Vue.use(VueTouch)
        Vue.component('tag-picker', module.exports.TagPicker)
    }
}