<template>
<div class="wrap">
    <slot></slot>
</div>
</template>

<script>
export default {
    data() {
        return {
            input: ''
        }
    },
}
</script>

<style lang="scss" scoped>
.wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 100px;
    color: slategray;
}
</style>

