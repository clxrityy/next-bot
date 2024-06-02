import { OAuthTokenExchangeRequestParams } from "@/types";
import { AxiosRequestConfig } from "axios";
import url from "url";
import CryptoJS from "crypto-js";
import { ENCRYPTION_KEY } from "@/config";

export const buildOAuth2RequestPayload = (data: OAuthTokenExchangeRequestParams) => new url.URLSearchParams(data).toString();

export const authHeaders = (accessToken: string): AxiosRequestConfig => ({
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
});

export const encryptToken = (token: string) => CryptoJS.AES.encrypt(token, ENCRYPTION_KEY);