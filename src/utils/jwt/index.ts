
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { TextEncoder } from 'util';

/**
 * @typedef {import('../interfaces').PayloadProps} PayloadProps
 * @typedef {import('../../frontend/node_modules/jose').JWTPayload} JWTPayload
 */

/**
 * An intrinsic object that provides functions to
 * handle signing and verifying JWTs.
 */
export class JWT {
  /**
   * Signs a payload (the data) to create a JWT and returns it.
   * @param payload The payload to sign
   * @returns The signed JWT token
   */
  static async sign(payload: any): Promise<string> {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expirationTime = issuedAt + (60 * 60) * 2; // two hours

    return await new SignJWT({ payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(expirationTime)
      .setIssuedAt(issuedAt)
      .setNotBefore(issuedAt)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  }

  /**
   * Verifies the JWT and returns the payload.
   * @param token The JWT token to verify
   * @returns The JWT payload after verification
   */
  static async verify(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return payload;
  }
}
