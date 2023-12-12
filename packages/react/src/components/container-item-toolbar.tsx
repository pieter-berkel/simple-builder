import * as React from "react";
import { ArrowDown, ArrowUp, Edit2Icon, Trash2Icon } from "lucide-react";

import { useBuilder } from "~/components/context/builder-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button, buttonVariants } from "~/components/ui/button";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

type ContainerItemToolbarProps = {
  contentId: string;
};

export const ContainerItemToolbar = (props: ContainerItemToolbarProps) => {
  const { contentId } = props;

  const { canBringDirection, bringDirection } = useBuilder();

  return (
    <div className="absolute z-20 top-1 right-1 rounded-md shadow flex flex-col gap-1 p-1 bg-sb-card text-sb-card-sb-foreground sb-item-toolbar opacity-0 transition-opacity">
      <div className="h-10 p-1 border border-sb-input bg-sb-background rounded-md text-sm font-medium flex gap-1 items-center justify-start">
        <EditButton contentId={contentId} />
        <Button
          variant="ghost"
          className="w-8 h-8 p-0"
          onClick={() => bringDirection(contentId, "up")}
          disabled={!canBringDirection(contentId, "up")}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          className="w-8 h-8 p-0"
          onClick={() => bringDirection(contentId, "down")}
          disabled={!canBringDirection(contentId, "down")}
        >
          <ArrowDown className="h-5 w-5" />
        </Button>
        <DeleteButton contentId={contentId} />
      </div>
    </div>
  );
};

const EditButton = ({ contentId }: { contentId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <Edit2Icon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>Hi</SheetContent>
    </Sheet>
  );
};

const DeleteButton = ({ contentId }: { contentId: string }) => {
  const { deleteContent } = useBuilder();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0 text-sb-destructive">
          <Trash2Icon className="h-5 w-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogDescription>
          Weet je zeker dat je dit blok wilt verwijderen?
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuleren</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={() => deleteContent(contentId)}
          >
            Verwijderen
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
