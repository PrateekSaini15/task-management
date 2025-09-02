import { Injectable } from '@angular/core';
import { EncryptionService } from './encryption.service';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    private readonly KEYS = {
        TOKEN: "token",
    };

    constructor(private encryptionService: EncryptionService) { }

    //#region Token
    public setToken(token: string): void {
        this.setItem(this.KEYS.TOKEN, token);
    }

    public getToken(): string | null {
        return this.getItem(this.KEYS.TOKEN);
    }

    public removeToken(): void {
        localStorage.removeItem(this.KEYS.TOKEN);
    }
    //#endregion Token

    clear(): void {
        localStorage.clear();
    }

    private setItem(key: string, value: string): void {
        const encrypted = this.encryptionService.encrypt(value);
        localStorage.setItem(key, encrypted);
    }

    private getItem(key: string): string | null {
        const encrypted = localStorage.getItem(key);

        if (encrypted == null) {
            return null;
        }

        try {
            return this.encryptionService.decrypt(encrypted);
        } catch {
            console.error(`Failed to decrypt value for key: ${key}`);
            return null;
        }
    }
}
