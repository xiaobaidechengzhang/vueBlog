<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
	<ul>
		<li v-for="(item, index) in items" :key='index'>{{item}}</li>
	</ul>
	<button @click="setMsg">setMsg</button>
	<p id="ownTitle">owntitle</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'

const userModule = namespace('user')
@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private items:Array<number> = [2, 4, 6];
	
  private setMsg () :void {
	
  }
  
  @userModule.State userName!: string;
  created () {
	  console.log(this.userName)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
</style>
