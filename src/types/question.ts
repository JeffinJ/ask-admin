import * as yup from 'yup';

// Base question type
export type QuestionT = {
    id: string;
    questionText: string;
    creationDate: string;
    lastUpdatedDate: string;
    delegatedEmail: string;
    questionHistory: string[];
    historyLog: string[];
    assignments: string[];
    singleAssignments: string[];
};

// Form specific type - only includes fields that need to be filled in the form
export type CreateQuestionFormT = Omit<
    QuestionT,
    'id' | 'creationDate' | 'lastUpdatedDate' | 'questionHistory' | 'historyLog'
> & {
    // Add any form-specific fields here
    assignmentsInput?: string; // Optional field for handling raw comma-separated input
    singleAssignmentsInput?: string; // Optional field for handling raw comma-separated input
};

// Type for form submission
export type QuestionFormSubmission = {
    questionText: string;
    delegatedEmail: string;
    assignments: string[];
    singleAssignments: string[];
};

// Type for form validation errors
export type QuestionFormErrors = {
    questionText?: string;
    delegatedEmail?: string;
    assignments?: string;
    singleAssignments?: string;
};

// Type for the form's initial values
export type QuestionFormInitialValues = Partial<CreateQuestionFormT>;

// Type for form state
export interface QuestionFormState {
    isSubmitting: boolean;
    isSuccess: boolean;
    error: string | null;
}

const errorMessages = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minLength: (min: number) => `Must be at least ${min} characters`,
    maxLength: (max: number) => `Must be less than ${max} characters`,
    minArrayLength: (min: number) => `Must have at least ${min} item(s)`,
    maxArrayLength: (max: number) => `Must have less than ${max} item(s)`,
    invalidFormat: 'Invalid format'
};

export const questionFormSchema = yup.object({
    questionText: yup
        .string()
        .required(errorMessages.required)
        .min(10, errorMessages.minLength(10))
        .max(1000, errorMessages.maxLength(1000))
        .trim()
        .test(
            'no-empty-lines-at-start',
            'Question should not start with empty lines',
            value => !value?.startsWith('\n')
        ),

    delegatedEmail: yup
        .string()
        .required(errorMessages.required)
        .email(errorMessages.email)
        .trim()
        .lowercase(),

    assignments: yup
        .array()
        .of(
            yup
                .string()
                .trim()
                .min(2, errorMessages.minLength(2))
                .max(100, errorMessages.maxLength(100))
        )
        .min(1, errorMessages.minArrayLength(1))
        .max(10, errorMessages.maxArrayLength(10))
        .required(errorMessages.required),

    singleAssignments: yup
        .array()
        .of(
            yup
                .string()
                .trim()
                .min(2, errorMessages.minLength(2))
                .max(100, errorMessages.maxLength(100))
        )
        .max(5, errorMessages.maxArrayLength(5))
        .nullable(),

    assignmentsInput: yup
        .string()
        .transform((value) => (value ? value : undefined))
        .test(
            'valid-format',
            'Must be comma-separated values',
            value => !value || /^[^,]+(,[^,]+)*$/.test(value)
        ),

    singleAssignmentsInput: yup
        .string()
        .transform((value) => (value ? value : undefined))
        .test(
            'valid-format',
            'Must be comma-separated values',
            value => !value || /^[^,]+(,[^,]+)*$/.test(value)
        ),

    priority: yup
        .mixed<'low' | 'medium' | 'high'>()
        .oneOf(['low', 'medium', 'high'], 'Invalid priority level')
        .default('medium'),

    dueDate: yup
        .date()
        .min(
            new Date(),
            'Due date cannot be in the past'
        )
        .nullable()
        .transform((value) => (value === '' ? null : value))

}).required();

export type QuestionFormData = yup.InferType<typeof questionFormSchema>;

const customRules = {
    isValidAssignmentFormat: (value: string) => {
        if (!value) return true;
        const assignments = value.split(',').map(a => a.trim());
        return assignments.every(a => a.length >= 2 && a.length <= 100);
    },

    hasNoDuplicates: (value: string[]) => {
        const uniqueValues = new Set(value);
        return uniqueValues.size === value.length;
    }
};

export const validationRules = {
    questionText: {
        minLength: 10,
        maxLength: 1000
    },
    assignments: {
        minItems: 1,
        maxItems: 10,
        itemMinLength: 2,
        itemMaxLength: 100
    },
    singleAssignments: {
        maxItems: 5,
        itemMinLength: 2,
        itemMaxLength: 100
    },
    customRules
};

export const validateFormData = async (data: QuestionFormData) => {
    try {
        const validatedData = await questionFormSchema.validate(data, {
            abortEarly: false,
            stripUnknown: true,
        });
        return {
            isValid: true,
            data: validatedData,
            errors: null
        };
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            const errors = error.inner.reduce((acc, err) => {
                if (err.path) {
                    acc[err.path] = err.message;
                }
                return acc;
            }, {} as Record<string, string>);

            return {
                isValid: false,
                data: null,
                errors
            };
        }
        throw error;
    }
};