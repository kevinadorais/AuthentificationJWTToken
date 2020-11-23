import Vue from 'vue' ;
import axios from './http' ;
import Vuex from 'vuex' ;
import router from './routes' ;

Vue.use(Vuex);

const user = {
    namespaced: true,
    state: {
        data: {},
        isLoading: false,
        isLoggedIn: localStorage.getItem('jwtToken') ? null : false,
        jwtToken: localStorage.getItem('jwtToken'),
        errors: []
    },
    getters: {
        isLoading: state => state.isLoading,
        isLoggedIn: state => state.isLoggedIn,
        errors: state => state.errors,
        currentUser: state => state.data,
        jwtToken: state => state.jwtToken
    },
    actions: {
        async trySignin(context, payload){
            try {
                context.commit('updateIsLoading', true)
                const response = await axios.post('/api/auth', payload)
                context.commit('signinSuccess', response.data)
                router.push('/profile')
            } catch(err) {
                    context.commit("signErrors", err)
            }
        },
        async trySignup(context, payload){
            try {
                context.commit('updateIsLoading', true)
                await axios.post('/api/user', payload)
                context.commit("signupSuccess")
                router.push('/signin')
            } catch (err) {
                context.commit("signErrors", err)
            }
        },
        async fetchCurrentUser(context){
            try {
                context.commit('updateIsLoading', true) ;
                const response = await axios.get("/api/user/current")
                context.commit('fetchCurrentUserSuccess', response.data)
            } catch(err) {
                context.commit("signErrors", err)
            }
        },
        async refreshToken(context) {
            try{
                const response = await axios.get('/api/auth/refresh-token')
                setTimeout(() => {
                    context.dispatch('refreshToken')
                }, (15 * 60 * 1000))
                context.commit('refreshTokenSuccess', response.data)
            } catch (err) {
                context.commit('refreshTokenError')
            }
        }
    },
    mutations: {
        updateIsLoading(state, payload){
            state.isLoading = payload ;
        },
        signinSuccess(state, payload){
            state.isLoading = false ;
            state.errors = [] ;
            state.isLoggedIn = true ;
            delete payload.user.password ;
            state.data = payload.user ;
            state.jwtToken = payload.jwtToken ;
            localStorage.setItem('jwtToken', payload.jwtToken) ;
        },
        signupSuccess(state){
            state.isLoading = false ;
            state.errors = [] ;
        },
        signout(state){
            state.jwtToken = null ;
            state.data = null ;
            state.isLoggedIn = false ;
            localStorage.removeItem('jwtToken') ;
        },
        signErrors(state, payload){
            state.isLoading = false ;
            state.errors = payload.response.data ;
        },
        fetchCurrentUserSuccess(state, payload){
            state.data = payload ;
            state.isLoading = false ;
            state.isLoggedIn = true ;
            state.errors = [] ;
        },
        refreshTokenSuccess(state, payload){
            state.data = payload.user ;
            state.isLoggedIn = true ;
            state.jwtToken = payload.jwtToken ;
            localStorage.setItem('jwtToken', payload.jwtToken) ;
        },
        refreshTokenError(state){
            state.data = null ;
            state.isLoggedIn = false ;
            state.jwtToken = null ;
            localStorage.removeItem('jwtToken') ;

        }
    }
}

const store = new Vuex.Store({
    modules: {
        user
    }
})

export default store ;