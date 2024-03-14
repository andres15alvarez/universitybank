import { describe, expect, it } from 'vitest'

import { shallowMount, config } from '@vue/test-utils'
import { vuetify } from '../../src/main'
import AboutUsView from '../../src/views/AboutUsView.vue'

config.global.plugins = [vuetify]

describe('AboutUsView', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(AboutUsView)
    expect(wrapper.text()).toContain(
      'Sobre nosotros'
    )
  })
})
