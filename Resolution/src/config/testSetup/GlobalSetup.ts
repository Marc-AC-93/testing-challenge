// GlobalSetup.ts/js
import {FullConfig} from '@playwright/test';

async function globalSetup(config: FullConfig) {
    console.log(`[GlobalSetup] Test Setup`)
}

export default globalSetup;