import express, { Application, Request, Response} from 'express';
import morgan from 'morgan';
import * as http from 'http';
import { Pool } from 'pg';
import cors from 'cors';
import session from 'express-session'
import { PoolConnection } from './db/Pool';
import { serverConfig } from './config/Config-types';
import Router from './router/router';
import passport from 'passport';
import { loginPassport } from './auth/passport';




export class API {
    public app: Application
    private httpServer?: http.Server
    static poolConnection: Pool  

    constructor(){
        this.app = express(),
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors({
            origin: 'http://localhost:5173',
            credentials: true
        }));
        this.app.use(session({
            secret: 'facturapp',
            resave: false,
            saveUninitialized: false
        }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(morgan('dev'));
        this.app.use(Router);     
    };

    public async init(config: serverConfig){
        API.poolConnection = new PoolConnection().pool;
        loginPassport(passport)
        return this.listen(config.port, config.hostapp);
    }

    public async listen (port: number, host: string){
        return this.httpServer = this.app.listen(port, host, () => {
            console.log('Successfully running on Port 3000')
        })
    }
};