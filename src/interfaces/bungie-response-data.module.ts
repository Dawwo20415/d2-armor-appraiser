interface BNG_object {
    data: any,
    privacy: number
}

export interface BNG_Response {
    Response: any,
    ErrorCode: number,
    ThrottleSeconds: 0,
    ErrorStatus: string,
    Message: string,
    MessageData: object
}

export interface BNG_AuthToken {
    access_token: string,
    token_type: string,
    expires_in: number,
    membership_id: string
}

export interface BNG_Membership {
    destinyMembership: Array<object>,
    primaryMembershipId: string,
    bungieNetUser: object
}

export interface BNG_CharactersData {
    characters: BNG_object
}

export interface BNG_VaultBucketData {
    profileInventory: BNG_object,
    itemComponents: {
        instances: BNG_object,
        stats: BNG_object,
        perks: BNG_object
    }
}

export interface BNG_CharBucketData {
    inventory: BNG_object,
    equipment: BNG_object,
    itemComponents: {
        instances: BNG_object,
        stats: BNG_object,
        perks: BNG_object
    },
    uninstancedItemComponents: {
        perks: BNG_object
    }
}