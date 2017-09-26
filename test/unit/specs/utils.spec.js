import { CommaKey, TabKey, DeleteKey, SpaceKey, EnterKey } from '@/utils/constants';
import { addClass, removeClass, toggleClass } from '@/utils/dom';

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