# Translate VTT

오디오 파일(wav)을 `whisper` + `chat gpt`로 번역하는 프로그램 레포지터리.

### To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

### TODO

- [] ffmpeg 과정 추가
- [] sample + sample result 폴더가 없는 경우에는 자동으로 만들어지는 코드 작성

### 전처리 과정

음성을 열화시켜서 배경을을 줄이는 과정을 통한 추출률 상승 (너무 없애도 할루시네이션 문제가 발생하게 됨.)
모델의 경우 `GPU 메모리`가 10GB이하의 경우 `medium`를 사용하는게 좋아 보입니다.

- 1. ffmpeg -i audio.wav -af "highpass=f=200, lowpass=f=3000" cleaned_audio.wav
- 2. whisper cleaned_audio.wav --model large-v2 --language Japanese --temperature 0.2 --output_format vtt

### 참고 URL

- [audio 분리(전처리) 과정을 통한 더 좋은 오디오 추출 에 관한 글](https://medium.com/@developerjo0517/audio-pre-processings-for-better-results-in-the-transcription-pipeline-bab1e8f63334)
- [WSL2 CUDA 설치](https://velog.io/@cjkangme/WSL2%EB%A1%9C-CUDA-%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-CUDAcuDNN-%EC%84%A4%EC%B9%98%EA%B9%8C%EC%A7%80)
- [openai-whispe pypi 문서](https://pypi.org/project/openai-whisper/)
