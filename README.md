To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000

```
 ffmpeg -i audio.wav -af  "highpass=f=200, lowpass=f=3000" cleaned_audio.wav
 whisper trim_clean.wav --model large-v2 --language Japanese --temperature 0.2 --output_format vtt

```

### 전처리 과정

### 참고 URL

- [audio 전처리 과정을 통한 더 좋은 오디오 추출 에 관한 글](https://medium.com/@developerjo0517/audio-pre-processings-for-better-results-in-the-transcription-pipeline-bab1e8f63334)
- [WSL2 CUDA 설치](https://velog.io/@cjkangme/WSL2%EB%A1%9C-CUDA-%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-CUDAcuDNN-%EC%84%A4%EC%B9%98%EA%B9%8C%EC%A7%80)
- [openai-whispe pypi 문서](https://pypi.org/project/openai-whisper/)
