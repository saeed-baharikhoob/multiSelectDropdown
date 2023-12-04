import React, { useEffect } from 'react';

const useOutsideAlerter = <T extends HTMLElement>(
    ref: React.RefObject<T>,
    onOutsideClick: () => void
): void => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onOutsideClick();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [ref, onOutsideClick]);
};

export default useOutsideAlerter;