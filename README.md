[![Build Status](https://travis-ci.org/Aidurber/VueTagPicker.svg?branch=master)](https://travis-ci.org/Aidurber/VueTagPicker)
# Vue Tag Picker

> A Tag Picker for Vue

![Demonstration](https://raw.githubusercontent.com/Aidurber/VueTagPicker/master/docs/example.gif)


## Introduction
This is a Vue.js component for accepting many dynamic input items from the user. This could be used for filtering or adding tags/categories (as the name suggests). This was originally written as a Knockout component but I needed the same functionality in Vue. 

## Usage
### Props
| Name        | Type           | Default  | Comments    |
| ------------- |:-------------| :-----|:------|
| allowDuplicates      | Boolean | false |
| seperator      | String      |   \| (Pipe) |
| addOnKeys | [Number]      |   [TagKey, EnterKey, CommaKey] | These are event keycodes. They trigger the adding of the tag.
|removeOnKeys | [Number] | [BackspaceKey] | These are event keycodes, they trigger the removing of the tag. |
| tagsList      | Array or String | [] | You can pass in a string or an array, the string will be seperated by the specified seperator (default "\|"). 
| tagColour      | String | #3498db | CSS colours, if it can be used in a style attribute and is a colour, you can use it. Sets the background colour of the tag, and the underline of the input. |
| fieldName      | String | vue-tag-picker |The ID for the tag picker. Primarily added so you can create a `<label for="vue-tag-picker">Some Label</label>` and give the input focus on label click/ |
| borderColor      | String | #cecece | Override the default border colour for the component. |


### Incomplete - This is a work in progress!
