import { BuildContainerProps } from "@simple-builder/react";

type DemoProps = {
  date?: Date;
  color?: string;
  number?: number;
  file?: string;
  long?: string;
  rich?: string;
} & BuildContainerProps;

export const Demo = (props: DemoProps) => {
  return (
    <div>
      Datum: {JSON.stringify(props.date, null, 2)}
      <br />
      Kleur: {props.color}
      <br />
      Nummer: {props.number}
      <br />
      Omschrijving: {props.long}
      <br />
      Rich omschrijving: {props.rich}
      <br />
      {props.file && <img src={props.file} />}
    </div>
  );
};
