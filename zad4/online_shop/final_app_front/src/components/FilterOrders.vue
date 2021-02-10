<template>
  <div>
    <div class="row">
      <div class="col s9">
      <select id="select" class="browser-default">
        <option v-bind:value="criteria.status" selected>Status</option>
        <option v-for="stat in status" v-bind:key="stat" v-bind:value="criteria.status">
          {{stat.name}}
        </option>
      </select>
      </div>
      <div class="col s3">
            <button class="btn waves-effect waves-light btn-filtr right" 
                  type="submit" name="action" @click="emitSearchOrders">Filtruj
            <i class="material-icons right">send</i>
          </button> 
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
        status: 'Status'
      },
      status: []
    }
  },
  created() {
    this.getStatus();
  },
  methods: {
      getStatus: function() {
        let self = this;
        axios
          .get(process.env.VUE_APP_BACKEND_URL + "/status")
          .then(function(response) {
            console.log(response.data);
            self.status = response.data;
          })
          .catch(function (error) {
            console.log(error);
        });
      },
      emitSearchOrders: function () {
          var e = document.getElementById("select");
          this.criteria.category = e.options[e.selectedIndex].text;
          this.emitter.emit('searchOrders', this.criteria);
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
  margin-top: 5px;
  margin-right: 60px;
}
</style>
