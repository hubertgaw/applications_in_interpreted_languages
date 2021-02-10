<template>
  <div class="hello">
    <nav>
    <div class="nav-wrapper">
      <a href="#" class="left logo">Sklep internetowy</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="badges.html"><i class="material-icons">person</i></a></li>
        <li><a href="sass.html"><i class="material-icons">shopping_cart</i></a></li>
      </ul>
    </div>
  </nav>
  </div>
</template>

<script>
import M from 'materialize-css'
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  });


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
    
  },
  create: function() {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.logo {
  margin-left: 60px;
  font-size: 26px;
}
/* .hello {
    background-color: aqua;
} */

</style>
