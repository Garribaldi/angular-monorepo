export interface ErrorMessage {
  /** Optional message title */
  title?: string;

  /** Text of the message */
  text?: string;

  /** HTTP response status code */
  status?: number;

  /** HTTP response status text */
  statusText?: string;

  /** Inner error exception message */
  innerMessage?: string;

  /** Path from error exception message */
  path?: string;

  /** Url error response */
  url?: string;
}
