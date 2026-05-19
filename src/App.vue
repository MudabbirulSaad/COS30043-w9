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
          <tr v-for="unit in filteredUnits" :key="unit.code">
            <td class="fw-semibold">{{ unit.code }}</td>
            <td>{{ unit.desc }}</td>
            <td>{{ unit.cp }}</td>
            <td>{{ unit.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import units from '../units.json'

const searchTerm = ref('')

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
</script>
