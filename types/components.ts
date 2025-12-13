/**
 * Component Prop Type Definitions
 * Centralized type definitions for component props
 */

import { ReactNode } from 'react';

/**
 * Base Component Props
 * Common props for all components
 */
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Button Variant Types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button Props
 */
export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Theme Types
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Locale Types
 */
export type Locale = 'id' | 'en';

/**
 * Loading State Props
 */
export interface LoadingProps {
  isLoading: boolean;
  message?: string;
}

/**
 * Error State Props
 */
export interface ErrorProps {
  error?: Error | string;
  onRetry?: () => void;
}

/**
 * Breadcrumb Item
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

/**
 * Feature Card Props
 */
export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

/**
 * SEO Metadata
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}
