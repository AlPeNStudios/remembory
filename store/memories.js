export const state = () => {
    return {
        memories: []
    }
}

export const mutations = {
    setMemories(state, memories){
        state.memories = memories
        localStorage.setItem('memories', JSON.stringify(state.memories))
    },

    addMemory(state, memory){
        state.memories.push(memory)
        localStorage.setItem('memories', JSON.stringify(state.memories))
    },

    removeMemory(state, memoryId){
        state.memories = state.memories.filter((memory) => {
            return memory.id != memoryId
        })
        localStorage.setItem('memories', JSON.stringify(state.memories))
    }
}

export const getters = {
    Memories(state){
        return state.memories
    }
}