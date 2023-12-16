import { createElement } from "react";
import { ContentItem } from "@simple-builder/server";

import type { Component } from "~/types";

export const builder = (() => {
  const components: Component[] = [];

  return {
    register: (component: any, config: Omit<Component, "component">) => {
      if (components.find(({ name }) => name === config.name)) {
        console.log(
          `[simple-builder]: Component ${config.name} already registered.`,
        );
        return;
      }

      components.push({
        component,
        ...config,
      });
    },

    getComponents: () => components,

    getComponent: (name: string) => {
      return components.find((c) => c.name === name);
    },

    bindComponent: ({ content, ...block }: ContentItem, edit?: boolean) => {
      const component = components.find(({ name }) => name === block.component);

      if (!component) {
        throw new Error(
          `[simple-builder]: Component ${block.component} not found`,
        );
      }

      const Element = createElement(component.component, {
        key: block.id,
        builder: { id: block.id, content, edit },
        ...block.props,
      });

      return Element;
    },
  };
})();

// class Builder {

//   private components: Component[] = [];

//   constructor() {
//     this.instance = Math.random().toString(36).substr(2, 9);
//   }

//   public registerComponent(
//     component: Component["component"],
//     config: Omit<Component, "component">,
//   ) {
//     console.log(
//       `[simple-builder]: Registering component ${config.name} on instance ${this.instance}`,
//     );

//     if (this.components.find(({ name }) => name === config.name)) {
//       console.log(
//         `[simple-builder]: Component ${config.name} already registered.`,
//       );
//       return;
//     }

//     this.components.push({
//       component,
//       ...config,
//     });
//   }

//   public getComponents() {
//     return this.components;
//   }

//   public getComponent(name: string) {
//     const component = this.components.find((c) => c.name === name);

//     if (!component) {
//       throw new Error(`Component ${name} not found.`);
//     }

//     return component;
//   }

//   public getInputs(name: string) {
//     const config = this.getComponent(name);
//     return config.inputs;
//   }

//   public bindComponent(block: Block) {
//     console.log(
//       `Binding component ${block.component} on instance ${this.instance}`,
//     );

//     const component = this.components.find(
//       ({ name }) => name === block.component,
//     );

//     if (!component) {
//       throw new Error(
//         `[simple-builder]: Component ${block.component} not found`,
//       );
//     }

//     const Element = createElement(component.component, {
//       key: block.id,
//       builder: { parent: block.id },
//       ...block.props,
//       style: block.styles,
//     });

//     return Element;
//   }
// }

// const builder = new Builder();

// export { builder };
