<template>
    <div id="app">
        <label for="testField">Test label</label>
        <tag-picker :tagsList="tagArray" v-on:changed="updatedTags" tag-Color="#F16664" tag-text-Color="white" field-name="testField" editing-class="custom-editing"></tag-picker>
    </div>
</template>

<script>
import TagPicker from './components/TagPicker'
export default {
    name: 'app',
    components: {
        TagPicker
    },
    data() {
        return {
            tagString: "hello|world",
            tagArray: ["hello", "world"]
        }
    },
    methods: {
        updatedTags(newTags) {
            console.log("CahngedEvent", newTags)
            this.tagArray = newTags;
        }
    }
}
</script>

<style>
.custom-editing {
    background-color: green !important;
}
</style>