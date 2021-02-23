<template>
    <div class="zingchart">


        <!-- <div class="grid">
            <ul id="hexGrid">
                <li class="hex" v-for="(song, index) in zingcharts" :key="index" @click="openSong(index)">
                    <div class="hexIn">
                        <a class="hexLink" href="#">
                            <img :src="song.thumbnail" class="img-fluid" alt="">
                            <h1 id="demo1">{{song.name}}</h1>
                            <p id="demo2">{{song.artists_names}}</p>
                        </a>
                    </div>
                </li>
            </ul>
        </div> -->


        <div class="p-0 overflow-auto h-100 songs">
            <div class="d-flex shadow-sm align-items-center shadow-sm p-2 mb-2 song" v-for="(song, index) in zingcharts" :key="index" @click="openSong(index)">
                <img :src="song.thumbnail" class="img-fluid" alt="">
                <div>
                    <p class="m-0">{{song.name}}</p>
                    <p class="m-0 artists_names">{{song.artists_names}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['zingcharts'],
        data() {
            return {
            }
        },
        mounted() {
        },
        methods: {
            openSong(index) {
                this.$store.dispatch('newTracks', this.zingcharts[index].id)
            }
        }
    }
</script>