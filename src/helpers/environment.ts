// Packages
import dotenv from 'dotenv';

dotenv.config();

/**
 * Static methods for retrieving environment variables.
 */
export class Environment {
  /**
   * Retrieves Chess.com username.
   *
   * @returns {string} Chess.com username.
   */
  static getChessUsername(): string {
    return process.env.CHESS_COM_USERNAME || '#';
  }

  /**
   * Retrieves server environment.
   *
   * @returns {string} Server environment.
   */
  static getEnvironment(): string {
    return process.env.NODE_ENV || 'development';
  }

  /**
   * Whether to use mock data.
   *
   * @returns {boolean}  Whether to use mock data.
   */
  static useMockData(): boolean {
    return process.env.MOCK_DATA === 'true';
  }
}
