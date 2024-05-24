import express, { Router } from 'express';
import {
    AuthRouter, OrganizerRouter
} from '../routers';

const router = express.Router();

const apiRoutes: { path: string, route: Router }[] = [
    {
        path: '/auth',
        route: AuthRouter,
    },
    {
        path: '/organizer',
        route: OrganizerRouter,
    },
];

apiRoutes.forEach(route => router.use(route.path, route.route));
export default router;