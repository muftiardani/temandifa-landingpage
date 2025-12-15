"use client";

import { useEffect, useRef, useCallback } from "react";

const FOCUSABLE_ELEMENTS = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  isActive: boolean
) {
  const containerRef = useRef<T>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)
    ).filter((el) => {
      return (
        el.offsetParent !== null &&
        !el.hasAttribute("disabled") &&
        el.getAttribute("tabindex") !== "-1"
      );
    });
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    },
    [getFocusableElements]
  );

  useEffect(() => {
    if (!isActive) {
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
        previousActiveElement.current = null;
      }
      return;
    }

    previousActiveElement.current = document.activeElement as HTMLElement;

    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      requestAnimationFrame(() => {
        focusableElements[0].focus();
      });
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, getFocusableElements, handleKeyDown]);

  return containerRef;
}

export function useFocusTrapWithToggle<T extends HTMLElement = HTMLElement>(
  isActive: boolean,
  toggleButtonRef: React.RefObject<HTMLElement | null>
) {
  const containerRef = useFocusTrap<T>(isActive);

  useEffect(() => {
    if (!isActive && toggleButtonRef.current) {
      toggleButtonRef.current.focus();
    }
  }, [isActive, toggleButtonRef]);

  return containerRef;
}
