import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

type FormDialogProps = {
    title: string,
    description: string,
    triggerButtonText: string,
    saveButtonText?: string,
    children: React.ReactNode
}

export function FormDialog({ title, description, children, triggerButtonText, saveButtonText }: FormDialogProps) {
    const buttonText = saveButtonText ? saveButtonText : 'Save changes';
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{triggerButtonText}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
                <DialogFooter>
                    <Button type="submit">{buttonText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
