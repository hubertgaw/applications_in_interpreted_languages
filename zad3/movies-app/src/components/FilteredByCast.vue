<template>
    <div class="container">
        <h3>Movies sorted by cast:</h3>
        <ul class="list-group">
        <li class="list-group-item-info" v-for="actor in actorsFiltered" :key="actor">
            {{actor}}
            <ul class="list-group">
                <li class="list-group-item" v-for="movie in findMovie(actor)" :key="movie.title">
                    {{movie.title}}
                </li>
            </ul>
        </li>
        </ul>
    </div>
</template>

<script>
import _ from 'underscore';

export default {
  name: 'FilteredByCast',
  data: function() {
      return {
          received_movies: {},
          actorsFiltered: [],
          list100Movies: []
      }
  },
  created: function() {
      this.emitter.on('emitted_table',(data) =>
      {
        this.received_movies = data;
        this.list100Movies = this.prepare100Movies();
        this.actorsFiltered = this.initActors();
    })
  }, 
    methods: {
        prepare100Movies: function() {
            var movies = _.sample(this.received_movies, 100);
            movies = _.sortBy(movies, 'title');
            return movies;
        },
        initActors: function() {
            var actors = new Set();
            _.forEach(this.list100Movies, (movie) => {
                if (_.size(movie.cast) > 0) {
                    _.forEach(movie.cast, (cast) => {
                        actors.add(cast)
                    })
                }
            })
            return (Array.from(actors)).sort();
        },
        findMovie: function(actor) {
            var moviesList = _.filter(this.list100Movies, (movie) => {
                for (const act in movie.cast) {
                    if (movie.cast[act] === actor) {
                        return true;
                    } 
                }
                return false;
            })
        return moviesList;
        }
    }
}
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
