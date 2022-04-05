<template>
    <div>
        <div class="title"><img :src="info.icon"> {{title}}</div>
        <div class="msg"> {{info.msg}}</div>
    </div>

</template>

<script setup>
import { ref, reactive } from 'vue';
import icon from './imgs/vue.png';

const title = ref('hi');
// 引用类型变成响应式
const info = reactive({ msg: 'hello word', icon });

setTimeout(() => {
    // 基本类型改变值需要.value
    title.value = 'hello222';
    info.msg = 'vue3';
}, 1000);
</script>

<style lang="less" scoped>
.title {
    color: red;
    display: flex;
    img {
        width: 40px;
        height: 40px;
    }
}
.msg {
    color: blue;
    }
</style>
