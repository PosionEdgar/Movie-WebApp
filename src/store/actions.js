import * as types from './mutation_types'
import { saveWantedMovie, saveWatchedMovie, saveComment } from 'assets/js/cache'

export const markWantedMovie = function({ commit }, movie) {
    commit(types.SET_WANTED_MOVIES, saveWantedMovie(movie));
}
export const markWatchedMovie = function({ commit }, movie) {
    commit(types.SET_WATCHED_MOVIES, saveWatchedMovie(movie))
}
export const markComment = function({ commit }, id) {
    commit(types.SET_FAVORITE_COMMENTS, saveComment(id))
}