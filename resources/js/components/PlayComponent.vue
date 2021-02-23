<template>
    <div class="play-tracks shadow-sm p-3">
        <div>
            <div class="tracks-info text-center py-2">
                <img :src="tracks.thumbnail" class="rounded-circle img-fluid" alt="">
                <div class="text-left px-3">
                    <p class="tracks-name">{{tracks.name}}</p>
                    <div class="d-flex justify-content-between">
                        <p class="tracks-artists">{{tracks.artists_names}}</p>
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="tracks-action text-center p-3">
            <div class="d-flex align-items-center justify-content-evenly my-1">
                <i class="fas fa-fast-backward"></i>
                <i @click="play()" class="fas fa-play icon-play"></i>
                <i @click="pause()" class="fas fa-pause icon-play" style="display: none;"></i>
                <i class="fas fa-fast-forward"></i>
            </div>
            <input type="range" ref="timeline" value="0">
            <div class="w-100">
                <!-- <i id="volumeUp" class="fas fa-volume-up"></i>
                <i id="volumeMute" class="fas fa-volume-mute" style="display: none;"></i> -->
            </div>
        </div>
        
        <audio ref="tracks" controls hidden>
            <source :src="'https://api.mp3.zing.vn/api/streaming/audio/'+ tracks.id +'/320'" type="audio/ogg">
            <source :src="'https://api.mp3.zing.vn/api/streaming/audio/'+ tracks.id +'/320'" type="audio/mpeg">
        </audio>
        <!-- <ul id="playlist" class="overflow-auto h-100" hidden>
            <li v-for="(song, index) in songs" :key="index"><a :href="'https://api.mp3.zing.vn/api/streaming/audio/'+ song.id + '/320'">{{song.name}}</a></li>
        </ul> -->
    </div>
</template>
<script>
    export default {
        props: ['songs'],
        data() {
            return {
                tracks: this.songs[0]
            }
        },
        mounted() {
            this.$refs.tracks.onloadedmetadata = () => this.$refs.timeline.max = this.$refs.tracks.duration
            this.$refs.tracks.ontimeupdate = () => this.$refs.timeline.value = this.$refs.tracks.currentTime
            this.$refs.timeline.onchange = () => this.$refs.tracks.currentTime = this.$refs.timeline.value
            
            var self = this;
            self.$refs.tracks.addEventListener('ended',function(e){
                var isPlaylist = self.songs.find(item => item.id == self.tracks.id);
                if(typeof isPlaylist == 'undefined') {
                    return
                }
                var rank = Object.keys(self.songs).find(key => self.songs[key].id === self.tracks.id);
                self.tracks = self.songs.slice(parseInt(rank) + 1, parseInt(rank) + 2)[0];
                
                self.$refs.tracks.onloadedmetadata = () => self.$refs.timeline.max = self.$refs.tracks.duration
                self.$refs.tracks.ontimeupdate = () => self.$refs.timeline.value = self.$refs.tracks.currentTime
                self.$refs.timeline.onchange = () => self.$refs.tracks.currentTime = self.$refs.timeline.value

                self.$refs.tracks.pause();
                self.$refs.tracks.load();
                self.$refs.tracks.oncanplaythrough = self.$refs.tracks.play();
            });

        },
        computed: {
            
        },
        methods: {
            play() {
                if (this.$refs.tracks.paused) {
                    this.$refs.tracks.play();
                } else {
                    this.$refs.tracks.pause();
                }
            }
        },
        watch: {
            '$store.state.tracks': function() {
                if(this.$store.state.tracks != this.tracks.id) {
                    var tracks = this.songs.filter(item => item.id == this.$store.state.tracks);
                    if(tracks.length > 0) {
                        this.tracks = tracks[0]
                    }
                    this.$refs.tracks.onloadedmetadata = () => this.$refs.timeline.max = this.$refs.tracks.duration
                    this.$refs.tracks.ontimeupdate = () => this.$refs.timeline.value = this.$refs.tracks.currentTime
                    this.$refs.timeline.onchange = () => this.$refs.tracks.currentTime = this.$refs.timeline.value

                    this.$refs.tracks.pause();
                    this.$refs.tracks.load();
                    this.$refs.tracks.oncanplaythrough = this.$refs.tracks.play();
                }
            }
        }
    }
</script>