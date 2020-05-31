<template>
    <div class="zoomer" :style="ZoomerStyles">
        <div ref="zoomer" class="zoomer__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
// import panzoom from 'panzoom'

const panzoom = !process.server ? require('panzoom') : undefined

export default {
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '100%'
        },
        minZoom: {
            type: Number,
            default: 0.2
        },
        maxZoom: {
            type: Number,
            default: 50
        }
    },

    data(){
        return {
            initialized: false,

            zoomerInstance: null,
            
            zoomer: {
                element: null,
                width: 0,
                height: 0,
            },
            
            zoom: {
                current: null,
                min: 0.5,
                max: 20
            },

            content: {
                element: null,
                width: 0,
                height: 0
            }
        }
    },

    computed: {
        ZoomerStyles(){
            return {
                width: this.width,
                height: this.height,
            }
        }
    },

    async mounted(){
        await this.$nextTick()

        this.zoomer.element = this.$refs.zoomer
        this.zoomer.width = this.zoomer.element.offsetWidth
        this.zoomer.height = this.zoomer.element.offsetHeight
        
        this.content.element = this.zoomer.element.children[0]
        this.content.width = this.content.element.offsetWidth
        this.content.height = this.content.element.offsetHeight

        this.zoomerInstance = panzoom(this.content.element, {
            maxZoom: this.maxZoom,
            minZoom: this.minZoom,
            bounds: true,
            boundsPadding: 0.2,
        })

        this.initialized = true
        console.log(this.zoomerInstance)
    },

    methods: {
        ResetZoom(){
            this.zoomerInstance.zoomAbs(window.innerWidth * 0.5, window.innerHeight * 0.2, 1)
        },

        ZoomIn(){
            let transform = this.zoomerInstance.getTransform()
            this.zoomerInstance.zoomAbs(window.innerWidth * 0.5, window.innerHeight * 0.2, transform.scale * 1.05)
        },

        ZoomOut(){
            let transform = this.zoomerInstance.getTransform()
            this.zoomerInstance.zoomAbs(window.innerWidth * 0.5, window.innerHeight * 0.2, transform.scale / 1.05)
        }
    }
}
</script>

<style lang="scss">
.zoomer {
    overflow: hidden;
    position: relative;
    
    &__content {
        width: 100%;
        height: 100%;
        overflow: hidden;

        * > {
            width: 100%;
            height: 100%;
        }
    }
}
</style>