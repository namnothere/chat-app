import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('streaming')
export class StreamingController {
    @Get(':id')
    async getFile(@Param('id') id: string) {
        const file = createReadStream(join(process.cwd(), 'package.json'));
        const videoPath = join(process.cwd(), 'video.mp4');
        return new StreamableFile(file);
    }
}
