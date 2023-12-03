export class DateError extends Error {
  name: string;
  message: string;

  constructor({ name, message }: { name: string; message: string }) {
    super();
    (this.name = name), (this.message = message);
  }
}
