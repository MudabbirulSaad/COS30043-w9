<template>
  <main class="container py-4">
    <h1 class="mb-3">Lab 09 Pagination</h1>

    <div class="mb-3">
      <label for="unit-search" class="form-label">Search units</label>
      <input
        id="unit-search"
        v-model="searchTerm"
        type="search"
        class="form-control"
        placeholder="Search by code, description, credit points, or type"
      >
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle">
        <thead class="table-dark">
          <tr>
            <th scope="col">Unit Code</th>
            <th scope="col">Description</th>
            <th scope="col">Credit Points</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="unit in paginatedUnits" :key="unit.code">
            <td class="fw-semibold">{{ unit.code }}</td>
            <td>{{ unit.desc }}</td>
            <td>{{ unit.cp }}</td>
            <td>{{ unit.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <Paginate
      v-if="pageCount > 1"
      v-model="currentPage"
      :page-count="pageCount"
      :click-handler="changePage"
      :prev-text="'Previous'"
      :next-text="'Next'"
      :container-class="'pagination justify-content-center'"
      :page-class="'page-item'"
      :page-link-class="'page-link'"
      :prev-class="'page-item'"
      :prev-link-class="'page-link'"
      :next-class="'page-item'"
      :next-link-class="'page-link'"
      :active-class="'active'"
    />
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import Paginate from 'vuejs-paginate-next'
import units from '../units.json'

const searchTerm = ref('')
const currentPage = ref(1)
const rowsPerPage = 5

const filteredUnits = computed(() => {
  const query = searchTerm.value.trim().toLowerCase()

  if (!query) {
    return units
  }

  return units.filter((unit) => {
    return [unit.code, unit.desc, unit.cp, unit.type].some((value) =>
      value.toLowerCase().includes(query)
    )
  })
})

const paginatedUnits = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage
  const end = start + rowsPerPage

  return filteredUnits.value.slice(start, end)
})

const pageCount = computed(() => Math.ceil(filteredUnits.value.length / rowsPerPage))

function changePage(page) {
  currentPage.value = page
}
</script>
