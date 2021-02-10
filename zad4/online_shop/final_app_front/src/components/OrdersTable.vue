<template>
  <div class="orders">
    <h4>Baza zamówień</h4>
    <table class="centered blue-grey lighten-4">
        <thead>
          <tr>
              <th>Data zatwierdzenia</th>
              <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" v-bind:key="order">
            <td>{{order.approval_date}}</td>
            <td>{{order.status}}</td>
            <td><a class="btn-edit right"><i class="material-icons">edit</i></a></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
// import _ from 'underscore'

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      categories: [],
      orders: [],
    //   products_filtered: []
    }
  },
  created() {
    this.getOrders();
    // this.filter();
  },
  methods: {
      getOrders: function() {
        let self = this;
        axios
          .get(process.env.VUE_APP_BACKEND_URL + "/orders")
          .then(function(response) {
            console.log(response.data);
            self.orders = response.data;
            // self.products_filtered = response.data;
          })
          .catch(function (error) {
            console.log(error);
        });
      },
    //  filter: function() {
    //       let self = this;
    //       this.emitter.on('search', (criteria) => {
    //       console.log(criteria);
    //         var products_to_display = _.filter(this.products, function(prod){ 
    //           return prod.category.name == criteria.category});

    //         products_to_display = _.filter(products_to_display, function(prod){ 
    //           return prod.name.includes(criteria.input) });

    //         console.log(products_to_display);
    //         self.products_filtered = products_to_display;
    //     });
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.orders {
    margin-top: 60px;
}
</style>
