<template>
    <div class="h-100">
        <menu-component class="box-menu"></menu-component>
        <div class="d-flex box-main" v-if="songs.length > 0">
            <router-view :zingcharts="songs" class="col h-100 main"></router-view>
            <play-component :songs="songs" class="col-2 play"></play-component>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                songs: {},
            }
        },
        mounted() {
            this.axios
            .get('/api/zingchart')
            .then(response => {
                this.songs = response.data.data.song
                this.$store.dispatch('zingChart', response.data.data.song)
            })
            .catch(response => {
            });

        },
        methods: {
            
        }
    }
</script>
