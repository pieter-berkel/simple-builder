import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "sb-fixed sb-inset-0 sb-z-50 sb-bg-black/80 sb- data-[state=open]:sb-animate-in data-[state=closed]:sb-animate-out data-[state=closed]:sb-fade-out-0 data-[state=open]:sb-fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "sb-fixed sb-left-[50%] sb-top-[50%] sb-z-50 sb-grid sb-w-full sb-max-w-lg sb-translate-x-[-50%] sb-translate-y-[-50%] sb-gap-4 sb-border sb-bg-background sb-p-6 sb-shadow-lg sb-duration-200 data-[state=open]:sb-animate-in data-[state=closed]:sb-animate-out data-[state=closed]:sb-fade-out-0 data-[state=open]:sb-fade-in-0 data-[state=closed]:sb-zoom-out-95 data-[state=open]:sb-zoom-in-95 data-[state=closed]:sb-slide-out-to-left-1/2 data-[state=closed]:sb-slide-out-to-top-[48%] data-[state=open]:sb-slide-in-from-left-1/2 data-[state=open]:sb-slide-in-from-top-[48%] sm:sb-rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="sb-absolute sb-right-4 sb-top-4 sb-rounded-sm sb-opacity-70 sb-ring-offset-background sb-transition-opacity hover:sb-opacity-100 focus:sb-outline-none focus:sb-ring-2 focus:sb-ring-ring focus:sb-ring-offset-2 disabled:sb-pointer-events-none data-[state=open]:sb-bg-accent data-[state=open]:sb-text-muted-foreground">
        <X className="sb-h-4 sb-w-4" />
        <span className="sb-sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "sb-flex sb-flex-col sb-space-y-1.5 sb-text-center sm:sb-text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "sb-flex sb-flex-col-reverse sm:sb-flex-row sm:sb-justify-end sm:sb-space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "sb-text-lg sb-font-semibold sb-leading-none sb-tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("sb-text-sm sb-text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
