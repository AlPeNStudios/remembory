<template>
    <div v-if="memory" class="memoryform">
        <div class="topmenu">
            <nuxt-link to="/">Zurück zum Start</nuxt-link>
        </div>

        <form @submit.prevent="UpdateMemory">
            <div class="memorysettings">
                <label for="memorytitle">Titel des Remembories</label><input type="text" name="memorytitle" v-model="memory.title"  /><br>
                <label for="memorycolumns">Spalten pro Zeile</label><input name="memorycolumns" type="number" v-model="memory.columnCount"  /><br>
            </div>

            <TableZoomer>
                <div class="memoryedit">
                    <div class="memoryedit__row" v-for="row in memory.rows" :key="`row-${ row.id }`">
                        <div class="memoryedit__column memoryedit__column--small">
                            <ConfirmButton 
                                @confirm="memory.rows = memory.rows.filter((_row) => { return row.id != _row.id })"
                                :confirmmessage="`Soll die Zeile wirklich gelöscht werden?`"
                            >
                                löschen
                            </ConfirmButton>
                        </div>
                        <div class="memoryedit__column" v-for="column in row.columns" :key="`column-${ column.id }`">
                            <label for="memoryisheader">Ist eine Überschrift</label>
                            <input type="checkbox" name="memoryisheader" v-model="column.isHeader"/><br>
                            <label for="memorycontent">Inhalt</label>
                            <textarea name="memorycontent" v-model="column.content"></textarea>
                        </div>
                    </div>
                </div>
            </TableZoomer>

            <div class="memorysave">
                <button type="button" v-on:click="AddRow()">Neue Zeile hinzufügen</button>
                <button type="submit">Speichern</button>
            </div>
        </form>
    </div>
</template>

<script>
import ConfirmButton from '~/components/ConfirmButton'
import TableZoomer from '~/components/TableZoomer'

export default {
    components: {
        ConfirmButton,
        TableZoomer
    },
    
    data(){
        return {
            memory: null
        }
    },

    watch: {
        'memory.columnCount'(value){
            for(let i = 0; i < this.memory.rows.length; i++){
                if(this.memory.rows[i].columns.length < value){
                    for(let j = this.memory.rows[i].columns.length; j < value; j++){
                        this.memory.rows[i].columns.push(this.AddColumn(i, j))
                    }
                }

                this.memory.rows[i].columns = this.memory.rows[i].columns.splice(0, value)
            }
        }
    },

    mounted(){
        let currentMemory = this.$store.getters['memories/Memories'].find((memory) => {
            return memory.id == this.$route.params.id
        })

        this.memory = JSON.parse(JSON.stringify(currentMemory))
    },

    methods: {
        UpdateMemory(){
            this.$store.commit('memories/updateMemory', this.memory)
            this.$router.push('/')
        },

        AddColumn(rowIndex, columnIndex){
            return {
                id: `column-${ rowIndex }-${ columnIndex }-${ new Date().getTime() }`,
                isHeader: false,
                content: ''
            }
        },

        AddRow(){
            let columns = []
            for(let i = 0; i < this.memory.columnCount; i++) columns.push(this.AddColumn(this.memory.rows.length, i))
            this.memory.rows.push({ id: new Date().getTime(), columns })
        }
    }
}


</script>