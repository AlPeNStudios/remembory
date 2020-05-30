<template>
    <div class="memory__list">
        <div 
            class="memory__list__item"
            v-for="(memory, memoryIndex) in $store.getters['memories/Memories']"
            :key="`memory-${ memory.id }-${ memoryIndex }`"
        >
            <ConfirmButton 
                @confirm="$store.commit('memories/removeMemory', memory.id)"
                :confirmmessage="`Soll die Übung <b>${ memory.title }</b> wirklich gelöscht werden?`"
            >löschen</ConfirmButton>
            {{ memory.title }} 
        </div>

        
        <button @click="AddMemory">Add memory</button>
    </div>
</template>

<script>
import ConfirmButton from '~/components/ConfirmButton'

export default {
    components: {
        ConfirmButton
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