<template>
  <div>
    <h4>Baza produktów</h4>
    <table class="centered blue-grey lighten-2">
        <thead>
          <tr>
              <th>Nazwa</th>
              <th>Opis</th>
              <th>Kategoria</th>
              <th>Cena</th>
              <th>Waga</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products_filtered" v-bind:key="product">
            <td>{{product.name}}</td>
            <td>{{product.description}}</td>
            <td>{{product.category.name}}</td>
            <td>{{product.price}}</td>
            <td>{{product.weight}}</td>
            <td><a class="btn-edit right"><i class="material-icons">edit</i></a></td>
          </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'underscore'

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      categories: [],
      products: [],
      products_filtered: []
    }
  },
  created() {
    this.getProducts();
    this.filter();
  },
  methods: {
      getProducts: function() {
        let self = this;
        axios
          .get(process.env.VUE_APP_BACKEND_URL + "/products")
          .then(function(response) {
            console.log(response.data);
            self.products = response.data;
            self.products_filtered = response.data;
          })
          .catch(function (error) {
            console.log(error);
        });
      },
     filter: function() {
          let self = this;
          this.emitter.on('search', (criteria) => {
          console.log(criteria);
          var products_to_display = [];
          if (criteria.category !== "Kategoria") {
              products_to_display = _.filter(this.products, function(prod){ 
                return prod.category.name == criteria.category});
          } else {
            products_to_display = this.products;
          }

          products_to_display = _.filter(products_to_display, function(prod){ 
              return prod.name.includes(criteria.input) });


            self.products_filtered = products_to_display;
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>
