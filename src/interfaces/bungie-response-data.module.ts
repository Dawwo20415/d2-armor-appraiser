interface BNG_object {
    data: any,
    privacy: number
}

interface CommonItem {
    displayProperties: {
        description: string,
        name: string,
        icon: string,
        hasIcon: boolean
    },
    tooltipNotifications: Array<any>,
    collectibleHash: number,
    iconWatermark: string,
    backgroundColor: any,
    screenshot: string,
    itemTypeDisplayName: string,
    flavorText: string,
    uiItemDisplayStyle: string,
    itemTypeAndTierDisplayName: string,
    displaySource: string,
    equippable: boolean
}

export interface BNG_CommonItemData {
    [key: string] : CommonItem
}

interface BNG_SupportedLanguages<T> {
    en: T,
    fr: T,
    es: T,
    'es-mx': T,
    de: T,
    it: T,
    ja: T,
    'pt-br': T,
    ru: T,
    pl: T,
    ko: T,
    'zh-cht': T,
    'zh-chs': T,
}

interface BNG_DestinyContent {
    DestinyNodeStepSummaryDefinition: string,
    DestinyArtDyeReferenceDefinition: string,
    DestinyPlaceDefinition: string,
    DestinyActivityDefinition: string,
    DestinyActivityTypeDefinition: string,
    DestinyClassDefinition: string,
    DestinyGenderDefinition: string,
    DestinyInventoryBucketDefinition: string,
    DestinyRaceDefinition: string,
    DestinyTalentGridDefinition: string,
    DestinyUnlockDefinition: string,
    DestinySandboxPerkDefinition: string,
    DestinyStatGroupDefinition: string,
    DestinyProgressionMappingDefinition: string,
    DestinyFactionDefinition: string,
    DestinyVendorGroupDefinition: string,
    DestinyRewardSourceDefinition: string,
    DestinyUnlockValueDefinition: string,
    DestinyRewardMappingDefinition: string,
    DestinyRewardSheetDefinition: string,
    DestinyItemCategoryDefinition: string,
    DestinyDamageTypeDefinition: string,
    DestinyActivityModeDefinition: string,
    DestinyMedalTierDefinition: string,
    DestinyAchievementDefinition: string,
    DestinyActivityGraphDefinition: string,
    DestinyActivityInteractableDefinition: string,
    DestinyBondDefinition: string,
    DestinyCharacterCustomizationCategoryDefinition: string,
    DestinyCharacterCustomizationOptionDefinition: string,
    DestinyCollectibleDefinition: string,
    DestinyDestinationDefinition: string,
    DestinyEntitlementOfferDefinition: string,
    DestinyEquipmentSlotDefinition: string,
    DestinyEventCardDefinition: string,
    DestinyStatDefinition: string,
    DestinyInventoryItemDefinition: string,
    DestinyInventoryItemLiteDefinition: string,
    DestinyItemTierTypeDefinition: string,
    DestinyLocationDefinition: string,
    DestinyLoreDefinition: string,
    DestinyMaterialRequirementSetDefinition: string,
    DestinyMetricDefinition: string,
    DestinyObjectiveDefinition: string,
    DestinyPlatformBucketMappingDefinition: string,
    DestinyPlugSetDefinition: string,
    DestinyPowerCapDefinition: string,
    DestinyPresentationNodeDefinition: string,
    DestinyProgressionDefinition: string,
    DestinyProgressionLevelRequirementDefinition: string,
    DestinyRecordDefinition: string,
    DestinyRewardAdjusterPointerDefinition: string,
    DestinyRewardAdjusterProgressionMapDefinition: string,
    DestinyRewardItemListDefinition: string,
    DestinySackRewardItemListDefinition: string,
    DestinySandboxPatternDefinition: string,
    DestinySeasonDefinition: string,
    DestinySeasonPassDefinition: string,
    DestinySocketCategoryDefinition: string,
    DestinySocketTypeDefinition: string,
    DestinyTraitDefinition: string,
    DestinyTraitCategoryDefinition: string,
    DestinyUnlockCountMappingDefinition: string,
    DestinyUnlockEventDefinition: string,
    DestinyUnlockExpressionMappingDefinition: string,
    DestinyVendorDefinition: string,
    DestinyMilestoneDefinition: string,
    DestinyActivityModifierDefinition: string,
    DestinyReportReasonCategoryDefinition: string,
    DestinyArtifactDefinition: string,
    DestinyBreakerTypeDefinition: string,
    DestinyChecklistDefinition: string,
    DestinyArtDyeChannelDefinition: string,
    DestinyEnergyTypeDefinition: string,
}

export interface BNG_ManifestList {
    version: string,
    mobileAssetContentPath: string,
    mobileGearAssetDataBases: any[],
    mobileWorldContentPaths: BNG_SupportedLanguages<string>,
    jsonWorldContentPaths: BNG_SupportedLanguages<string>,
    jsonWorldComponentContentPaths: BNG_SupportedLanguages<BNG_DestinyContent>,
    mobileClanBannerDatabasePath: string,
    mobileGearCDN: any,
    iconImagePyramidInfo: any[],
}

export interface BNG_Response {
    Response: any,
    ErrorCode: number,
    ThrottleSeconds: number,
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
