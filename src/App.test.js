import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import App from './App.vue'

const visibleRows = (wrapper) => wrapper.findAll('tbody tr')

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
    expect(visibleRows(wrapper)).toHaveLength(5)

    await search.setValue('software development')
    expect(wrapper.text()).toContain('COS20001')
    expect(wrapper.text()).toContain('COS20016')
    expect(wrapper.text()).not.toContain('ACC20014')
  })

  it('shows five units on the first page by default', () => {
    const wrapper = mount(App)

    expect(visibleRows(wrapper)).toHaveLength(5)
    expect(wrapper.text()).toContain('ICT10001')
    expect(wrapper.text()).toContain('COS20001')
    expect(wrapper.text()).not.toContain('TNE10005')
  })

  it('moves to the next page with pagination controls', async () => {
    const wrapper = mount(App)
    const pageTwoLink = wrapper
      .findAll('.page-link')
      .find((link) => link.text() === '2')

    await pageTwoLink.trigger('click')

    expect(visibleRows(wrapper)).toHaveLength(5)
    expect(wrapper.text()).toContain('TNE10005')
    expect(wrapper.text()).toContain('ACC10007')
    expect(wrapper.text()).not.toContain('ICT10001')
  })

  it('changes how many rows are shown per page', async () => {
    const wrapper = mount(App)

    await wrapper.get('select').setValue('10')

    expect(visibleRows(wrapper)).toHaveLength(10)
    expect(wrapper.text()).toContain('ACC10007')
    expect(wrapper.text()).not.toContain('INF30001')
  })

  it('can show all rows and returns to the first page when controls change', async () => {
    const wrapper = mount(App)
    const pageTwoLink = wrapper
      .findAll('.page-link')
      .find((link) => link.text() === '2')

    await pageTwoLink.trigger('click')
    expect(wrapper.text()).toContain('TNE10005')

    await wrapper.get('input[type="search"]').setValue('Core')
    expect(wrapper.text()).toContain('ICT10001')
    expect(wrapper.text()).not.toContain('TNE10005')

    await wrapper.get('select').setValue('all')
    expect(visibleRows(wrapper)).toHaveLength(4)
  })

  it('shows a helpful message when no units match the search', async () => {
    const wrapper = mount(App)

    await wrapper.get('input[type="search"]').setValue('not-a-real-unit')

    expect(visibleRows(wrapper)).toHaveLength(0)
    expect(wrapper.text()).toContain('No units match your search.')
  })
})
