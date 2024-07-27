import { createRouter, createWebHistory } from 'vue-router';
//import HomeView from '../views/HomeView.vue';
import TheMain from '../views/TheMain.vue';
import TheMatchDetail from '../views/TheMatchDetail.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'TheMain',
			component: TheMain,
		},
		{
			path: '/match-detail/:id',
			name: 'TheMatchDetail',
			component: TheMatchDetail,
		},
		{
			path: '/login',
			name: 'Login',
			component: Login,
		},
		{
			path: '/signup',
			name: 'Signup',
			component: Signup,
		},
		// {
		// 	path: '/about',
		// 	name: 'about',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (About.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import('../views/TheMain.vue'),
		// },
	],
});

export default router;
