import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EngineerModule } from './resources/engineer/engineer.module';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './resources/auth/auth.module';
import { AddressModule } from './resources/address/address.module';
import { ClinicModule } from './resources/clinic/clinic.module';
import { CategoryModule } from './resources/category/category.module';
import { InstrumentModule } from './resources/instrument/instrument.module';
import { VendorModule } from './resources/vendor/vendor.module';
import { ModelModule } from './resources/model/model.module';
import { NoteModule } from './resources/note/note.module';
import { VerificationModule } from './resources/verification/verification.module';
import { ContactModule } from './resources/contact/contact.module';
import { JwtService } from '@nestjs/jwt';
import { PlanningModule } from './resources/planning/planning.module';

@Module({
  imports: [
    EngineerModule,
    AuthModule,
    AddressModule,
    ClinicModule,
    CategoryModule,
    InstrumentModule,
    VendorModule,
    ModelModule,
    NoteModule,
    VerificationModule,
    ContactModule,
    PlanningModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtService,
  ],
})
export class AppModule {}
