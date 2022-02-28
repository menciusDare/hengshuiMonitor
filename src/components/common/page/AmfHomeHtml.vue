<template>
  <div class="page">
    <amfHeaderHtml></amfHeaderHtml>
    <div class="content">
      <amfNavHtml></amfNavHtml>
      <amfContentHtml></amfContentHtml>
    </div>


    <amfFooterHtml></amfFooterHtml>
  </div>
</template>

<script>
  import amfHeaderHtml from './AmfHeaderHtml'
  import amfNavHtml from './AmfNavHtml'
  import amfContentHtml from './AmfContentHtml'
  import amfFooterHtml from './AmfFooterHtml'

    export default {
      name: "AmfHomePage",
      components:{
        amfHeaderHtml,
        amfNavHtml,
        amfContentHtml,
        amfFooterHtml
      }
    }
</script>

<style scoped>

</style>
