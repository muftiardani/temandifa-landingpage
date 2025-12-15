import { describe, it, expect } from "vitest";
import {
  fadeIn,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  scaleIn,
  viewportOptions,
  defaultTransition,
  reducedTransition,
  getMotionVariant,
  getTransition,
  reducedFadeIn,
} from "@/styles/animations";

describe("Animation Variants", () => {
  describe("fadeIn", () => {
    it("should have correct initial state", () => {
      expect(fadeIn.initial).toEqual({ opacity: 0 });
    });

    it("should have correct animate state", () => {
      expect(fadeIn.animate).toEqual({ opacity: 1 });
    });
  });

  describe("fadeInUp", () => {
    it("should have correct initial state", () => {
      expect(fadeInUp.initial).toEqual({ opacity: 0, y: 60 });
    });

    it("should have correct animate state", () => {
      expect(fadeInUp.animate).toEqual({ opacity: 1, y: 0 });
    });
  });

  describe("fadeInLeft", () => {
    it("should have correct initial state", () => {
      expect(fadeInLeft.initial).toEqual({ opacity: 0, x: -60 });
    });

    it("should have correct animate state", () => {
      expect(fadeInLeft.animate).toEqual({ opacity: 1, x: 0 });
    });
  });

  describe("fadeInRight", () => {
    it("should have correct initial state", () => {
      expect(fadeInRight.initial).toEqual({ opacity: 0, x: 60 });
    });

    it("should have correct animate state", () => {
      expect(fadeInRight.animate).toEqual({ opacity: 1, x: 0 });
    });
  });

  describe("scaleIn", () => {
    it("should have correct initial state", () => {
      expect(scaleIn.initial).toEqual({ opacity: 0, scale: 0.8 });
    });

    it("should have correct animate state", () => {
      expect(scaleIn.animate).toEqual({ opacity: 1, scale: 1 });
    });
  });

  describe("staggerContainer", () => {
    it("should have correct animate transition", () => {
      expect(staggerContainer.animate).toBeDefined();
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

  describe("Transition Presets", () => {
    it("should have correct default transition", () => {
      expect(defaultTransition).toEqual({
        duration: 0.6,
        ease: "easeOut",
      });
    });

    it("should have correct reduced transition", () => {
      expect(reducedTransition).toEqual({
        duration: 0,
      });
    });
  });

  describe("Reduced Motion Helpers", () => {
    it("getMotionVariant should return reduced variant when shouldReduce is true", () => {
      const result = getMotionVariant(true, fadeInUp);
      expect(result).toEqual(reducedFadeIn);
    });

    it("getMotionVariant should return original variant when shouldReduce is false", () => {
      const result = getMotionVariant(false, fadeInUp);
      expect(result).toEqual(fadeInUp);
    });

    it("getTransition should return reduced transition when shouldReduce is true", () => {
      const result = getTransition(true);
      expect(result).toEqual(reducedTransition);
    });

    it("getTransition should return default transition when shouldReduce is false", () => {
      const result = getTransition(false);
      expect(result).toEqual(defaultTransition);
    });
  });
});
