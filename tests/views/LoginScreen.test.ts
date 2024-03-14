import { describe, expect, it } from 'vitest'

import { shallowMount, config } from '@vue/test-utils'
import { vuetify } from '../../src/main'
import LoginScreen from '../../src/views/LoginScreen.vue'

config.global.plugins = [vuetify]

describe('LoginScreen', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(LoginScreen)
    expect(wrapper.text()).toContain(
      'Bienvenido'
    )
  })
})
