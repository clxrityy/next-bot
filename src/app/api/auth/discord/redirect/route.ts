import { CLIENT_APPLICATION_ID, CLIENT_SECRET, REDIRECT_URI } from "@/config";
import { createUser, encryptTokens, exchangeAccessCodeForCredentials, getUserDetails } from "@/utils/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code");

    if (code) {
        try {
            const response = await exchangeAccessCodeForCredentials({
                client_id: CLIENT_APPLICATION_ID,
                client_secret: CLIENT_SECRET,
                grant_type: "authorization_code",
                code: code.toString(),
                redirect_uri: REDIRECT_URI
            });

            const { access_token, refresh_token } = response!.data;

            const { data: user } = await getUserDetails(access_token);
            const { id } = user;

            const tokens = encryptTokens(access_token, refresh_token);

            const newUser = await createUser({ id: id, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });

            return NextResponse.json(newUser);
        } catch (e: any) {
            console.log(`[ERROR] API Error: ${e.message}`);

            return NextResponse.json({
                status: 400
            });
        }
    }

}