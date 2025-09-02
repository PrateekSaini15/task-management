import { Injectable } from '@angular/core';
import { environment } from 'config/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private secretKey = environment.encryptionKey; 

  public encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  public decrypt(ciphertext: string): string {
    const bytes = CryptoJS.AES.decrypt(ciphertext, this.secretKey);

    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
