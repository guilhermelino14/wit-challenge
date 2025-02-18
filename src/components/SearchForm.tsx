import { useFormik } from "formik";
import * as Yup from "yup";
import { SearchFormProps } from "../types";
import { Box, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const validationSchema = Yup.object({
  city: Yup.string()
    .required("City name is required")
    .matches(/^[a-zA-ZÀ-ÿ\s-]+$/, "City name can only contain letters, accents, spaces and hyphens"),
});

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const formik = useFormik({
    initialValues: {
      city: "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSearch(values.city);
    },
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ 
          width: '100%',
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <TextField
          sx={{ flex: 1, width: '100%' }}
          label="Enter city name"
          variant="outlined"
          id="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />
        <Button 
          type="submit"
          variant="contained"
          disabled={!formik.isValid || !formik.dirty}
          startIcon={<SearchIcon />}
          sx={{ 
            height: 56,
            mt: '0 !important',
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          Search
        </Button>
      </Box>
    </>
  );
};

export default SearchForm;
