import dynamic from "next/dynamic";
import { builder } from "@simple-builder/react";

builder.register(
  dynamic(() => import("../../components/demo").then((mod) => mod.Demo)),
  {
    name: "demo",
    friendlyName: "Demo",
    inputs: [
      {
        type: "date",
        name: "date",
        friendlyName: "Datum",
      },
      {
        type: "color",
        name: "color",
        friendlyName: "Kleur",
      },
      {
        type: "number",
        name: "number",
        friendlyName: "Nummer",
      },
      {
        type: "longText",
        name: "long",
        friendlyName: "Omschrijving",
      },
      {
        type: "richText",
        name: "rich",
        friendlyName: "Rich Omschrijving",
      },
      {
        type: "file",
        name: "file",
        friendlyName: "Bestand",
      },
    ],
    defaultStyles: {
      padding: "32px 0",
      "border-radius": "32px",
      overflow: "hidden",
    },
  },
);

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
