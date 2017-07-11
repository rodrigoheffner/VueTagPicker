<template>
  <div id="app">
    <label for="testField">Test label</label>
    <tag-picker :tagsList="tagArray" v-on:changed="updatedTags" tag-colour="#F16664" tag-text-colour="white" field-name="testField"></tag-picker>
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

</style>
