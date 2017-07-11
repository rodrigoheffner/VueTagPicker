module.exports = {
    TagPicker: require('./components/TagPicker.vue'),
    install(Vue){
        Vue.component('tag-picker', module.exports.TagPicker)
    }    
}