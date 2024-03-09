import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('HomeScreen', () => {
  it('renders properly', () => {
    const wrapper = mount(Home)
    expect(wrapper.text()).toContain('universitario')
  })
})
