<template>
  <Search />
  <Table />
  <FilteredByGenre />
  <FilteredByCast />
</template>

<script>
import Search from './components/Search.vue'
import Table from './components/Table.vue'
import FilteredByGenre from './components/FilteredByGenre.vue'
import FilteredByCast from './components/FilteredByCast.vue'

export default {
  name: 'App',
  components: {
    Search,
    Table,
    FilteredByGenre,
    FilteredByCast
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
