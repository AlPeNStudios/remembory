<template>
    <div class="memory__list">
        <div style="text-align: center">
            <h1>Remembory</h1>
        </div>
        <div 
            class="memory__list__item"
            v-for="(memory, memoryIndex) in $store.getters['memories/Memories']"
            :key="`memory-${ memory.id }-${ memoryIndex }`"
        >
            <ConfirmButton 
                @confirm="$store.commit('memories/removeMemory', memory.id)"
                :confirmmessage="`Soll die Übung <b>${ memory.title }</b> wirklich gelöscht werden?`"
            >
                löschen
            </ConfirmButton>
            <nuxt-link :to="`/memories/edit/${ memory.id }`">bearbeiten</nuxt-link>
            <nuxt-link :to="`/memories/${ memory.id }`"><b>{{ memory.title }}</b></nuxt-link>
        </div>

        <!-- <button @click="AddMemory">Add memory</button> -->
        <div class="bottommenu">
            <nuxt-link to="/memories/create">Neues Remembory erstellen</nuxt-link>
        </div>
        
    </div>
</template>

<script>
import ConfirmButton from '~/components/ConfirmButton'

export default {
    components: {
        ConfirmButton,
    },

    // methods: {
    //     AddMemory(){
    //         this.$store.commit('memories/addMemory', {
    //             id: new Date().getTime(),
    //             title: 'my memory ' + new Date().getTime(),
    //             content: [{ bla: 1 }]
    //         })
    //     }
    // }
}

</script>

<style lang="scss">

</style>