
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { TextEncoder } from 'util';

/**
 * An intrinsic object that provides methods to
 * handle signing and verifying JWTs.
 */
export class JWT {
  /**
   * Signs a payload to create a JWT and returns the token.
   * @param payload The payload to sign
   * @returns The signed JWT
   */
  static async sign(payload: any): Promise<string> {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expirationTime = issuedAt + (60 * 60 * 24) * 14; // 2 weeks | 14 days

    return await new SignJWT({ payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(expirationTime)
      .setIssuedAt(issuedAt)
      .setNotBefore(issuedAt)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  }

  /**
   * Verifies the JWT and returns the payload.
   * @param token The JWT to verify
   * @returns The payload after verification
   */
  static async verify(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return payload;
  }
}
