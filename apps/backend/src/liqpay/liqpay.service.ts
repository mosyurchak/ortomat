import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";

@Injectable()
export class LiqpayService {
  private publicKey = process.env.LIQPAY_PUBLIC_KEY || "test_public_key";
  private privateKey = process.env.LIQPAY_PRIVATE_KEY || "test_private_key";

  generateData(params: Record<string, any>): { data: string; signature: string } {
    const jsonString = JSON.stringify(params);
    const data = Buffer.from(jsonString).toString("base64");
    const signature = crypto
      .createHash("sha1")
      .update(this.privateKey + data + this.privateKey)
      .digest("base64");
    return { data, signature };
  }

  validateSignature(data: string, signature: string): boolean {
    const expected = crypto
      .createHash("sha1")
      .update(this.privateKey + data + this.privateKey)
      .digest("base64");
    return expected === signature;
  }
}
