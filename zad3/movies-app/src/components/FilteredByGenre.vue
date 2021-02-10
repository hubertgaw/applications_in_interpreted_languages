<template>
  <div class="container" id="genres_container">
      <h3>Movies sorted by genres</h3>
    <ul class="list-group" id="list_by_genres">
      <li class="list-group-item-primary" v-for="genre in genres_table" v-bind:key="genre">
        {{ genre }}
        <ul class="list-group" id="movies_list">
            <li class="list-group-item" v-for="movie in films_in_genres(genre)" v-bind:key="movie.title">
                {{movie.title}}
            </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
//import Movies from '../assets/movies.json'
import _ from "underscore";

export default {
  name: "FilteredByGenre",
  data: function () {
    return {
      received_data: {},
      received_data_table: [],
      genres_table: [],
      films_to_display:[],
    };
  },
  created: function () {
    this.emitter.on("table_to_filter_by_genre", (data) => {
      //console.log("event in Genre component received");
      this.received_data = data;
      this.received_data_table = this.received_data;
      //console.log("Data size:" + _.size(data));
      //console.log("Data received size:" + _.size(this.received_data));
      //console.log("Data table size:" + _.size(this.received_data_table));
      this.find_genres();
      this.films_to_display = _.sample(this.received_data_table, 100)
    });
  },

  methods: {
    find_genres: function () {
      this.genres_table = [];
        //console.log("Data table size in funvtion:" + _.size(this.received_data_table))
      _.forEach(this.received_data_table, (movie) => {
        _.forEach(movie.genres, (genre_name) => {
          this.genres_table.push(genre_name);
        });
      });
      this.genres_table = _.uniq(this.genres_table);
      //console.log("genres table size:" + _.size(this.genres_table))
    },
    films_in_genres: function (genre) {
        let table_for_category = [];
        _.forEach(this.films_to_display, (movie)=>{
            _.forEach(movie.genres, (genre_name)=>{
                if(genre_name === genre) {
                    table_for_category.push(movie);
                }
            })
        })
        if (_.size(table_for_category) === 0){
            table_for_category.push({
                title:"Brak filmów"
            }  ) 
        }
        return table_for_category;
    }
  },
    
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: circle;
  padding: 0;
}
li {
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
th {
  vertical-align: center;
}

</style>
