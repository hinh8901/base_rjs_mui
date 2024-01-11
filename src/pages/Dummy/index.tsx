import { CustomButton, CustomText } from "@/components"
import { Box, Stack } from "@mui/material"
import React from "react"
import useDummy from "./useDummy"
import { TEXT_TYPE } from "@/components/CustomText"

const Dummy = () => {
  const { handleClickTestAPI, title, description } = useDummy()

  return (
    <Stack p={3} spacing={3}>
      <Box>
        <CustomButton variant='outlined' onClick={handleClickTestAPI}>
          Test API
        </CustomButton>
      </Box>
      <CustomText type={TEXT_TYPE.Body_16_Bold}>Title: {title}</CustomText>
      <CustomText type={TEXT_TYPE.Display_14_Regular}>
        Description: {description}
      </CustomText>
    </Stack>
  )
}

export default Dummy
