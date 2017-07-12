import Vue from 'vue'
import TagPicker from '@/components/TagPicker'
import {
  CommaKey, TabKey, DeleteKey, SpaceKey, EnterKey
} from '@/utils/constants';
describe('TagPicker.vue', () => {

  beforeEach(() => {

  });
  it('should render basic contents', () => {
    let Constructor = Vue.extend(TagPicker)
    const vm = new Constructor().$mount()
    console.log()
    expect(vm.$el.classList.contains('tagpicker'))
      .to.equal(true)
  })

  it('should have the correct default data', () => {
    let Constructor = Vue.extend(TagPicker)
    const vm = new Constructor().$mount()

    expect(vm.allowDuplicates).to.equal(false)
    expect(vm.addOnKeys).to.be.an('array');
    expect(vm.removeOnKeys).to.be.an('array');
    expect(vm.tagsList).to.be.an('array');
    expect(vm.editing.mode).to.equal(false);
  })

  it('should seperate if string is passed in as tagsList', () => {
    let Constructor = Vue.extend(TagPicker)
    const vm = new Constructor({
      propsData: {
        tagsList: "foo|bar"
      }
    }).$mount()

    expect(vm.tagsList).to.equal("foo|bar")
    expect(vm.tags).to.be.an("array").that.includes("bar");
  })

  it('should seperate with custom seperator if tagsList is a string and has a different seperator', () => {
    let Constructor = Vue.extend(TagPicker)
    const vm = new Constructor({
      propsData: {
        tagsList: "foo~bar",
        seperator: "~"
      }
    }).$mount()

    expect(vm.tagsList).to.equal("foo~bar")
    expect(vm.tags).to.be.an("array").that.includes("bar");
  })

  it('should just use the array if tagsList is an array', () => {
    let Constructor = Vue.extend(TagPicker)
    const vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"]
      }
    }).$mount()

    expect(vm.tags).to.be.an("array").that.includes("bar");
    expect(vm.tags).to.be.an("array").that.includes("foo");
    expect(vm.tags.length).to.equal(2);
  });

  it('should remove tag from array when removeTag is called', () => {
    let Constructor = Vue.extend(TagPicker)
    const vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"]
      }
    }).$mount()

    expect(vm.tags.length).to.equal(2);
    vm.removeTag("", 0);
    expect(vm.tags.length).to.equal(1);
    expect(vm.tags).includes("bar")
  });

  
  xit('should add tag that is not duplicate and not editing', () => {
    let Constructor = Vue.extend(TagPicker)
    const vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"]
      }
    }).$mount()

    expect(vm.tags.length).to.equal(2);
    vm.field = "baz";
    vm.addTag();
    expect(vm.tags.length).to.equal(3);

  });

   xit('should not add duplicate tag if allowDuplicates is true', () => {
   });
   xit('should not add blank tag', () => {
   });

   xit('should update tag if editing', () => {
   });

})
