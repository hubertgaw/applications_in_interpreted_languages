<template>
  <div class="main">
    <div class="row">
      <div class="col s6">
        <input v-model="criteria.input" type="text" placeholder="Wprowadź nazwę produktu">
      </div>
      <div class="col s6">
      <select id="select" class="browser-default">
        <option v-bind:value="criteria.category" selected>Kategoria</option>
        <option v-for="category in categories" v-bind:key="category" v-bind:value="criteria.category">
          {{category.name}}
        </option>
      </select>
      <div class="row">
        <div class="col s12">
            <button class="btn waves-effect waves-light btn-filtr right" 
                  type="submit" name="action" @click="emitSearch">Filtruj
            <i class="material-icons right">send</i>
          </button> 
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data: function() {
    return {
      criteria: {
        input: '',
        category: 'Kategoria'
      },
      categories: []
    }
  },
  created() {
    this.getCategories();
  },
  methods: {
      getCategories: function() {
        let self = this;
        axios
          .get(process.env.VUE_APP_BACKEND_URL + "/categories")
          .then(function(response) {
            console.log(response.data);
            self.categories = response.data;
          })
          .catch(function (error) {
            console.log(error);
        });
      },
      emitSearch: function () {
          var e = document.getElementById("select");
          this.criteria.category = e.options[e.selectedIndex].text;
          this.emitter.emit('search', this.criteria);
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.main {
    margin-top: 30px;
}
.btn-filtr {
  margin-top: 20px;
  margin-right: 60px;
}
</style>
