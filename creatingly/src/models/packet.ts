

export class Packet {

  constructor(readonly messageId: string,
              readonly content: string,
              readonly index: number,
              readonly total:number,
  ) {
  }

}
