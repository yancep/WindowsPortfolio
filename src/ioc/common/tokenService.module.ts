import {
  TokenService,
  TokenServiceImpl,
  TokenServiceSymbols,
} from '@/src/core/services/token/token.service';
import { ContainerModule, interfaces } from 'inversify';
import { applyDependencies } from '@/src/ioc/utils/applyDependencies';

const initializeTokenServiceModule = (bind: interfaces.Bind) => {
  bind<TokenService>(TokenServiceSymbols.TOKEN_SERVICE).toConstantValue(
    applyDependencies(TokenServiceImpl),
  );
};

export const TokenServiceModule = new ContainerModule(
  initializeTokenServiceModule,
);
