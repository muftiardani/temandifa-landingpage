/**
 * Logger Service
 * Centralized logging with environment-aware behavior
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  enableDebug: boolean;
  enableInfo: boolean;
}

class Logger {
  private config: LoggerConfig;

  constructor() {
    this.config = {
      isDevelopment: process.env.NODE_ENV === 'development',
      isProduction: process.env.NODE_ENV === 'production',
      enableDebug: process.env.NODE_ENV === 'development',
      enableInfo: process.env.NODE_ENV === 'development',
    };
  }

  /**
   * Format log message with timestamp and context
   */
  private formatMessage(level: LogLevel, message: string, context?: string): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}]` : '';
    return `${timestamp} ${level.toUpperCase()} ${contextStr} ${message}`;
  }

  /**
   * Send logs to external service (optional)
   */
  private sendToExternalService(level: LogLevel, message: string, data?: unknown): void {
    if (!this.config.isProduction) {
      return;
    }

    if (typeof window !== 'undefined' && window.Sentry) {
      if (level === 'error') {
        window.Sentry.captureException(new Error(message));
      } else {
        window.Sentry.addBreadcrumb({
          category: 'log',
          message,
          level: level === 'warn' ? 'warning' : level,
          data: data as Record<string, unknown>,
        });
      }
    }
  }

  /**
   * Debug logs - only in development
   */
  debug(message: string, data?: unknown, context?: string): void {
    if (!this.config.enableDebug) {
      return;
    }

    const formattedMessage = this.formatMessage('debug', message, context);
    console.debug(formattedMessage, data || '');
  }

  /**
   * Info logs - only in development
   */
  info(message: string, data?: unknown, context?: string): void {
    if (!this.config.enableInfo) {
      return;
    }

    const formattedMessage = this.formatMessage('info', message, context);
    console.log(formattedMessage, data || '');
  }

  /**
   * Warning logs - always logged
   */
  warn(message: string, data?: unknown, context?: string): void {
    const formattedMessage = this.formatMessage('warn', message, context);
    console.warn(formattedMessage, data || '');
    this.sendToExternalService('warn', message, data);
  }

  /**
   * Error logs - always logged and sent to external service
   */
  error(message: string, error?: Error | unknown, context?: string): void {
    const formattedMessage = this.formatMessage('error', message, context);
    console.error(formattedMessage, error || '');
    this.sendToExternalService('error', message, error);
  }

  /**
   * Success logs - only in development
   */
  success(message: string, data?: unknown, context?: string): void {
    if (!this.config.enableInfo) {
      return;
    }

    const emoji = '✅';
    const formattedMessage = this.formatMessage('info', `${emoji} ${message}`, context);
    console.log(formattedMessage, data || '');
  }

  /**
   * Group logs - only in development
   */
  group(label: string, callback: () => void): void {
    if (!this.config.enableDebug) {
      callback();
      return;
    }

    console.group(label);
    callback();
    console.groupEnd();
  }

  /**
   * Table logs - only in development
   */
  table(data: unknown): void {
    if (!this.config.enableDebug) {
      return;
    }

    console.table(data);
  }

  /**
   * Time measurement - only in development
   */
  time(label: string): void {
    if (!this.config.enableDebug) {
      return;
    }

    console.time(label);
  }

  /**
   * End time measurement - only in development
   */
  timeEnd(label: string): void {
    if (!this.config.enableDebug) {
      return;
    }

    console.timeEnd(label);
  }
}

export const logger = new Logger();

