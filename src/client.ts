import { RestClient } from 'typed-rest-client';

/** Client */
export class Client {

    /** Rest Client */
    restClient: RestClient;

    constructor(
        private readonly baseUrl: string,
        private readonly userAgent = 'node-tp-link-powerline'
    ) {
        this.restClient = new RestClient(userAgent, baseUrl);
    }


}