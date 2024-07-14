class Logger {
  private static colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',

    fg: {
      black: '\x1b[30m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
      crimson: '\x1b[38m',
    },
    bg: {
      black: '\x1b[40m',
      red: '\x1b[41m',
      green: '\x1b[42m',
      yellow: '\x1b[43m',
      blue: '\x1b[44m',
      magenta: '\x1b[45m',
      cyan: '\x1b[46m',
      white: '\x1b[47m',
      crimson: '\x1b[48m',
    },
  };

  static log(...args: any[]) {
    console.log(`${this.colors.fg.blue}`, ...args, `${this.colors.reset}`);
  }

  static error(...args: any[]) {
    console.error(`${this.colors.fg.red}`, ...args, `${this.colors.reset}`);
  }

  static warn(...args: any[]) {
    console.warn(`${this.colors.fg.yellow}`, ...args, `${this.colors.reset}`);
  }

  static debug(...args: any[]) {
    console.debug(`${this.colors.fg.cyan}`, ...args, `${this.colors.reset}`);
  }

  static verbose(...args: any[]) {
    console.log(`${this.colors.fg.magenta}`, ...args, `${this.colors.reset}`);
  }

  static success(...args: any[]) {
    console.log(`${this.colors.fg.green}`, ...args, `${this.colors.reset}`);
  }
}

export { Logger };
