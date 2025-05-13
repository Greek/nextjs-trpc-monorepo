export class HelloWorldModule {
  constructor() {

  }
  
  public static build() {
    return new HelloWorldModule();
  }

  public getName(input: string) {
    return `Hello ${input}! What's up?`
  }
}