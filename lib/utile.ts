/** vtt second 를 vtt 형식으려 변환 시켜주는 함수, */
export function formatTime(seconds: number) {
  const date = new Date(0);
  date.setSeconds(seconds);
  return (
    date.toISOString().substr(11, 8) +
    "." +
    Math.floor((seconds % 1) * 1000)
      .toString()
      .padStart(3, "0")
  );
}
