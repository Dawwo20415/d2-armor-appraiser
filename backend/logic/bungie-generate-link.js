const dotenv = require('dotenv').config();

function generateAuthenticationLink() {
    const state = "6i0mkLx79Hp91nzWVeHrzMN4";
    const uri = "https://www.bungie.net/en/oauth/authorize?client_id="
        + process.env.OAUTH_CLIENT_ID + "&response_type=code&state=" + state;
    console.log(uri);
    
}

generateAuthenticationLink();