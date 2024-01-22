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
      desktop: {
        padding: "32px 0",
        "border-radius": "32px",
        overflow: "hidden",
      },
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
      {
        type: "grouped",
        name: "link",
        multiple: true,
        friendlyName: "Knop met link",
        defaultValue: [
          {
            label: "Lees meer",
            href: "/",
          },
        ],
        inputs: [
          {
            type: "string",
            name: "label",
            friendlyName: "Label",
          },
          {
            type: "string",
            name: "href",
            friendlyName: "Link",
          },
          {
            type: "color",
            name: "bg",
            friendlyName: "Achtergrond",
          },
          {
            type: "boolean",
            name: "desc",
            friendlyName: "Ja of Nee",
          },
        ],
      },
    ],
    defaultStyles: {
      desktop: {
        color: "#ffffff",
        background: "#cecece",
        // margin: "0 32px",
        // padding: "0 24px",
        "border-radius": "25px",
        overflow: "hidden",
      },
      // mobile: {
      //   "border-radius": "0px",
      //   padding: "0px",
      //   margin: "0px",
      // },
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
