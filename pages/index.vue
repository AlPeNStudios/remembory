<template>
    <div class="app">
        <client-only>
            <MemoryList />
        </client-only>
    </div>
</template>

<script>
import ConfirmButton from '~/components/ConfirmButton'
import MemoryList from '~/components/MemoryList'

export default {
    components: {
        ConfirmButton,
        MemoryList
    },

    methods: {
        AddMemory(){
            this.$store.commit('memories/addMemory', {
                id: new Date().getTime(),
                title: 'my memory ' + new Date().getTime(),
                content: [{ bla: 1 }]
            })
        },

        DeleteMemory(memoryId){
            
        }
    }
}

</script>

<style lang="scss">

</style>