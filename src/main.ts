import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["https://posfrontend-one.vercel.app/", process.env.FRONTEND_URL], // You can specify your frontend URL here, e.g., 'http://localhost:3000' or an array of URLs
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
