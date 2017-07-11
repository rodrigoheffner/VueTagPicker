<template>
  <div class="tagpicker">
    <ul class="tagger-main" @click="setFocus">
      <pre data-bind="text: ko.toJSON($data, null, 2)"></pre>
  
      <li v-for="(tag, index) in tags" class="tagger-tag" v-bind:key="tag">
        <span>{{tag}}</span>
        <span class="tagger-remove clickable" @click="removeTag(tag, index)">
          X
        </span>
      </li>
      <!-- /ko -->
  
      <li class="tagger-new">
        <input type="text" v-model="field" @keydown="fieldUpdate" @blur="lostFocus">
      </li>
    </ul>
  </div>
</template>

<script>
import {
  CommaKey, TabKey, DeleteKey, SpaceKey, EnterKey
} from '../utils/constants';
export default {
  name: 'tag-picker',
  props: {
    allowSpace: {
      type: Boolean,
      default: false
    },
    allowDuplicates: {
      type: Boolean,
      default: false
    },
    seperator: {
      type: String,
      default: "|"
    }
  },
  data() {
    return {
      addOnKeys: [TabKey, EnterKey, CommaKey],
      removeOnKeys: [DeleteKey],
      tags: [],
      field: ""
    }
  },
  methods: {
    setFocus() {
      const inputs = this.$el.getElementsByTagName("input")
      if (inputs.length > 0)
        inputs[0].focus();
    },
    removeTag(tag, i) {
      const start = this.tags.slice(0, i);
      const end = this.tags.slice(i + 1);
      this.tags = start.concat(end);
    },
    lostFocus() {
      if (this.field.trim() !== "") {
        this.addTag();
      }
    },
    addTag() {
      if (!this.allowDuplicates && this.tags.includes(this.field)) {
        return;
      }
      if (!!this.field.trim()) {
        this.tags.push(this.field);
        this.field = "";
      }
    },
    fieldUpdate(e) {
      if (this.addOnKeys.includes(e.keyCode)) {
        this.addTag();
      } else if (this.removeOnKeys.includes(e.keyCode)) {
        this.tags.pop();
      } else {
        return true;
      }

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clickable {
  cursor: pointer;
}

.tagger-main {
  overflow: auto;
  margin-left: inherit;
  /* usually we don't want the regular ul margins. */
  margin-right: inherit;
  list-style: none;
  display: block;
  width: 100%;
  /* height: 34px; */
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.tagger-main li,
.tagger-main .tagger-new input {
  display: block;
  height: 100%;
  border: none;
  float: left;
  margin: 2px 10px 2px 0;
}

.tagger-main .tagger-new input {
  margin-top: 10px;
}

.tagger-main .tagger-new input:focus {
  outline: none;
  border-bottom: #3498db 2px solid;
}

.tagger-main .tagger-tag {
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.5em;
  border-radius: 3px;
  margin-left: 5px;
}

.tagger-main .tagger-remove {
  height: 100%;
  display: inline-block;
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes shake {
  from,
  to {
    transform: translate3d(0, 0, 0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-4px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(4px, 0, 0);
  }
}

.shake {
  animation-name: shake;
  animation-duration: 0.75s;
}
</style>
