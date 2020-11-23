import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Profile from './components/Profile';
import store from './store' ;

Vue.use(VueRouter);

const isLoggedIn = (to, from, next) => {
    if(store.getters['user/isLoggedIn']){
        next()
    }
    else if(store.getters['user/isLoggedIn'] === null) {
        const unsubscribe = store.subscribe((mutation) => {
            if(mutation.type === 'user/refreshTokenSuccess'){
                unsubscribe() ;
                next() ;
            }
            else if(mutation.type === 'user/refreshTokenError'){
                unsubscribe() ;
                router.push('/signin') ;
            }
        })
    }
    else {
        router.push('/signin')
    }
}

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: Home },
        {path: '/signin', component: Signin },
        {path: '/signup', component: Signup },
        {path: '/profile', beforeEnter: isLoggedIn, component: Profile }
    ]
})

export default router ;