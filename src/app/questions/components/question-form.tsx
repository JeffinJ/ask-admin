"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { QuestionFormData, questionFormSchema, validateFormData } from '@/types/question';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface QuestionFormProps {
    onSubmit?: (data: QuestionFormData) => Promise<void>;
    initialValues?: Partial<QuestionFormData>;
}

export default function QuestionForm({ initialValues }: QuestionFormProps) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    console.log(initialValues);


    const initialFormValues: Partial<QuestionFormData> = {
        questionText: '',
        delegatedEmail: '',
        assignments: [],
        singleAssignments: [],
        assignmentsInput: '',
        singleAssignmentsInput: '',
        priority: 'medium',
        dueDate: null,
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<QuestionFormData>({
        resolver: yupResolver(questionFormSchema),
        defaultValues: {
            questionText: initialFormValues?.questionText || '',
            delegatedEmail: initialFormValues?.delegatedEmail || '',
            assignments: initialFormValues?.assignments || [],
            singleAssignments: initialFormValues?.singleAssignments || [],
            assignmentsInput: '',
            singleAssignmentsInput: '',
            priority: initialFormValues?.priority || 'medium',
            dueDate: initialFormValues?.dueDate || null,
        }
    });

    const handleFormSubmit = async (data: QuestionFormData) => {
        try {
            setIsSubmitting(true);
            const validation = await validateFormData(data);

            if (!validation.isValid) {
                return;
            }
            reset();
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create question</Button>
            </DialogTrigger>
            <DialogContent className="w-full">
                <DialogHeader>
                    <DialogTitle>Create question</DialogTitle>
                    <DialogDescription>
                        {'Create a new question'}
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <div>
                        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                            {/* Question Text */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Question Text
                                </label>
                                <Controller
                                    name="questionText"
                                    control={control}
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            placeholder="Enter your question"
                                            className={`w-full ${errors.questionText ? 'border-red-500' : ''}`}
                                        />
                                    )}
                                />
                                {errors.questionText && (
                                    <p className="text-red-500 text-sm">{errors.questionText.message}</p>
                                )}
                            </div>

                            {/* Priority Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Assign to
                                </label>
                                <Controller
                                    name="assignments"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value[0]}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            {/* Priority Selection */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Priority
                                </label>
                                <Controller
                                    name="priority"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Question'}
                            </Button>
                        </form>
                    </div>
                </div>
                <DialogFooter>
                    {/* <Button type="submit">Create</Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}