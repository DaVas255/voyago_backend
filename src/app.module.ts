import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GoogleRecaptchaModule } from "@nestlab/google-recaptcha";

import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { getGoogleRecaptchaConfig } from "./config/google-recaptcha.config";
import { OrderModule } from "./orders/order.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GoogleRecaptchaModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getGoogleRecaptchaConfig,
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    OrderModule,
  ],
})
export class AppModule { }
