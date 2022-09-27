export interface Membership {
    Id: string,
    Type: string
}

export interface Character {
    Id: string,
    class_hash: string,
    emblem_path: string
}

export interface ArmorStats {
    mob: number,
    res: number,
    rec: number,
    dis: number,
    int: number,
    str: number,
    tot: number
}

export interface ArmorItem {
    itemInstanceId: string,
    stats: ArmorStats,
    score: number
}
