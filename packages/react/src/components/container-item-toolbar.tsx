import * as React from "react";
import { ArrowDown, ArrowUp, Edit2Icon, Trash2Icon } from "lucide-react";

import { useBuilder } from "@/components/context/builder-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ContainerItemForm } from "./container-item-form";
import { ItemDesignForm } from "./item-design-form";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

type ContainerItemToolbarProps = {
  contentId: string;
  canBringUp?: boolean;
  canBringDown?: boolean;
};

export const ContainerItemToolbar = (props: ContainerItemToolbarProps) => {
  const { contentId, canBringUp = false, canBringDown = false } = props;

  const { bringUp, bringDown } = useBuilder();

  return (
    <div className="sb-absolute sb-z-20 sb-top-1 sb-right-1 sb-rounded-md sb-shadow sb-flex sb-flex-col sb-gap-1 sb-p-1 sb-bg-card sb-text-card-foreground sb-item-toolbar sb-opacity-0 sb-transition-opacity">
      <div className="sb-h-10 sb-p-1 sb-border sb-border-input sb-bg-background sb-rounded-md sb-text-sm sb-font-medium sb-flex sb-gap-1 sb-items-center sb-justify-start">
        <EditButton id={contentId} />
        <Button
          variant="ghost"
          className="sb-w-8 sb-h-8 sb-p-0"
          onClick={() => bringUp(contentId)}
          disabled={!canBringUp}
        >
          <ArrowUp className="sb-h-5 sb-w-5" />
        </Button>
        <Button
          variant="ghost"
          className="sb-w-8 sb-h-8 sb-p-0"
          onClick={() => bringDown(contentId)}
          disabled={!canBringDown}
        >
          <ArrowDown className="sb-h-5 sb-w-5" />
        </Button>
        <DeleteButton contentId={contentId} />
      </div>
    </div>
  );
};

const EditButton = ({ id }: { id: string }) => {
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="sb-w-8 sb-h-8 sb-p-0">
          <Edit2Icon className="sb-h-5 sb-w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="left"
        align="start"
        sideOffset={16}
        alignOffset={-8}
        className="sb-p-0 sb-relative"
        collisionPadding={16}
      >
        <EditPopoverInner id={id} />
      </PopoverContent>
    </Popover>
  );
};

type EditPopoverInnerProps = {
  id: string;
};

const EditPopoverInner = (props: EditPopoverInnerProps) => {
  const { id } = props;
  const { getItem } = useBuilder();

  const item = getItem(id);

  if (!item) {
    throw new Error(
      `[simple-builder]: Item with id ${id} not found in container item form component`,
    );
  }

  return (
    <Tabs>
      <TabsList variant="text" defaultValue="content">
        <TabsTrigger variant="text" value="content">
          Inhoud
        </TabsTrigger>
        <TabsTrigger variant="text" value="design">
          Design
        </TabsTrigger>
      </TabsList>
      <TabsContent value="content">
        <ScrollArea>
          <ContainerItemForm item={item} />
        </ScrollArea>
      </TabsContent>
      <TabsContent value="design">
        <ItemDesignForm item={item} />
      </TabsContent>
    </Tabs>
  );
};

const DeleteButton = ({ contentId }: { contentId: string }) => {
  const { deleteContent } = useBuilder();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="sb-w-8 sb-h-8 sb-p-0 sb-text-destructive"
        >
          <Trash2Icon className="sb-h-5 sb-w-5" />
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
