import { SelectMultipleControlValueAccessor } from "@angular/forms"

export interface CharacterResponse {
    Response: {
        profileInventory: object,
        itemComponents: object,
        ErrorCode: number,
        ThrottleSeconds: number,
        ErrorStatus: string,
        Message: string,
        MessageData: object
    }
}
