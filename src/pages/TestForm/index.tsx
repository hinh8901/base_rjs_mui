import React, { useEffect } from "react"
import FormInput from "@/components/FormInput/index"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material"
import { SubmitErrorHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { TEST_FORM_FIELD_NAME } from "./fieldname"
import { testSchema } from "./validate"
import { CustomButton } from "@/components"
import { isEmpty } from "ramda"
import moment from "moment"

const TFFN = TEST_FORM_FIELD_NAME

const options_object_label_value = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  { value: "4", label: "Option 4" },
  { value: "5", label: "Option 5" },
]

const options_primitive = [1, 2, 3, 4, 5, "silver"]

const options_object_pLabel_pVlaue = [
  { "pValue": "P.1", "pLabel": "P.Option 1" },
  { "pValue": "P.2", "pLabel": "P.Option 2" },
  { "pValue": "P.3", "pLabel": "P.Option 3" },
  { "pValue": "P.4", "pLabel": "P.Option 4" },
  { "pValue": "P.5", "pLabel": "P.Option 5" },
]

const TestForm = () => {
  const methods = useForm({
    mode: "onSubmit",
    resolver: yupResolver(testSchema),
  })

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = () => {
    console.log("flow: value submit: ", getValues())
  }

  const onError = (errors: any) => {
    console.log("flow: errors", errors)
  }
  return (
    <Box sx={{ minHeight: "300vh" }}>
      <Card
        sx={{
          width: "50%",
          p: 5,
          m: 5,
        }}
      >
        <CardHeader title='Test Form' />
        <CardContent>
          <FormInput
            type="text"
            label='Text'
            control={control}
            placeholder="Placeholder: text"
            name={TFFN.INPUT_TEXT}
            errorMessage={errors[TFFN.INPUT_TEXT]?.message}
            clearErrorOnFocus
            helperText="Hello world!!!"
            defaultValue=""
          />
          <FormInput
            type="number"
            label="Number"
            control={control}
            placeholder="Placeholder: number"
            name={TFFN.INPUT_NUMBER}
            errorMessage={errors[TFFN.INPUT_NUMBER]?.message}
            thousandSeparator
            clearErrorOnFocus
            helperText="Hello world!!!"
            defaultValue=""
          />
          <FormInput
            label='Input Select Primitive'
            placeholder='Placeholder: Select Primivite'
            control={control}
            name={TFFN.INPUT_SELECT_PRIMITIVE}
            options={options_primitive}
            type="select"
            errorMessage={errors[TFFN.INPUT_SELECT_PRIMITIVE]?.message}
            useSearching
            required
            shrinkLabel
            clearErrorOnFocus
            defaultValue=""
          />
          <FormInput
            label='Input Select Object(label, value)'
            placeholder='Placeholder: Select Object(label, value)'
            control={control}
            name={TFFN.INPUT_SELECT_OBJ_LABEL_VALUE}
            options={options_object_label_value}
            type="select"
            errorMessage={errors[TFFN.INPUT_SELECT_OBJ_LABEL_VALUE]?.message}
            required
            shrinkLabel
            clearErrorOnFocus
            defaultValue=""
          />
          <FormInput
            label='Input Select Object(pLabel, pValue)'
            placeholder='Placeholder: Select Object(pLabel, pValue)'
            control={control}
            name={TFFN.INPUT_SELECT_OBJ_PLABEL_PVALUE}
            options={options_object_pLabel_pVlaue}
            type="select"
            errorMessage={errors[TFFN.INPUT_SELECT_OBJ_PLABEL_PVALUE]?.message}
            required
            shrinkLabel
            propertyLabel="pLabel"
            propertyValue="pValue"
            clearErrorOnFocus
            defaultValue=""
          />
          <FormInput
            type="radio"
            name={TFFN.INPUT_RADIO_PRIMITIVE}
            label="Radio Primitive"
            control={control}
            options={options_primitive}
            errorMessage={errors[TFFN.INPUT_RADIO_PRIMITIVE]?.message}
            defaultValue=""
          />
          <FormInput
            type="radio"
            name={TFFN.INPUT_RADIO_OBJ_LABEL_VALUE}
            label="Radio Object(label, value)"
            control={control}
            options={options_object_label_value}
            errorMessage={errors[TFFN.INPUT_RADIO_OBJ_LABEL_VALUE]?.message}
            defaultValue=""
          />
          <FormInput
            type="radio"
            name={TFFN.INPUT_RADIO_OBJ_PLABEL_PVALUE}
            label="Radio Object(pLabel, pValue)"
            control={control}
            options={options_object_pLabel_pVlaue}
            propertyLabel="pLabel"
            propertyValue="pValue"
            errorMessage={errors[TFFN.INPUT_RADIO_OBJ_PLABEL_PVALUE]?.message}
            defaultValue=""
          />
          <FormInput
            type="checkbox"
            name={TEST_FORM_FIELD_NAME.INPUT_CHECKBOX}
            label='checkbox'
            control={control}
            errorMessage={errors[TFFN.INPUT_CHECKBOX]?.message}
            defaultValue={false}
          />
          <FormInput
            placeholder="Placeholder: Input Date"
            type="date"
            name={TEST_FORM_FIELD_NAME.INPUT_DATE}
            label="Date"
            control={control}
            errorMessage={errors[TFFN.INPUT_DATE]?.message}
            defaultValue=""
            shrinkLabel
            maxDate={moment("03/12/2023", "DD/MM/YYYY")}
            minDate={moment("18/10/2023", "DD/MM/YYYY")}
            clearErrorOnFocus
          />
        </CardContent>
        <CardActions>
          <CustomButton
            onClick={handleSubmit(onSubmit, onError)}
          >Submit</CustomButton>
          <CustomButton
            onClick={() => {
              const values = getValues()
              if (!isEmpty(errors)) console.log({ errors })
              console.log("flow: values: ", values)

            }}
          >Get value</CustomButton>
        </CardActions>
      </Card>
    </Box>
  )
}

export default TestForm
