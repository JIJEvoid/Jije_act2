<template>
  <div id="WEBGLcontainer" class="WEBGLcontainer"></div>
</template>

<script lang="ts" setup>
import Game from "@/render/init";
import { onMounted } from "vue";

onMounted(()=>{
  let gameInstace = new Game()
})
</script>
<style>
.WEBGLcontainer{
  height: 100vh;
  width: 100vw;
}
</style>
