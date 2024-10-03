self.onmessage = (e) => {
  const { chunk } = e.data;

  const reader = new FileReader();
  reader.onload = () => {
      const view = new Uint8Array(reader.result);
      let linesCount = 0;

      for (let i = 0; i < view.length; i++) {
          if (view[i] === 10) { // '\n'
              linesCount++;
          } else if (view[i] === 13) { // '\r'
              linesCount++;
              if (i + 1 < view.length && view[i + 1] === 10) {
                  i++;
              }
          }
      }

      // отправляем результат обратно в основной поток
      self.postMessage({ linesCount });
  };

  // читаем данные чанка как текст
  reader.readAsArrayBuffer(chunk);
};
