import dynamic from "next/dynamic";
import { builder } from "@simple-builder/react";

builder.register(
  dynamic(() => import("../../components/hero").then((mod) => mod.Hero)),
  {
    name: "hero",
    friendlyName: "Hero",
    inputs: [
      {
        type: "string",
        name: "title",
        friendlyName: "Titel",
        defaultValue: "Hello World",
      },
    ],
    defaultStyles: {
      container: false,
      color: "#ffffff",
      background: "#000000",
    },
  },
);

builder.register(
  dynamic(() => import("../../components/columns").then((mod) => mod.Columns)),
  {
    name: "columns",
    friendlyName: "Kolommen",
    inputs: [
      {
        type: "number",
        name: "columns",
        friendlyName: "Aantal kolommen",
        defaultValue: 2,
      },
    ],
  },
);
