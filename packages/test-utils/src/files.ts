function dataURLtoFile(dataurl: string, filename: string): File {
  const parts = dataurl.split(',');
  const mimeParts = parts[0].match(/:(.*?);/);
  const mime = mimeParts ? mimeParts[1] : '';
  const bstr = atob(parts[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export const textFile = dataURLtoFile(
  'data:text/plain;base64,TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4=',
  'text.txt',
);

export const imageFile = dataURLtoFile(
  'data:image/jpeg;base64,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',
  'image.jpeg',
);

export const weblocFile = dataURLtoFile(
  'data:application/octate-stream;base64,YnBsaXN0MDDigJQBAlNVUkxfECFodHRwczovL3d3dy50d2l0Y2gudHYvdDkwb2ZmaWNpYWwICw8AAAAAAAABAQAAAAAAAAADAAAAAAAAAAAAAAAAAAAAMw==',
  'example.webloc',
);

const createFileList = (files: File[]): FileList => {
  const fileList = {
    length: files.length,
    item(index: number): File {
      // @ts-ignore
      return fileList[index];
    },
  };
  files.forEach((file, index) => {
    // @ts-ignore
    fileList[index] = file;
  });

  return fileList as unknown as FileList;
};

/**
 * Creates a new data transfer object.
 * @param data - The data to include in the data transfer object.
 * @param files - The files to include in the data transfer object.
 * @returns The data transfer object.
 */
export const createDataTransfer = (
  data: Record<string, string>,
  files: File[] = [],
): DataTransfer => {
  const dataTransfer = {
    types: Object.keys(data),
    data,
    getData: (key: string) => dataTransfer.data[key],
    files: createFileList(files),
  };

  return dataTransfer as unknown as DataTransfer;
};
