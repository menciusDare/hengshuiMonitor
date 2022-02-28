<template>
    <!-- 内容区 -->
    <div class="content coutentMain">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
    export default {
        name: "AmfContentHtml"
    }
</script>

<style scoped>

</style>
