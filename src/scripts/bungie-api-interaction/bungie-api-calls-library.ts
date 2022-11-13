import { lastValueFrom } from 'rxjs';
import { BungieApiInterfaceService } from '@Ibungie/bungie-api-interface.service';
import { BNG_AuthToken, BNG_CommonItemData, BNG_Membership, BNG_Response } from '@dataTypes/bungie-response-data.module';
import { Membership } from '@dataTypes/storage-data.module';

//TODO: Find a more elegant way to do this
//This should NOT contain the whole thing that a component needs to do, that just moves the whole code
//This should only handle retrival of data from service requests
export async function lvfManifest(service: BungieApiInterfaceService): Promise<BNG_CommonItemData> {
    const manifest$ = service.getDestinyManifest();
    return await lastValueFrom(manifest$);
}

export async function lvfAuthToken(service: BungieApiInterfaceService, code: string): Promise<BNG_AuthToken> {
    const subscription$ = service.getAuthToken(code);
    return await lastValueFrom(subscription$);
}

export async function lvfMembership(service: BungieApiInterfaceService, token: string): Promise<BNG_Response> {
    const subscription$ = service.getMembershipInfo(token);
    return await lastValueFrom(subscription$);
}

export async function lvfCharacterInfo(service: BungieApiInterfaceService, token: string, membership: Membership): Promise<BNG_Response> {
    const subscription$ = service.getCharacterInfo(token, membership);
    return await lastValueFrom(subscription$);
}

export async function lvfVaultArmor(service: BungieApiInterfaceService, token: string, membership: Membership): Promise<BNG_Response> {
    const profile_data$ = service.getVaultArmors(token, membership);
    return await lastValueFrom(profile_data$);
}

export async function lvfCharacterArmor(service: BungieApiInterfaceService, token: string, membership: Membership, char_id: string): Promise<BNG_Response> {
    const char_data$ = service.getCharacterArmors(token, membership, char_id);
    return await lastValueFrom(char_data$);
}

