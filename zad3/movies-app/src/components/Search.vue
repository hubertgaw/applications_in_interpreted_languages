<template>
    <div class="container">
    <form>
        <div class="form-group">
            <div class="d-flex">
                <label class="justify-content-left" for="inputTitle">Wyszukaj film</label>
            </div>
            <input type="text" v-model="movie.title" id=inputTitle class="form-control col-sm-12" 
            placeholder="Podaj tytuł lub fragment tytułu filmu"/>
        </div>
        <div class="form-group row">
          <div class="col-sm-4 d-flex">
          <label class="col-form-label" for="inputProductionFrom">Rok produkcji od:</label>
          </div>
          <div class="col-sm-8">
              <input type="text" v-model="movie.year_from" id=inputProductionFrom class="form-control"  
              placeholder="Liczba naturalna z przedziału 1900-2019"/>
          </div>
        </div>
        <div class="form-group row">
            <div class="col-sm-4 d-flex">
                <label class="col-form-label justify-content-left" for="inputProductionTo">Rok produkcji do:</label>
            </div>
            <div class="col-sm-8">
                <input type="text" v-model="movie.year_to" id=inputProductionTo class="form-control" 
                placeholder="Liczba naturalna z przedziału 1900-2019"/>
            </div>
        </div>
        <div class="form-group">
          <div class="d-flex">
            <label class="justify-content-left" for="inputCast">Obsada</label>
          </div>
          <input type="text" v-model="movie.cast" id="inputCast" class="form-control col-sm-12" 
          placeholder="Imię i nazwisko"/>
        </div>
        <div class="form-group row">
            <input type="button" @click="emit_films" class="btn btn-info col-sm-12" value="Szukaj"/>
        </div>
    </form>
    </div>
</template>

<script>
import _ from 'underscore';

export default {
  name: 'Search',
   data: function() {
       return {
           received_data: {},
           received_data_table: [],
           data_to_emit: [],
           //movies: Movies
           movie: {
               title:"",
               year_from:"",
               year_to:"",
               cast:"",
           }
      }
  },
  created: function() {
      this.emitter.on('emitted_table',(data) =>
      {
          console.log('event received');
          this.received_data = data;
          this.received_data_table = this.received_data;
      })
  },
  methods: {
      search_engine: function() {
        this.data_to_emit = [];

        _.forEach(this.received_data_table, (movie)=>{
            if(movie.title.includes(this.movie.title)) {
                this.data_to_emit.push(movie);
            }
        })

        var tmp = [];
        if (this.movie.year_from !== undefined && this.movie.year_to !== undefined) {
            if(this.movie.year_from == '') {
                this.movie.year_from = 1900;
            }
            if(this.movie.year_to == '') {
                this.movie.year_to = 2020;
            }
            tmp = this.data_to_emit;
            this.data_to_emit = [];
            _.each(tmp, (movie)=>{
                if(parseInt(movie.year) >= this.movie.year_from &&
                   parseInt(movie.year) <= this.movie.year_to) {
                       this.data_to_emit.push(movie);
                   }
            })   
        }


        if (this.movie.cast !== "") {
            tmp = this.data_to_emit;
            this.data_to_emit = [];
           // this.data_to_emit = _.where(tmp,)

            _.each(tmp, (movie)=>{
                _.each(movie.cast, (actor)=>{
                    if (actor === this.movie.cast) {
                        this.data_to_emit.push(movie);
                    }
                })
            })
        }

      },
      emit_films: function () {
          this.search_engine();
          this.emitter.emit('filtered_films', this.data_to_emit);
         // console.log("emitting films from search");
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
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
th {
  vertical-align: center;
}
</style>
