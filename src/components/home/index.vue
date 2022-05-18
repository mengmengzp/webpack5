<template>
    <div>
        <div class="title" datas-rh-theme = "dark"> {{title}}</div>
        <div class="msg"> {{info.msg}}</div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
// eslint-disable-next-line
import $ from 'myJquery';

const title = ref('hi');
// 引用类型变成响应式
const info = reactive({ msg: 'c' });
// const a = null;
// const p = new Promise((resolve, reject) => {
//     if (a === '1') {
//         resolve(a);
//     } else {
//         reject(new Error('error'));
//     }
// });
// p.then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(a.length);

//     console.log(err);
// });
setTimeout(() => {
    // 基本类型改变值需要.value
    title.value = 'hello';
    info.msg = 'vue3';
}, 1000);

// 使用jquery操作dom
setTimeout(() => {
    $('.msg').html('vue3!!!');
}, 2000);
</script>

<style lang="less" scoped>
.title {
    color: red;
    display: flex;
    &[datas-rh-theme="dark"] {
      background-color: red;
    }
    &[datas-rh-theme="light"] {
      background-color: black;
    }
    img {
        width: 40px;
        height: 40px;
    }
}
.msg {
    color: blue;
    }
.cc {
    color: red;
}
</style>
