import { createElement } from "react";
import type { ContentItem } from "@simple-builder/server";

import type { Component } from "@/types";

class Builder {
	private static instance: Builder;
	private components: Component[] = [];

	private constructor() {
		// Private constructor to prevent direct instantiation
	}

	public static getInstance(): Builder {
		if (!Builder.instance) {
			Builder.instance = new Builder();
		}
		return Builder.instance;
	}

	public register(
		component: Component["component"],
		config: Omit<Component, "component">,
	): void {
		if (this.components.find(({ name }) => name === config.name)) {
			console.log(
				`[simple-builder]: Component ${config.name} already registered.`,
			);
			return;
		}

		this.components.push({
			component,
			...config,
		});
	}

	public getComponents(): Component[] {
		return this.components;
	}

	public getComponent(name: string): Component | undefined {
		return this.components.find((c) => c.name === name);
	}

	public bindComponent(
		{ content, ...block }: ContentItem,
		edit?: boolean,
	): ReturnType<typeof createElement> {
		const component = this.components.find(
			({ name }) => name === block.component,
		);

		if (!component) {
			throw new Error(
				`[simple-builder]: Component ${block.component} not found`,
			);
		}

		const Element = createElement(component.component, {
			key: block.id,
			builder: { id: block.id, content, edit: !!edit },
			...block.props,
		});

		return Element;
	}
}

export const builder = Builder.getInstance();

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
