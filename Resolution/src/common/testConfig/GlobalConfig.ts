import {EnvType} from "../types/EnvType";


export abstract class GlobalConfig {
    readonly ENV: string = process.env.ENV ??  '';
    readonly BOOKS_API: string = process.env.BOOKS_API ?? '';
    readonly SPEED_WEB: string = process.env.SPEED_WEB ?? '';
    readonly IDOVEN_WEB: string = process.env.IDOVEN_WEB ?? '';
    readonly LONG_ACTION_TIMEOUT: number = Number(process.env.LONG_ACTION_TIMEOUT) ?? 0;
    readonly SHORT_ACTION_TIMEOUT: number = Number(process.env.SHORT_ACTION_TIMEOUT) ?? 0;

    protected constructor(){
        this.checkTestConfig(this.ENV)
    }

    checkTestConfig(env: string|undefined|null) {
        if( !env || env === ''){
            throw new Error(`[Error] ENV: '${env}' cannot be undefined`);
        }
        if( !(Object.values(EnvType).toString().includes(env)) ){
            throw new Error(`[Error] ENV: '${env}' not valid`);
        }
    }
}
