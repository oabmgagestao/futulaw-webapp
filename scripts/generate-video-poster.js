/**
 * Script para gerar um poster image do primeiro frame do vídeo
 * e uma versão tiny blur placeholder em Base64
 * 
 * Execute: node scripts/generate-video-poster.js
 */

import sharp from 'sharp';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const VIDEO_PATH = 'public/videos/gavel_scrub.mp4';
const POSTER_OUTPUT = 'public/videos/gavel_poster.jpg';
const TEMP_FRAME = '/tmp/first_frame.png';

async function generatePoster() {
  console.log('Extracting first frame from video...');
  
  try {
    // Extract first frame using ffmpeg (if available)
    execSync(`ffmpeg -i ${VIDEO_PATH} -vframes 1 -q:v 2 ${TEMP_FRAME} -y`, { 
      stdio: 'pipe' 
    });
    
    // Create optimized JPEG poster
    await sharp(TEMP_FRAME)
      .resize(1920, 1080, { fit: 'cover' })
      .jpeg({ quality: 85, progressive: true })
      .toFile(POSTER_OUTPUT);
    
    console.log(`✓ Poster saved to: ${POSTER_OUTPUT}`);
    
    // Generate tiny blur placeholder (20px wide for ~1KB Base64)
    const blurBuffer = await sharp(TEMP_FRAME)
      .resize(50, 30, { fit: 'cover' })
      .blur(2)
      .jpeg({ quality: 40 })
      .toBuffer();
    
    const base64 = `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;
    console.log('\n✓ Blur placeholder Base64 (copy this to VIDEO_BLUR_PLACEHOLDER):');
    console.log(base64);
    
    // Cleanup
    fs.unlinkSync(TEMP_FRAME);
    
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nNote: This script requires ffmpeg to be installed.');
    console.log('You can also manually create a screenshot of the first frame.');
  }
}

generatePoster();
