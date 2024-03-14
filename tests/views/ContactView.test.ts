import { describe, expect, it } from 'vitest'

import { shallowMount, config } from '@vue/test-utils'
import { vuetify } from '../../src/main'
import ContactView from '../../src/views/ContactView.vue'

config.global.plugins = [vuetify]

describe('ContactView', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(ContactView)
    expect(wrapper.text()).toContain(
      'Contáctanos'
    )
  })
})
