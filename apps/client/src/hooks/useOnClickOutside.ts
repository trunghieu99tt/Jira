import useDeepCompareMemoize from '@utils/deepCompareMemoize';
import { RefObject, useEffect, useRef } from 'react';

const useOnOutsideClick = (
  $ignoredElementRefs: RefObject<any>,
  isListening: boolean,
  onOutsideClick: any,
  $listeningElementRef?: RefObject<any>,
) => {
  const $mouseDownTargetRef = useRef<RefObject<any>>();
  const $ignoredElementRefsMemoized = useDeepCompareMemoize(
    [$ignoredElementRefs].flat(),
  );

  useEffect(() => {
    const handleMouseDown = (event: any) => {
      if ($mouseDownTargetRef?.current && event?.target) {
        $mouseDownTargetRef.current = event.target;
      }
    };

    const handleMouseUp = (event: MouseEvent) => {
      const isAnyIgnoredElementAncestorOfTarget = (
        $ignoredElementRefsMemoized as any
      )?.some(
        ($elementRef: RefObject<any>) =>
          $elementRef?.current?.contains($mouseDownTargetRef.current) ||
          $elementRef?.current?.contains(event.target),
      );
      if (event.button === 0 && !isAnyIgnoredElementAncestorOfTarget) {
        onOutsideClick();
      }
    };

    const $listeningElement = ($listeningElementRef || {}).current || document;

    if (isListening) {
      $listeningElement.addEventListener('mousedown', handleMouseDown);
      $listeningElement.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      $listeningElement.removeEventListener('mousedown', handleMouseDown);
      $listeningElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    $ignoredElementRefsMemoized,
    $listeningElementRef,
    isListening,
    onOutsideClick,
  ]);
};

export default useOnOutsideClick;
