import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"; //Lưu thông tin lại, vuex chỉ lưu thông tin tạm thời, F5 sẽ bị mất
import axios from 'axios';
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        songs: {},
        tracks: null
    },
    getters: {
        zingchart(state) {
            return state.songs
        },
        newtracks(state) {
            return state.tracks
        },
    },
    mutations: {
        zingChart(state, songs) {
            state.songs = songs
        },
        newTracks(state, song) {
            state.tracks = song
        },
    },
    actions: {
        zingChart({commit}, songs) {
            commit('zingChart', songs)
        },
        newTracks({commit}, song) {
            commit('newTracks', song)
        }
    },
    plugins: [createPersistedState()],
});

export default store;