import { FileNodeRendererProps, useApi } from '@minddrop/extension';
import { useEffect, useMemo, useState } from 'react';

export const ImageNodeRenderer: React.FC<FileNodeRendererProps> = ({
  node,
}) => {
  const { Fs } = useApi();
  const [imageAvailable, setImageAvailable] = useState(true);

  const src = useMemo(
    () => (node.path ? Fs.convertFileSrc(node.path) : null),
    [node.path, Fs],
  );

  // When adding a new image, it occasionally takes a moment
  // for the image to be available. This effect checks if the
  // image is available. If not, it will try again after a
  // timeout.
  useEffect(() => {
    var tester = new Image();

    function imageFound() {
      setImageAvailable(true);

      tester.removeEventListener('load', imageFound);
      tester.removeEventListener('error', imageNotFound);
    }

    function imageNotFound() {
      setImageAvailable(false);

      setTimeout(() => {
        setImageAvailable(true);
        tester.removeEventListener('load', imageFound);
        tester.removeEventListener('error', imageNotFound);
      });
    }

    tester.addEventListener('load', imageFound);
    tester.addEventListener('error', imageNotFound);

    if (src) {
      tester.src = src;
    }

    return () => {
      tester.removeEventListener('load', imageFound);
      tester.removeEventListener('error', imageNotFound);
    };
  }, [src]);

  if (!src) {
    return null;
  }

  if (!imageAvailable) {
    return null;
  }

  return (
    <img
      src={src}
      alt={node.path?.split('/').pop()}
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    />
  );
};
