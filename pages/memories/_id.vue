<template>
    <div>
        <div class="topmenu">
            <nuxt-link to="/">Zurück zum Start</nuxt-link>
        </div>
        
        
        <div v-if="memory">
            <div class="startmenu" v-if="!gameStarted">
                <label>Wieviele Felder sollen verdeckt werden? </label><input v-model="holeCount" />
                <br><br><button @click="StartGame">Start</button>
            </div>
            <div v-if="gameStarted" class="memory">
                <div class="description">
                    Fülle alle grauen Felder aus
                </div>

                <TableZoomer>
                    <div>
                        <div class="memory__row" v-for="row in memory.rows" :key="`row-${ row.id }`">
                            <div :class="GetColumnClasses(column)" v-for="column in row.columns" :key="`column-${ column.id }`">
                                <div v-if="column.isHeader == false && column.isHidden == true">
                                    <textarea v-if="!gameFinished" v-model="column.userInput" />
                                    <div v-if="gameFinished">
                                        Deine Antwort: <b>{{ column.userInput }} </b>
                                        <div v-if="!ColumnIsCorrect(column)">Richtige Antwort: <b>{{ column.content }}</b></div>
                                    </div>
                                </div>
                                <div v-else>
                                    {{ column.content }}
                                </div>
                            </div>
                        </div>
                    </div>
                </TableZoomer>

                <div class="bottommenu">
                    <button v-if="!gameFinished" @click="FinishGame">Fertig</button>
                    <button v-if="gameFinished" @click="RestartGame">Nochmal</button>
                </div>
            </div>

            
        </div>
    </div>
</template>

<script>
import TableZoomer from '~/components/TableZoomer'

export default {
    components: {
        TableZoomer
    },

    asyncData(){
        return {
            memory: null,
            holeCount: 10,
            gameStarted: false,
            gameFinished: false,
            startTime: null,
            hiddenColumns: [],
            correctAnswers: 0,
            wrongAnswers: 0
        }
    },


    async mounted(){
        let memory = this.$store.getters['memories/Memories'].find((_memory) => {
            return _memory.id == this.$route.params.id
        })

        this.memory = JSON.parse(JSON.stringify(memory))
    },

    methods: {
        StartGame(){
            this.startTime = new Date().getTime()

            let columns = []

            for(let i = 0; i < this.memory.rows.length; i++){
                for(let j = 0; j < this.memory.rows[i].columns.length; j++){
                    columns.push(this.memory.rows[i].columns[j])
                }
            }

            columns = columns
                .filter((column) => { return column.isHeader == false && column.content != '' })
                .sort(() => { return Math.random() - 0.5 })

            let holeCount = this.holeCount
            if(columns.length < holeCount) holeCount = columns.length

            for(let i = 0; i < holeCount; i++){
                columns[i].isHidden = true
                columns[i].userInput = ''
                this.hiddenColumns.push(columns[i])
            }

            this.gameStarted = true
        },

        FinishGame(){
            this.gameFinished = true
        },

        RestartGame(){
            location.reload()
        },

        ColumnIsCorrect(column){
            let userInput = column.userInput
            let content = column.content

            userInput = userInput.trim().toLowerCase()
            content = content.trim().toLowerCase()
            
            return userInput == content
        },

        GetColumnClasses(column){
            return {
                'memory__column': true,
                'memory__column--header': column.isHeader,
                'memory__column--input': this.gameFinished == false && column.isHidden,
                'memory__column--correct': column.isHidden == true && this.gameFinished == true && this.ColumnIsCorrect(column) == true,
                'memory__column--wrong': column.isHidden == true && this.gameFinished == true && this.ColumnIsCorrect(column) == false,
            }
        }

        
    }
}


</script>

<style lang="scss">
.memory {
    max-width: 100%;
    
    &__row {
        display: flex;
    }

    &__column {
        width: 20%;
        min-width: 100px;
        box-shadow: 0 10px 30px rgba(black, 0.16);
        padding: 8px;
        background-color: white;
        height: 80px;
        position: relative;
        text-align: center;

        &--header {
            font-weight: 700;
            font-size: 20px;
        }

        &--input {
            background-color: #ccc;
        }

        &--correct {
            background-color: #0f0;
        }

        &--wrong {
            background-color: #f00;
        }

        textarea {
            display: block;
            border: 1px solid #999;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0);
        }
    }
}
</style>