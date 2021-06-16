/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-env node */
import { JsonRpcProvider } from "@ethersproject/providers";
import { Eip1193Bridge } from "@ethersproject/experimental";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to visit a url with an unlocked and authorized account.
       * @example cy.visitWithAccount('/')
       */
      visitWithAccount(
        url: string,
        options?: Partial<Cypress.VisitOptions>
      ): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("visitWithAccount", (url, options) => {
  return cy.visit(url, {
    ...options,
    onBeforeLoad(win) {
      // Hardhat forked testnet
      const provider = new JsonRpcProvider("http://localhost:8545");

      // Use our own fixed bridge
      // @ts-ignore
      const bridge = new Eip1193Bridge(provider.getSigner(), provider);

      // Mock out the Metamask global obj
      // @ts-ignore
      win.ethereum = bridge;
    },
  });
});
