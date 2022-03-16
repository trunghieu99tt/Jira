import { Injectable } from '@nestjs/common';
import { create } from 'ipfs-http-client';
import {
  INFURA_HOST,
  INFURA_PORT,
  INFURA_PROJECT_ID,
  INFURA_PROJECT_SECRET,
  INFURA_PROTOCOL,
} from 'src/configuration/env';

const GATE_WAYS = {
  INFURA: 'infura',
};

@Injectable()
export class IpfsUploadService {
  clients: {
    [key: string]: any;
  };

  constructor() {
    this.clients = {};
    this.clients[GATE_WAYS.INFURA] = this.initInfuraClient();
  }

  private initInfuraClient(): any {
    return create({
      host: INFURA_HOST,
      port: INFURA_PORT,
      protocol: INFURA_PROTOCOL,
      headers: {
        authorization: `Basic ${Buffer.from(
          `${INFURA_PROJECT_ID}:${INFURA_PROJECT_SECRET}`,
        ).toString('base64')}`,
      },
    });
  }

  private getClient(gateWay = GATE_WAYS.INFURA): any {
    return this.clients[gateWay];
  }

  async addFile(file: any, gateWay?: string): Promise<any> {
    const result = await this.getClient(gateWay).add(file);
    return result;
  }

  async getFile(cid: any, gateWay?: string): Promise<any> {
    const result = this.getClient(gateWay).get(cid);
    return result;
  }

  getFileUrl(filePath: string, gateWay = GATE_WAYS.INFURA): string {
    switch (gateWay) {
      case GATE_WAYS.INFURA:
        return `${INFURA_PROTOCOL}://${INFURA_HOST}:/ipfs/${filePath}`;
      default:
        return `${INFURA_PROTOCOL}://${INFURA_HOST}:/ipfs/${filePath}`;
    }
  }
}
