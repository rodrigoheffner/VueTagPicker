import Vue from 'vue/dist/vue.js'
import TagPicker from '@/components/TagPicker'
import { CommaKey, TabKey, DeleteKey, SpaceKey, EnterKey } from '@/utils/constants';
import { addClass, removeClass, toggleClass } from '@/utils/dom';
describe('TagPicker.vue', () => {
  const basicStringArray = "foo|bar";
  let Constructor;
  let vm;
  beforeEach((done) => {
    Constructor = Vue.extend(TagPicker)
    vm = null;
    done();
  });

  it('should have the correct default data', () => {
    vm = new Constructor().$mount()
    expect(vm.allowDuplicates).to.equal(false)
    expect(vm.addOnKeys).to.be.an('array');
    expect(vm.removeOnKeys).to.be.an('array');
    expect(vm.tagsList).to.be.an('array');
    expect(vm.editing.mode).to.equal(false);
  });

  it('should seperate tags if string is passed as tagsList', () => {
    vm = new Constructor({
      propsData: {
        tagsList: basicStringArray
      }
    }).$mount()

    expect(vm.tags).to.be.an('array').that.includes("foo")
    expect(vm.tags.length).to.equal(2);

  });

  it('should seperate tags if string is passed as tagsList with a custom seperator', () => {
    vm = new Constructor({
      propsData: {
        tagsList: "foo~bar",
        seperator: "~"
      }
    }).$mount()


    expect(vm.tags.length).to.equal(2);
  });

  it('should just use the array if tagsList is an array', () => {
    vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"]
      }
    }).$mount()

    expect(vm.tags).to.be.an('array').that.includes("foo")
    expect(vm.tags.length).to.equal(2);

  });

  it('should remove tag from array when removeTag is called', (done) => {
    vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"]
      }
    }).$mount()

    expect(vm.tags.length).to.equal(2);
    vm.removeTag("", 0);
    Vue.nextTick(() => {

      expect(vm.tags.length).to.equal(1);
      expect(vm.tags).includes("bar");
      expect(vm.tags).not.includes("foo");
      done();
    });


  });


  it('should add tag that is not duplicate and not editing', (done) => {
    vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"]
      }
    }).$mount()

    vm.field = "baz";
    vm.addTag();
    Vue.nextTick(() => {
      expect(vm.tags.length).to.equal(3);
      expect(vm.tags).includes("baz");
      done();
    });

  });

  it('should add duplicate tag if allowDuplicates is true', (done) => {
    vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"],
        allowDuplicates: true
      }
    }).$mount()

    expect(vm.tags.length).to.equal(2);

    vm.field = "bar";
    vm.addTag();

    Vue.nextTick(() => {
      expect(vm.tags.length).to.equal(3);
      done();
    });

  });

  it('should not add duplicate tag if allowDuplicates is false', (done) => {
    vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"],
        allowDuplicates: false
      }
    }).$mount()

    expect(vm.tags.length).to.equal(2);

    vm.field = "bar";
    vm.addTag();

    Vue.nextTick(() => {
      expect(vm.tags.length).to.equal(2);
      done();
    });

  });
  it('should not add blank tag', (done) => {
    vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"]
      }
    }).$mount()
    vm.field = "";
    vm.addTag();
    Vue.nextTick(() => {
      expect(vm.tags.length).to.equal(2);
      expect(vm.tags).not.includes("");
      done();
    })
  });

  it('should update tag if editing', (done) => {
    vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"]
      }
    }).$mount()

    vm.editing = {
      mode: true,
      original: 0
    }

    vm.field = "baz";
    vm.addTag();
    Vue.nextTick(() => {
      expect(vm.tags.length).to.equal(2);
      expect(vm.tags[0]).to.equal("baz");
      done();
    });
  });


  it('should update tag at correct index if editing and has duplicates', (done) => {
    vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar", "foo"],
        allowDuplicates: true
      }
    }).$mount()

    vm.editing = {
      mode: true,
      original: 2
    }

    vm.field = "baz";
    vm.addTag();
    Vue.nextTick(() => {
      expect(vm.tags.length).to.equal(3);
      expect(vm.tags[0]).to.equal("foo");
      expect(vm.tags[2]).to.equal("baz");
      done();
    });
  });


  it('should add non-blank tag when lost focus is called', (done) => {
    vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"]
      }
    }).$mount()

    vm.field = "baz";
    vm.lostFocus();
    Vue.nextTick(() => {
      expect(vm.tags.length).to.equal(3);
      expect(vm.tags[2]).to.equal("baz");
      done();
    });
  });

  it('should not add blank tag when lost focus is called', (done) => {
    vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"]
      }
    }).$mount()

    vm.field = "   ";
    vm.lostFocus();
    Vue.nextTick(() => {
      expect(vm.tags.length).to.equal(2);
      done();
    });
  });

});

describe('utils', () => {
  it('should add class to element', () => {
    var element = { className: "" };
    addClass(element, 'test-class');
    expect(element.className.trim()).to.equal("test-class");
  });

  it('should add class to element and not override existing classes', () => {
    var element = { className: "original-class" };
    addClass(element, 'test-class');
    expect(element.className.trim()).to.equal("original-class test-class");
  });


  it('should remove class from element', () => {
    var element = { className: "test-class" };
    removeClass(element, 'test-class');
    expect(element.className.trim()).to.equal("");
  });

  it('should remove class from element and not remove any existing', () => {
    var element = { className: "original-class test-class" };
    removeClass(element, 'test-class');
    expect(element.className.trim()).to.equal("original-class");
  });


  it('should remove all classes that match', () => {
    var element = { className: "test-class test-class" };
    removeClass(element, 'test-class');
    expect(element.className.trim()).to.equal("");
  });

  it('should remove all classes that match and not remove any existing', () => {
    var element = { className: "original-class test-class test-class" };
    removeClass(element, 'test-class');
    expect(element.className.trim()).to.equal("original-class");
  });

  it('should toggle class', () => {
    var element = { className: "test-class" };
    toggleClass(element, 'test-class');
    expect(element.className.trim()).to.equal("");
    toggleClass(element, 'test-class');
    expect(element.className.trim()).to.equal("test-class");
  });

});