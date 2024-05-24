// GlobalSetup.ts/js
import {FullConfig} from '@playwright/test';

async function globalTearDown(config: FullConfig) {
    console.log(`\n[GlobalTearDown] Test TearDown`)
}

export default globalTearDown;