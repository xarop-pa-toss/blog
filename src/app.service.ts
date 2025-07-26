import { Injectable, OnModuleInit } from '@nestjs/common';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { generateBackgroundImage } from './bg-img-gen';

@Injectable()
export class AppService implements OnModuleInit{
	async onModuleInit() {
		await this.criarEGravarBackground()
   	};
	
	private async criarEGravarBackground() {
		mkdirSync(join(__dirname, '..', 'public', 'bg-images'), { recursive: true });
			const bgImage = generateBackgroundImage({
			width: 1024,
			height: 768,
			gridDivisions: 64
			});
			writeFileSync(join(__dirname, '..', 'public', 'bg-images', 'bg.png'), bgImage);
	}        
	
	getHello(): string {
		return 'Hello World!';
	}
}

