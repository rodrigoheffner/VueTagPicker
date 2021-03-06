import Vue from 'vue/dist/vue.js'
import TagPicker from '@/components/TagPicker'
import { CommaKey, TabKey, DeleteKey, SpaceKey, EnterKey, TagColor, TagTextColor, BorderColor } from '@/utils/constants';
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


  it('should add tag if fieldUpdate keyCode is in addOnKeys', (done) => {
    vm = new Constructor({
      propsData: {
        tagsList: []
      }
    }).$mount()

    vm.field = "foo";
    vm.fieldUpdate({ keyCode: EnterKey });
    Vue.nextTick(() => {
      expect(vm.tags.length).to.equal(1);
      expect(vm.tags).includes("foo")
      done();
    });
  });


  it('should not remove tag if fieldUpdate keyCode is in removeOnKeys but field contents', (done) => {
    vm = new Constructor({
      propsData: {
        tagsList: ["foo"]
      }
    }).$mount()

    vm.field = "bar";

    vm.fieldUpdate({ keyCode: DeleteKey });

    Vue.nextTick(() => {
      expect(vm.tags.length).to.equal(1);
      expect(vm.tags).not.includes("bar");
      done();
    });
  });

  it('should remove tag if fieldUpdate keyCode is in removeOnKeys and no field contents', (done) => {
    vm = new Constructor({
      propsData: {
        tagsList: ["foo"]
      }
    }).$mount()

    vm.field = "";

    vm.fieldUpdate({ keyCode: DeleteKey });

    Vue.nextTick(() => {
      expect(vm.tags.length).to.equal(0);
      expect(vm.tags).not.includes("foo");
      done();
    });
  });

  it('should return true if key is not an addOnKey or a removeKey', (done) => {
    vm = new Constructor({
      propsData: {
        tagsList: ["foo"]
      }
    }).$mount()
    //z keycode = 90;
    const ZKey = 90;

    vm.field = "ba";

    let result = vm.fieldUpdate({ keyCode: ZKey });

    Vue.nextTick(() => {
      expect(vm.tags.length).to.equal(1);
      expect(vm.tags).not.includes("baz");
      expect(result).to.equal(true)
      done();
    });
  });

  it('should setEdit for an index when called', (done) => {
    vm = new Constructor({
      propsData: {
        editing: {
          mode: false,
          original: 0
        }
      }
    }).$mount()

    vm.setEdit(3);
    Vue.nextTick(() => {
      expect(vm.editing.mode).to.equal(true);
      expect(vm.editing.original).to.equal(3);
      done();
    });
  });

  it('should render tag elements for array', function (done) {
    let $el;
    vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"]
      }
    }).$mount();
    $el = vm.$el;

    Vue.nextTick(() => {
      expect($el.querySelectorAll('.tagger-tag').length).to.equal(2)
      expect($el.querySelectorAll('.tagger-tag')[0].textContent).to.contain('foo')
      expect($el.querySelectorAll('.tagger-tag')[1].textContent).to.contain('bar')
      done();
    })
  });

  it('should apply default styles to tag', function (done) {
    let $el;
    vm = new Constructor({
      propsData: {
        tagsList: ["foo"]
      }
    }).$mount();
    $el = vm.$el;

    Vue.nextTick(() => {
      expect($el.querySelectorAll('.tagger-tag')[0].style.color).to.equal(TagTextColor)
      expect($el.querySelectorAll('.tagger-tag')[0].style.backgroundColor).to.equal(TagColor)
      expect($el.querySelectorAll('.tagger-main')[0].style.borderColor).to.equal(BorderColor)
      done();
    })
  });

  it('should apply passed in styles to tag', function (done) {
    let $el;
    vm = new Constructor({
      propsData: {
        tagsList: ["foo"],
        tagColor: 'rgb(100,100,100)',
        tagTextColor: 'rgb(25,25,25)',
        borderColor: 'rgb(0, 0, 0)'
      }
    }).$mount();
    $el = vm.$el;

    Vue.nextTick(() => {

      expect($el.querySelectorAll('.tagger-tag')[0].style.color).to.equal('rgb(25, 25, 25)')
      expect($el.querySelectorAll('.tagger-tag')[0].style.backgroundColor).to.equal('rgb(100, 100, 100)')
      expect($el.querySelectorAll('.tagger-main')[0].style.borderColor).to.equal('rgb(0, 0, 0)')
      done();
    })
  });
});