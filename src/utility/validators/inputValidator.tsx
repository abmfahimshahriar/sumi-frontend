export const inputValidator = (inputs: any[]) => {
  let hasError = false;
  let finalErrorsObject: any = {};
  for (let i = 0; i < inputs.length; i++) {
    const errors: string[] = [];
    if (
      inputs[i].validations.includes("required") &&
      inputs[i].fieldValue.length === 0
    ) {
      errors.push("field required");
    }
    if (
      inputs[i].validations.includes("minLength") &&
      inputs[i].fieldValue.length < inputs[i].minLength
    ) {
      errors.push(`minimum length is ${inputs[i].minLength}`);
    }
    if (
      inputs[i].validations.includes("maxLength") &&
      inputs[i].fieldValue.length > inputs[i].maxLength
    ) {
      errors.push(`maximum length is ${inputs[i].maxLength}`);
    }

    if (errors.length > 0) hasError = true;
    const errorsObject = errorObjectBuilder(`${inputs[i].fieldName}`, errors);
    finalErrorsObject = {
      ...finalErrorsObject,
      ...errorsObject,
    };
  }
  finalErrorsObject.hasError = hasError;
  return finalErrorsObject;
};

const errorObjectBuilder = (fieldName: string, errors: string[]) => {
  const errorsObject = {
    [fieldName]: {
      errors: errors,
    },
  };

  return errorsObject;
};
