<template>
    <button 
        type="button"
        class="confirmbutton"
        @click="ShowConfirmation"
    >
        <slot></slot>

        <div class="confirmbutton__modal" v-if="confirmationActive">
            <div class="confirmbutton__modal__underlay"></div>
            <div class="confirmbutton__modal__content">
                <div class="confirmbutton__message" v-html="confirmmessage"></div>
                <button class="confirmbutton__modal__button confirmbutton__modal__button--yes" @click.stop="SubmitConfirmation">ja</button>
                <button class="confirmbutton__modal__button confirmbutton__modal__button--no" @click.stop="CloseConfirmation">nein</button>
            </div>
        </div>
    </button>
</template>

<script>
export default {
    props: {
        confirmmessage: {
            type: String,
            default: 'Sind Sie sicher?'
        }
    },

    data(){
        return {
            confirmationActive: false
        }
    },

    methods: {
        ShowConfirmation(){
            this.confirmationActive = true
        },

        CloseConfirmation(){
            this.confirmationActive = false
        },

        SubmitConfirmation(){
            this.$emit('confirm')
            this.CloseConfirmation()
        }
    }
}
</script>

<style lang="scss">
.confirmbutton {
    padding: 8px 13px !important;
    font-size: 16px !important;

    &__message {
        padding: 10px 0 20px;
        font-size: 16px;

    }

    &__modal {
        &__underlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(black, 0.5);
        }

        &__content {
            position: fixed;
            top: 50%;
            left: 50%;
            margin-top: -100px;
            margin-left: -150px;
            width: 300px;
            background-color: rgba(black, 0.5);
            background-color: white;
            z-index: 1;
            box-shadow: 0 10px 30px rgba(black, 0.16);
            padding: 13px 25px;
        }

        &__button {
            font-size: 24px;
            font-weight: 700;
            border: 0;
            padding: 5px 13px;

            &--yes {
                background-color: green;
                color: white;
            }
            &--no {
                background-color: red;
                color: white;
            }
        }
    }
}
</style>