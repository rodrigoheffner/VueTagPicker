import Vue from 'vue'
import TagPicker from '@/components/TagPicker'
import {
  CommaKey, TabKey, DeleteKey, SpaceKey, EnterKey
} from '@/utils/constants';
describe('TagPicker.vue', () => {
  let Constructor;
  beforeEach(() => {
    Constructor = Vue.extend(TagPicker)
  });
  it('should render basic contents', () => {

    const vm = new Constructor().$mount()
    console.log()
    expect(vm.$el.classList.contains('tagpicker'))
      .to.equal(true)
  })

  it('should have the correct default data', () => {
    const vm = new Constructor().$mount()

    expect(vm.allowDuplicates).to.equal(false)
    expect(vm.addOnKeys).to.be.an('array');
    expect(vm.removeOnKeys).to.be.an('array');
    expect(vm.tagsList).to.be.an('array');
    expect(vm.editing.mode).to.equal(false);
  })

  it('should seperate if string is passed in as tagsList', () => {
    const vm = new Constructor({
      propsData: {
        tagsList: "foo|bar"
      }
    }).$mount()

    expect(vm.tagsList).to.equal("foo|bar")
    expect(vm.tags).to.be.an("array").that.includes("bar");
  })

  it('should seperate with custom seperator if tagsList is a string and has a different seperator', () => {
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
    const vm = new Constructor({
      propsData: {
        tagsList: ["foo", "bar"]
      }
    }).$mount()

    expect(vm.tags).to.be.an("array").that.includes("bar");
    expect(vm.tags).to.be.an("array").that.includes("foo");
    expect(vm.tags.length).to.equal(2);
  })
})
