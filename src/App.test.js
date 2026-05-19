import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from './App.vue'

describe('App', () => {
  it('renders the lab title', () => {
    const wrapper = mount(App)

    expect(wrapper.text()).toContain('Lab 09 Pagination')
  })

  it('displays units from the JSON file in a table', () => {
    const wrapper = mount(App)

    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.text()).toContain('Unit Code')
    expect(wrapper.text()).toContain('Description')
    expect(wrapper.text()).toContain('Credit Points')
    expect(wrapper.text()).toContain('Type')
    expect(wrapper.text()).toContain('ICT10001')
    expect(wrapper.text()).toContain('Problem Solving with ICT')
    expect(wrapper.text()).toContain('INF30001')
    expect(wrapper.text()).toContain('Systems Acquisition & Implementation Management')
  })

  it('filters units by unit code', async () => {
    const wrapper = mount(App)

    await wrapper.get('input[type="search"]').setValue('ICT10001')

    expect(wrapper.text()).toContain('ICT10001')
    expect(wrapper.text()).not.toContain('COS10005')
  })

  it('filters units by description, credit points, and type', async () => {
    const wrapper = mount(App)
    const search = wrapper.get('input[type="search"]')

    await search.setValue('database')
    expect(wrapper.text()).toContain('INF10002')
    expect(wrapper.text()).not.toContain('ICT10001')

    await search.setValue('12.5')
    expect(wrapper.text()).toContain('ICT10001')
    expect(wrapper.text()).toContain('INF30001')

    await search.setValue('software development')
    expect(wrapper.text()).toContain('COS20001')
    expect(wrapper.text()).toContain('COS20016')
    expect(wrapper.text()).not.toContain('ACC20014')
  })
})
