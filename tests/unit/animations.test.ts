import { describe, it, expect } from "vitest";
import {
  fadeIn,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  scaleIn,
  viewportOptions,
} from "@/styles/animations";

describe("Animation Variants", () => {
  describe("fadeIn", () => {
    it("should have correct initial state", () => {
      expect(fadeIn.initial).toEqual({ opacity: 0 });
    });

    it("should have correct animate state", () => {
      expect(fadeIn.animate).toEqual({ opacity: 1 });
    });

    it("should have correct transition", () => {
      expect(fadeIn.transition).toEqual({ duration: 0.8, ease: "easeOut" });
    });
  });

  describe("fadeInUp", () => {
    it("should have correct initial state", () => {
      expect(fadeInUp.initial).toEqual({ opacity: 0, y: 60 });
    });

    it("should have correct animate state", () => {
      expect(fadeInUp.animate).toEqual({ opacity: 1, y: 0 });
    });

    it("should have correct transition", () => {
      expect(fadeInUp.transition).toEqual({ duration: 0.6, ease: "easeOut" });
    });
  });

  describe("fadeInLeft", () => {
    it("should have correct initial state", () => {
      expect(fadeInLeft.initial).toEqual({ opacity: 0, x: -60 });
    });

    it("should have correct animate state", () => {
      expect(fadeInLeft.animate).toEqual({ opacity: 1, x: 0 });
    });

    it("should have correct transition", () => {
      expect(fadeInLeft.transition).toEqual({
        duration: 0.6,
        ease: "easeOut",
      });
    });
  });

  describe("fadeInRight", () => {
    it("should have correct initial state", () => {
      expect(fadeInRight.initial).toEqual({ opacity: 0, x: 60 });
    });

    it("should have correct animate state", () => {
      expect(fadeInRight.animate).toEqual({ opacity: 1, x: 0 });
    });

    it("should have correct transition", () => {
      expect(fadeInRight.transition).toEqual({
        duration: 0.6,
        ease: "easeOut",
      });
    });
  });

  describe("scaleIn", () => {
    it("should have correct initial state", () => {
      expect(scaleIn.initial).toEqual({ opacity: 0, scale: 0.8 });
    });

    it("should have correct animate state", () => {
      expect(scaleIn.animate).toEqual({ opacity: 1, scale: 1 });
    });

    it("should have correct transition", () => {
      expect(scaleIn.transition).toEqual({ duration: 0.5, ease: "easeOut" });
    });
  });

  describe("staggerContainer", () => {
    it("should have correct animate transition", () => {
      expect(staggerContainer.animate.transition).toEqual({
        staggerChildren: 0.1,
        delayChildren: 0.2,
      });
    });
  });

  describe("viewportOptions", () => {
    it("should have correct once option", () => {
      expect(viewportOptions.once).toBe(true);
    });

    it("should have correct margin option", () => {
      expect(viewportOptions.margin).toBe("-100px");
    });
  });
});
