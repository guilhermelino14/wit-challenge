import { useFormik } from "formik";
import * as Yup from "yup";
import { SearchFormProps } from "../types";

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
    <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          name="city"
          placeholder="Enter city name"
          value={formik.values.city}
          onChange={formik.handleChange}
        />
        <button type="submit" disabled={!formik.isValid || !formik.dirty}>
          Get Weather
        </button>
      </div>
      {formik.touched.city && formik.errors.city && (
        <div style={{ color: "red", fontSize: "0.8rem" }}>
          {formik.errors.city}
        </div>
      )}
    </form>
  );
};

export default SearchForm;
