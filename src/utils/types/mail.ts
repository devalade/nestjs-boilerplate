import { Readable } from 'stream';

/**
 * Available calendar event methods
 */
export type CalendarEventMethod =
  | 'PUBLISH'
  | 'REQUEST'
  | 'REPLY'
  | 'ADD'
  | 'CANCEL'
  | 'REFRESH'
  | 'COUNTER'
  | 'DECLINECOUNTER';

/**
 * Event options accepted by the icalEvent* methods
 */
export type CalendarEventOptions = {
  method?: CalendarEventMethod;
  filename?: string;
  encoding?: string;
};

/**
 * Attachment options
 */
export type AttachmentOptionsNode = {
  filename?: string;
  href?: string;
  httpHeaders?: { [key: string]: any };
  contentType?: string;
  contentDisposition?: string;
  encoding?: string;
  headers?: { [key: string]: any };
};

export type EnvolpeNode = {
  from?: string;
  to?: string;
  cc?: string;
  bcc?: string;
};
export type PostSentEnvolpeNode = { from: string; to: string[] };
/**
 * Shape of the recipient
 */
export type RecipientNode = { address: string; name?: string };

export type MessageContentViewsNode = {
  html?: {
    template: string;
    data?: any;
  };
  text?: {
    template: string;
    data?: any;
  };
  watch?: {
    template: string;
    data?: any;
  };
};

/**
 * Message node is compatible with nodemailer `sendMail` method
 */
export type MessageNode = {
  from?: RecipientNode;
  to?: RecipientNode[];
  cc?: RecipientNode[];
  bcc?: RecipientNode[];
  messageId?: string;
  subject?: string;
  replyTo?: RecipientNode;
  inReplyTo?: string;
  references?: string[];
  encoding?: string;
  priority?: 'low' | 'normal' | 'high';
  envelope?: EnvolpeNode;
  icalEvent?: CalendarEventOptions & {
    content?: string;
    path?: string;
    href?: string;
  };
  attachments?: (AttachmentOptionsNode & {
    path?: string;
    cid?: string;
    content?: Buffer | Readable;
  })[];
  headers?: (
    | {
        [key: string]: string | string[];
      }
    | {
        [key: string]: { prepared: true; value: string | string[] };
      }
  )[];
  html?: string;
  text?: string;
  watch?: string;
};

export interface MessageContract {
  /**
   * Common fields
   */
  to(address: string, name?: string): this;
  from(address: string, name?: string): this;
  cc(address: string, name?: string): this;
  bcc(address: string, name?: string): this;
  messageId(messageId: string): this;
  subject(message: string): this;

  /**
   * Routing options
   */
  replyTo(address: string, name?: string): this;
  inReplyTo(messageId: string): this;
  references(messagesIds: string[]): this;
  envelope(envelope: EnvolpeNode): this;
  priority(priority: 'low' | 'normal' | 'high'): this;

  /**
   * Content options
   */
  encoding(encoding: string): this;
  htmlView(template: string, data?: any): this;
  textView(template: string, data?: any): this;
  watchView(template: string, data?: any): this;
  html(content: string): this;
  text(content: string): this;
  watch(content: string): this;

  /**
   * Attachments
   */
  attach(filePath: string, options?: AttachmentOptionsNode): this;
  attachData(content: Readable | Buffer, options?: AttachmentOptionsNode): this;
  embed(filePath: string, cid: string, options?: AttachmentOptionsNode): this;
  embedData(
    content: Readable | Buffer,
    cid: string,
    options?: AttachmentOptionsNode,
  ): this;

  header(key: string, value: string | string[]): this;
  preparedHeader(key: string, value: string | string[]): this;
}
