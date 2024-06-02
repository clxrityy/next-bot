import { CreateUserParams, EncrypyedTokens, OAuth2CredentialsResponse, OAuth2UserResponse, OAuthTokenExchangeRequestParams } from "@/types";
import { authHeaders, buildOAuth2RequestPayload, encryptToken } from "./helpers";
import axios from "axios";
import { DISCORD_API_ROUTES } from "@/config";
import { db } from "@/lib/db";


export async function exchangeAccessCodeForCredentials(data: OAuthTokenExchangeRequestParams) {
    const payload = buildOAuth2RequestPayload(data);

    try {
        return await axios.post<OAuth2CredentialsResponse>(DISCORD_API_ROUTES.OAUTH2_TOKEN, payload, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
    } catch (e) {
        console.log(`[ERROR] Error exchanging access code for credentials`, e);
        return null;
    }
}

export async function getUserDetails(accessToken: string) {
    return await axios.get<OAuth2UserResponse>(DISCORD_API_ROUTES.OAUTH2_USER, authHeaders(accessToken));
}


export function encryptTokens(accessToken: string, refreshToken: string): EncrypyedTokens {
    return {
        accessToken: encryptToken(accessToken).toString(),
        refreshToken: encryptToken(refreshToken).toString()
    }
}

export async function createUser(params: CreateUserParams) {
    const existingUser = await db.user.findUnique({
        where: {
            userId: params.id
        }
    });

    if (!existingUser) {
        try {
            const newUser = await db.user.create({
                data: {
                    userId: params.id,
                    accessToken: params.accessToken,
                    refreshToken: params.refreshToken
                }
            });
            return newUser;
        } catch (e) {
            console.log(`[ERROR] Error creating user`, e);
            return null;
        }
    } else {
        try {
            const updatedUser = await db.user.update({
                where: {
                    userId: params.id
                },
                data: {
                    accessToken: params.accessToken,
                    refreshToken: params.refreshToken
                }
            });

            return updatedUser;
        } catch (e) {
            console.log(`[ERROR] Error updating user`, e);
            return null;
        }
    }
}