import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea, ComponentWithAs, As } from "@chakra-ui/react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({ label, textarea, size: _, ...props }) => {
    let InputOrTextarea: ComponentWithAs<As<any>> | ComponentWithAs<As<any>>
        = Input
    if (textarea) {
        InputOrTextarea = Textarea
    }
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputOrTextarea {...field} {...props} id={field.name} />
            {error ?? <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>
    );
}
