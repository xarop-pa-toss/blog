import { Injectable, OnModuleInit } from '@nestjs/common';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { generateBackgroundImage } from './bg-img-gen';

@Injectable()
export class AppService {
	async criarBG() {
		await this.criarEGravarBackground()
		return
   	};
	
	private async criarEGravarBackground() {
		mkdirSync(join(__dirname, '..', 'public', 'bg-images'), { recursive: true });
			const bgImage = generateBackgroundImage({
			width: 1920,
			height: 1080,
			gridDivisions: 64,
			minStarSizePerc: 0.01,
			maxStarSizePerc: 0.10,
			showGrid: true
			});
			writeFileSync(join(__dirname, '..', 'public', 'bg-images', 'bg.png'), bgImage);
	}        
	
	getHello(): string {
		return 'Hello World!';
	}
}

