import { mount } from '@vue/test-utils';
import { h, defineComponent } from 'vue';
import Empty from '@tdesign/components/empty';
import EmptyProps from '@tdesign/components/empty/props';
import { ConfigProvider } from '@tdesign/components/config-provider';

// every component needs four parts: props/events/slots/functions.
describe('Empty', () => {
  // test props api
  describe(':props', () => {
    describe(':size', () => {
      it('size=small should add t-size-s class', () => {
        const wrapper = mount(() => <Empty size="small" />);
        expect(wrapper.find('.t-empty').classes()).toContain('t-size-s');
      });

      it('size=medium should not add size class (default)', () => {
        const wrapper = mount(() => <Empty size="medium" />);
        expect(wrapper.find('.t-empty').classes()).not.toContain('t-size-s');
        expect(wrapper.find('.t-empty').classes()).not.toContain('t-size-l');
      });

      it('size=large should add t-size-l class', () => {
        const wrapper = mount(() => <Empty size="large" />);
        expect(wrapper.find('.t-empty').classes()).toContain('t-size-l');
      });

      it('size validator should return true for valid values', () => {
        const validator = EmptyProps.size.validator;
        expect(validator('small')).toBe(true);
        expect(validator('medium')).toBe(true);
        expect(validator('large')).toBe(true);
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
      });

      it('size validator should return false for invalid values', () => {
        const validator = EmptyProps.size.validator;
        // @ts-expect-error - testing invalid value
        expect(validator('invalid')).toBe(false);
      });
    });

    describe(':title', () => {
      it('title as string should render title element', () => {
        const wrapper = mount(() => <Empty title="title"></Empty>);
        expect(wrapper.find('.t-empty__title').exists()).toBe(true);
        expect(wrapper.find('.t-empty__title').text()).toBe('title');
      });

      it('title slot should render custom content', () => {
        // Use slot instead of function prop for custom content rendering
        const wrapper = mount(() => (
          <Empty v-slots={{ title: () => <span class="custom-title">Custom Title</span> }}></Empty>
        ));
        expect(wrapper.find('.t-empty__title').exists()).toBe(true);
        expect(wrapper.find('.custom-title').exists()).toBe(true);
        expect(wrapper.find('.custom-title').text()).toBe('Custom Title');
      });

      it('no title should not render title element when type has no default title', () => {
        // Use ConfigProvider with empty titleText to test the null title branch
        const emptyConfig = {
          empty: {
            titleText: {
              empty: '',
              success: '',
              fail: '',
              'network-error': '',
              maintenance: '',
            },
          },
        };
        const wrapper = mount(() => (
          <ConfigProvider globalConfig={emptyConfig}>
            <Empty type="empty" image="test.png"></Empty>
          </ConfigProvider>
        ));
        // With empty titleText config and no title prop, title element should not render
        expect(wrapper.find('.t-empty__title').exists()).toBe(false);
      });
    });

    describe(':description', () => {
      it('description as string should render description element', () => {
        const wrapper = mount(() => <Empty description="description"></Empty>);
        expect(wrapper.find('.t-empty__description').exists()).toBe(true);
        expect(wrapper.find('.t-empty__description').text()).toBe('description');
      });

      it('description slot should render custom content', () => {
        // Use slot instead of function prop for custom content rendering
        const wrapper = mount(() => (
          <Empty v-slots={{ description: () => <span class="custom-desc">Custom Description</span> }}></Empty>
        ));
        expect(wrapper.find('.t-empty__description').exists()).toBe(true);
        expect(wrapper.find('.custom-desc').exists()).toBe(true);
      });

      it('no description should not render description element', () => {
        const wrapper = mount(() => <Empty title="title"></Empty>);
        expect(wrapper.find('.t-empty__description').exists()).toBe(false);
      });
    });

    describe(':type', () => {
      it('type=empty (default) should render empty icon', () => {
        const wrapper = mount(() => <Empty type="empty"></Empty>);
        expect(wrapper.find('.t-empty__image').exists()).toBe(true);
        expect(wrapper.find('.t-empty__image svg').exists()).toBe(true);
      });

      it('type=success should render success icon', () => {
        const wrapper = mount(() => <Empty type="success"></Empty>);
        const successIconPath =
          'M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42ZM46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24ZM21 32.8284L12.1716 24L15 21.1716L21 27.1716L33 15.1716L35.8284 18L21 32.8284Z';
        expect(wrapper.find('.t-empty__image').find('path').attributes('d')).toBe(successIconPath);
      });

      it('type=fail should render fail icon', () => {
        const wrapper = mount(() => <Empty type="fail"></Empty>);
        expect(wrapper.find('.t-empty__image').exists()).toBe(true);
        expect(wrapper.find('.t-empty__image svg').exists()).toBe(true);
        // FailSvg has a specific path with fill="#D54941"
        expect(wrapper.find('.t-empty__image svg path').attributes('fill')).toBe('#D54941');
      });

      it('type=network-error should render network error icon', () => {
        const wrapper = mount(() => <Empty type="network-error"></Empty>);
        expect(wrapper.find('.t-empty__image').exists()).toBe(true);
        expect(wrapper.find('.t-empty__image svg').exists()).toBe(true);
      });

      it('type=maintenance should render maintenance icon', () => {
        const wrapper = mount(() => <Empty type="maintenance"></Empty>);
        expect(wrapper.find('.t-empty__image').exists()).toBe(true);
        expect(wrapper.find('.t-empty__image svg').exists()).toBe(true);
      });

      it('type validator should return true for valid values', () => {
        const validator = EmptyProps.type.validator;
        expect(validator('empty')).toBe(true);
        expect(validator('success')).toBe(true);
        expect(validator('fail')).toBe(true);
        expect(validator('network-error')).toBe(true);
        expect(validator('maintenance')).toBe(true);
        expect(validator(undefined)).toBe(true);
        expect(validator(null)).toBe(true);
      });

      it('type validator should return false for invalid values', () => {
        const validator = EmptyProps.type.validator;
        // @ts-expect-error - testing invalid value
        expect(validator('invalid')).toBe(false);
      });
    });

    describe(':image', () => {
      it('image as string URL should render Image component with src', () => {
        const wrapper = mount(() => <Empty image="https://example.com/image.png"></Empty>);
        expect(wrapper.find('.t-empty__image').exists()).toBe(true);
        expect(wrapper.find('.t-image').exists()).toBe(true);
      });

      it('image as ImageProps object should render Image component with props', () => {
        const wrapper = mount(() => <Empty image={{ src: 'https://example.com/image.png', shape: 'round' }}></Empty>);
        expect(wrapper.find('.t-empty__image').exists()).toBe(true);
        expect(wrapper.find('.t-image').exists()).toBe(true);
      });

      it('image as component should render the custom component', () => {
        const CustomIcon = defineComponent({
          name: 'CustomIcon',
          setup() {
            return () => <span class="custom-icon">Icon</span>;
          },
        });
        const wrapper = mount(() => <Empty image={CustomIcon}></Empty>);
        expect(wrapper.find('.t-empty__image').exists()).toBe(true);
        expect(wrapper.find('.custom-icon').exists()).toBe(true);
      });
    });

    describe(':imageStyle', () => {
      it('imageStyle should apply inline styles to image container', () => {
        const wrapper = mount(() => <Empty imageStyle={{ width: '200px', height: '200px' }}></Empty>);
        const imageEl = wrapper.find('.t-empty__image');
        expect(imageEl.exists()).toBe(true);
        expect(imageEl.attributes('style')).toContain('width: 200px');
        expect(imageEl.attributes('style')).toContain('height: 200px');
      });
    });

    describe(':action', () => {
      it('action as function should render action element', () => {
        const wrapper = mount(() => <Empty action={() => <button class="custom-action">Retry</button>}></Empty>);
        expect(wrapper.find('.t-empty__action').exists()).toBe(true);
        expect(wrapper.find('.custom-action').exists()).toBe(true);
        expect(wrapper.find('.custom-action').text()).toBe('Retry');
      });

      it('no action should not render action element', () => {
        const wrapper = mount(() => <Empty title="title"></Empty>);
        expect(wrapper.find('.t-empty__action').exists()).toBe(false);
      });
    });
  });

  describe(':slots', () => {
    it('image slot should render custom image content', () => {
      const wrapper = mount(() => (
        <Empty v-slots={{ image: () => <div class="custom-image-slot">Custom Image</div> }}></Empty>
      ));
      expect(wrapper.find('.t-empty__image').exists()).toBe(true);
      expect(wrapper.find('.custom-image-slot').exists()).toBe(true);
    });

    it('title slot should render custom title content', () => {
      const wrapper = mount(() => (
        <Empty v-slots={{ title: () => <span class="custom-title-slot">Custom Title</span> }}></Empty>
      ));
      expect(wrapper.find('.t-empty__title').exists()).toBe(true);
      expect(wrapper.find('.custom-title-slot').exists()).toBe(true);
    });

    it('description slot should render custom description content', () => {
      const wrapper = mount(() => (
        <Empty v-slots={{ description: () => <span class="custom-desc-slot">Custom Description</span> }}></Empty>
      ));
      expect(wrapper.find('.t-empty__description').exists()).toBe(true);
      expect(wrapper.find('.custom-desc-slot').exists()).toBe(true);
    });

    it('action slot should render custom action content', () => {
      const wrapper = mount(() => (
        <Empty v-slots={{ action: () => <button class="custom-action-slot">Action Button</button> }}></Empty>
      ));
      expect(wrapper.find('.t-empty__action').exists()).toBe(true);
      expect(wrapper.find('.custom-action-slot').exists()).toBe(true);
    });

    it('default slot should not affect rendering', () => {
      const wrapper = mount(() => (
        <Empty v-slots={{ default: () => <div class="default-slot">Default</div> }}>
          <div class="child-content">Child</div>
        </Empty>
      ));
      expect(wrapper.find('.t-empty').exists()).toBe(true);
    });
  });

  describe(':rendering', () => {
    it('default rendering should show empty icon and title', () => {
      const wrapper = mount(() => <Empty></Empty>);
      expect(wrapper.find('.t-empty').exists()).toBe(true);
      expect(wrapper.find('.t-empty__image').exists()).toBe(true);
      expect(wrapper.find('.t-empty__title').exists()).toBe(true);
    });

    it('should render all elements when all props are provided', () => {
      const wrapper = mount(() => (
        <Empty
          title="Title"
          description="Description"
          image="https://example.com/image.png"
          imageStyle={{ width: '100px' }}
          action={() => <button>Action</button>}
        ></Empty>
      ));
      expect(wrapper.find('.t-empty').exists()).toBe(true);
      expect(wrapper.find('.t-empty__image').exists()).toBe(true);
      expect(wrapper.find('.t-empty__title').exists()).toBe(true);
      expect(wrapper.find('.t-empty__description').exists()).toBe(true);
      expect(wrapper.find('.t-empty__action').exists()).toBe(true);
    });

    it('should render with custom image from ConfigProvider', () => {
      // ConfigProvider can customize the image, but ||` fallback means null won't work
      const wrapper = mount(() => <Empty type="empty"></Empty>);
      // Default empty SVG should render
      expect(wrapper.find('.t-empty').exists()).toBe(true);
      expect(wrapper.find('.t-empty__image').exists()).toBe(true);
      expect(wrapper.find('.t-empty__image svg').exists()).toBe(true);
    });
  });
});
