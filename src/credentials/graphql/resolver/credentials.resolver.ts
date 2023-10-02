import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { CredentialsService } from '../../credentials.service';
import { Credentials } from '../types/credentials.type';
import { RecoveryCredentialsInput } from '../input/recovery-credentials.input';
import { VerificationCode } from '@/global/graphql/types/sign-up-verification-code.type';
import { VerificationCodeInput } from '@/global/graphql/input/verification-code.input';
import { RecoveryAccount } from '../types/recovery-account.type';
import { UpdateCredentialsInput } from '../input/update-credentials.input';
import { CredentialsResponse } from '../types/credentials-response.type';
import { Status, customException } from '@/global/constant/constants';
import { Role } from '@prisma/client';
import { RolesGuard } from '@/global/guard/roles.guard';
import { JwtAuthGuard } from '@/global/guard/jwt-auth.guard';
import { Roles } from '@/global/decorator/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { NotificationService } from '@/notification/notification.service';

@Resolver(() => Credentials)
export class CredentialsResolver {
  constructor(
    private readonly credentialservice: CredentialsService,
    private readonly notificationService: NotificationService,
  ) {}

  @Query(() => Credentials)
  findCredentialsById(person_id: string) {
    return this.credentialservice.findById(person_id);
  }

  @Mutation(() => VerificationCode)
  async recoveryPasswordSendVerificationCode(
    @Args('recoveryCredentialsInput')
    recoveryCredentialsInput: RecoveryCredentialsInput,
  ): Promise<VerificationCode> {
    const { email } = recoveryCredentialsInput;
    const room =
      await this.notificationService.sendPasswordRecoveryVerificationCode(
        email,
      );
    return { room };
  }

  @Mutation(() => RecoveryAccount)
  async recoveryAccount(
    @Args('verificationCodeInput') verificationCodeInput: VerificationCodeInput,
  ): Promise<RecoveryAccount> {
    const { room, verificationCode } = verificationCodeInput;
    return await this.credentialservice.verificationCode(
      verificationCode,
      room,
    );
  }

  @Mutation(() => CredentialsResponse)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateCredentialsRecoveryAccount(
    @Args('updateCredentialsInput')
    updateCredentialsInput: UpdateCredentialsInput,
    @Context() context,
  ): Promise<CredentialsResponse> {
    if (
      context.req.user.password != undefined ||
      context.req.user.password != null
    )
      throw customException.FORBIDDEN(null);
    const result = await this.credentialservice.updateCredentials(
      updateCredentialsInput,
      context.req.user.sub,
    );

    return result ? { result: Status.COMPLETED } : { result: Status.FAILED };
  }

  @Mutation(() => CredentialsResponse)
  @Roles(Role.ADMIN, Role.CLINIC_OWNER, Role.PET_OWNER, Role.VETERINARIAN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateCredentials(
    @Args('updateCredentialsInput')
    updateCredentialsInput: UpdateCredentialsInput,
    @Context() context,
  ): Promise<CredentialsResponse> {
    const result = await this.credentialservice.updateCredentials(
      updateCredentialsInput,
      context.req.user.sub,
    );

    return result ? { result: Status.COMPLETED } : { result: Status.FAILED };
  }
}
