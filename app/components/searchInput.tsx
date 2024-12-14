import { HTMLAttributes, useEffect, useRef } from "react";
import { useDebounce } from "~/hooks/useDenounce";
import { useSubmit } from "@remix-run/react";

type SearchInputProps = HTMLAttributes<HTMLInputElement> & {
    name: string;
    defaultValue?: string;
    fetch?: (target: HTMLFormElement) => void
};

export function SearchInput({ defaultValue, fetch, ...props }: SearchInputProps) {
    const [debouncedValue, setValue] = useDebounce(500, defaultValue);
    const formRef = useRef<HTMLFormElement | null>();
    const debouncedValueRef = useRef(debouncedValue);
    const submit = useSubmit();

    useEffect(() => {
        if (debouncedValueRef.current === debouncedValue) {
            return;
        }
        if (formRef.current) {
            debouncedValueRef.current = debouncedValue;
            submit(formRef.current);
        }
    }, [debouncedValue, formRef, submit]);

    return (
        <input
            {...props}
            type="search"
            defaultValue={defaultValue}
            key={defaultValue}
            onChange={(e) => {
                formRef.current = e.target.form;
                setValue(e.target.value);
                fetch?.(e.target.form!);
            }}
        />
    );
}
