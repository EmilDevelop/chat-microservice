import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [UsecasesProxyModule.register(), UsecasesProxyModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ControllerModule {}
