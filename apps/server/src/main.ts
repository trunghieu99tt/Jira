import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './configuration/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
bootstrap();
