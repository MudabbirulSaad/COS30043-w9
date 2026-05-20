<template>
  <main class="container py-4">
    <div class="mb-4">
      <h1 class="mb-1">Lab 09 Pagination</h1>
      <p class="text-secondary mb-0">
        Browse, search, and paginate Swinburne units.
      </p>
    </div>

    <div class="row g-3 align-items-end mb-3">
      <div class="col-12 col-md-8">
        <label for="unit-search" class="form-label">Search units</label>
        <input
          id="unit-search"
          v-model="searchTerm"
          type="search"
          class="form-control"
          placeholder="Search by code, description, credit points, or type"
        >
      </div>
      <div class="col-12 col-md-4">
        <label for="rows-per-page" class="form-label">Rows per page</label>
        <select id="rows-per-page" v-model="rowsPerPage" class="form-select">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option value="all">All</option>
        </select>
      </div>
    </div>

    <p class="small text-secondary mb-2">
      Showing {{ paginatedUnits.length }} of {{ filteredUnits.length }} matching units
    </p>

    <div class="table-responsive">
      <table class="table table-striped table-hover align-middle mb-0">
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

    <p v-if="filteredUnits.length === 0" class="alert alert-info mt-3 mb-0">
      No units match your search.
    </p>

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
      class="mt-3"
    />
  </main>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import Paginate from 'vuejs-paginate-next'
import units from '../units.json'

const searchTerm = ref('')
const currentPage = ref(1)
const rowsPerPage = ref(5)

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
  if (rowsPerPage.value === 'all') {
    return filteredUnits.value
  }

  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + rowsPerPage.value

  return filteredUnits.value.slice(start, end)
})

const pageCount = computed(() => {
  if (rowsPerPage.value === 'all') {
    return 1
  }

  return Math.ceil(filteredUnits.value.length / rowsPerPage.value)
})

function changePage(page) {
  currentPage.value = page
}

watch([searchTerm, rowsPerPage], () => {
  currentPage.value = 1
})
</script>
