import { describe, expect, it } from 'vitest'

import { shallowMount, config } from '@vue/test-utils'
import { vuetify } from '../../src/main'
import HomeView from '../../src/views/HomeView.vue'

config.global.plugins = [vuetify]

describe('HomeView', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(HomeView)
    expect(wrapper.text()).toContain(
      'Institución comprometida con los estudiantes universitarios'
    )
  })
})
