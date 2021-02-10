<template>
      <div class="container">
        <table class="table table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th scope='col'>Title</th>
                    <th scope='col'>Production year</th>
                    <th scope='col'>Cast</th>
                    <th scope='col'>Genres</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="movie in movies.slice(0, displayIndex)" v-bind:key="movie.title">
                    <th scope='row'>{{movie.title}}</th>
                    <td>{{movie.year}}</td>
                    <td>{{movie.cast.join(', ')}}</td>
                    <td>{{movie.genres.join(', ')}}</td>
                </tr>
            </tbody>
        </table>
        <div class="btn_container mb-sm-2 row">
          <div class="buttons col-sm-6 md-sm-2 mb-sm-2">
              <input v-on:click="decrement()"  type="button" value="Show less"
              class="btn btn-outline-primary md-sm"/>
          </div>
          <div class="buttons col-sm-6 md-sm-2 mb-sm-2">
              <input v-on:click="increment()" type="button" value="Show more" 
              class="btn btn-outline-primary md-sm"/>
          </div>
        </div>
      </div>
</template>

<script>
import Movies from '../assets/movies.json';
//import _ from 'underscore';


export default {
  name: 'Table',
  data: 
    function() {
      return {
          movies: Movies,
          displayIndex: 10
      }
  },
  created: function() {
    //console.log("po przefiltrowaniu")
    this.emitter.on('filtered_films', (filtered_films)=>{
      this.movies = filtered_films;
    })
   // console.log("po przefiltrowaniu wielkosc: " + _.size(this.movies));
  },
  mounted: function() {
    //console.log("wysylamy do przefiltrowania")
    this.emitter.emit('emitted_table', this.movies)
    this.emitter.emit('table_to_filter_by_genre',this.movies)
  
  },
  methods: {
    increment: function() {
      if (this.displayIndex < Movies.length) {
        this.displayIndex += 10
      }
    },
    decrement: function() {
      if (this.displayIndex > 10) {
        this.displayIndex -= 10
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}
.btn_container {
  width: 100%;
}
.buttons {
  width: 100px;
  height: 50px;
}

</style>
