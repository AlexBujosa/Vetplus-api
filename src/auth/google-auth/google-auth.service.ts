import { SignUpInput } from '@/auth/graphql/inputs/sign-up.input';
import { SignInResponse } from '@/auth/graphql/types/sign-in-result.type';
import { customException } from '@/global/constant/constants';
import { UserService } from '@/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthProvider } from '@prisma/client';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export class GoogleAuthService {
  private readonly client: OAuth2Client;
  private readonly provider: AuthProvider = 'GOOGLE';
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  }

  async verifyIdToken(token: string): Promise<TokenPayload> {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      return payload;
    } catch (error) {
      throw customException.INVALID_TOKEN(null);
    }
  }

  async getUserProfile(token: string) {
    try {
      // If you want to fetch more details, make an additional API call
      const { data } = await this.client.request({
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // User profile data will be in the 'data' object
      console.log(data);

      return data; // Return user profile
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  async socialRegister(signUpInput: SignUpInput): Promise<SignInResponse> {
    signUpInput.provider = this.provider;
    const result = await this.userService.create(signUpInput);
    return {
      access_token: this.jwtService.sign({
        username: result.email,
        sub: result.id,
        role: result.role,
      }),
    };
  }
}
