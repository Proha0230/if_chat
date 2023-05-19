<template>
  <mainPage></mainPage>
  
<div>
  <router-view/>
</div>

</template>


<script>
import mainPage from './views/mainPage.vue';

export default{
  setup(){



    return{

    }
  },
  components:{mainPage}

}

</script>

<style>
#app{
  text-align: -webkit-center;
}
</style>
