import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
    async processIndex(index: string): Promise<{ index: number }> {
        const delay = Math.floor(Math.random() * 1000) + 1;

        await new Promise((res) => setTimeout(res, delay));

        return { index: Number(index) };
    }
}
