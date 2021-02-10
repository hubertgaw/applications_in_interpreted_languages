<template>
  <body>
    <div class="container">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
      <Filter />
      <Table />
      <hr>
      <FilterOrders />
      <OrdersTable />
    </div>
  </body>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Filter from './components/Filter.vue'
import Table from './components/Table.vue'
import OrdersTable from './components/OrdersTable.vue'
import FilterOrders from './components/FilterOrders.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Filter,
    Table,
    FilterOrders,
    OrdersTable
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
}

body {
  background-color: whitesmoke ;
}
hr {
  margin-top: 35px;
}
</style>
