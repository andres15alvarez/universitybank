import { describe, expect, it } from 'vitest'

import { shallowMount, config } from '@vue/test-utils'
import { vuetify } from '../../src/main'
import LoginView from '../../src/views/LoginView.vue'

config.global.plugins = [vuetify]

describe('LoginView', () => {
  it('renders properly', () => {
    const wrapper = shallowMount(LoginView)
    expect(wrapper.text()).toContain(
      'Bienvenido'
    )
  })
})
