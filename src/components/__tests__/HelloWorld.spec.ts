import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import HomeScreen from '../HomeScreen.vue'

describe('HomeScreen', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeScreen)
    expect(wrapper.text()).toContain('universitario')
  })
})
