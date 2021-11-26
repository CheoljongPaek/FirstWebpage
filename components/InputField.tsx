import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Textarea } from "@chakra-ui/textarea";
import { useField } from "formik";
import React from "react";

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  textarea?: boolean;
  type?: string;
}

//1. useField(): This help me hook up inputs to Formik.
//2. '' => false, 'abcdef' => true
const Inputfield: React.FC<InputFieldProps> = ({
  label,
  textarea,
  ...props
}) => {
  const [field, meta] = useField(props);

  let InputOrTextarea;
  if (textarea) {
    InputOrTextarea = Textarea;
  } else {
    InputOrTextarea = Input;
  }
  // let InputOrTextarea = Input
  // if (props.textarea) {
  //   InputOrTextarea = Textarea
  // }

  return (
    <FormControl isInvalid={!!meta.error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputOrTextarea {...field} {...props} id={field.name} />
      {meta.error ? <FormErrorMessage>{meta.error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default Inputfield;
