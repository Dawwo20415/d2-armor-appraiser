import { getUUIDState, storeAuthenticationToken } from '../browser/storage-interface';
const bungie_api = require('./bungie-api-interface');
const btn_manual = document.getElementById('manual_redirect');

btn_manual.addEventListener('click', () => {
    window.location.href = '/';
});

async function handleAuthReturn() {
    const query_params = new URL(window.location.href).searchParams;
    const code = query_params.get('code');
    const state = query_params.get('state');

    if (!code?.length) {
        console.log("No authorization code has been recieved from bungie");
        return;
    }

    const browserAuthState = getUUIDState();
    if (state !== browserAuthState) {
        console.log("local state doesn't confirm one recieved from bungie");
        if (!browserAuthState || browserAuthState.length === 0) {
            console.log("In particular no state value is stored locally");
        }
        return;
    }

    let token = await bungie_api.getAuthenticationToken(code);
    storeAuthenticationToken(token);

    window.location.href = '/';
}


handleAuthReturn();
