import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { validate } from "./validation";
import styles from "./Form.module.css";

const Form = () => {
  const duration = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24,
  ];

  const allCountries = useSelector((state) => state.countries).sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const [form, setForm] = useState({
    name: "",
    difficulty: 0,
    duration: 0,
    season: "",
    countries: [],
  });

  const [errors, setErrors] = useState({});
  const [formComplete, setFormComplete] = useState(false);
  const [created, setCreated] = useState("");

  const handleInputs = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    checkFormComplete();
    setErrors(validate({ ...form, [e.target.name]: e.target.value }));
  };

  const selectCountry = (e) => {
    checkFormComplete();
    setForm({
      ...form,
      countries: [...form.countries, e.target.value],
    });
    e.target.value = "";
  };

  const handleDelete = (name) => {
    setForm({
      ...form,
      countries: form.countries.filter((country) => country !== name),
    });
  };

  const checkFormComplete = () => {
    if (
      !form.name ||
      !form.difficulty ||
      !form.duration ||
      !form.season ||
      form.countries.length <= 0
    ) {
      setFormComplete(false);
    } else {
      setFormComplete(true);
    }
  };

  const clearForm = () => {
    setFormComplete(false);
    setForm({
      name: "",
      difficulty: 0,
      duration: 0,
      season: "",
      countries: [],
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (formComplete === true) {
      await axios.post("/activities", form);
      setCreated("Activity successfully created");
    } else setCreated("Failed to create activity");
    setFormComplete(false);
    clearForm();
  };

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <div className={styles.inputsContainer}>
        <h1 className={styles.title}>Create an activity</h1>

        <div className={styles.nameContainer}>
          <label>Activity Name</label>
          <input
            className={styles.inputName}
            onChange={handleInputs}
            placeholder="Activity Name..."
            type="text"
            value={form.name}
            name="name"
          />
          <span className={styles.spans}>{errors.name}</span>
        </div>

        <div className={styles.diffContainer}>
          <label>Difficulty</label>
          <select
            className={styles.selects}
            onChange={handleInputs}
            value={form.difficulty}
            name="difficulty"
          >
            <option value="hidden" hidden>
              1 to 5
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <span className={styles.spans}>{errors.difficulty}</span>
        </div>

        <div className={styles.durationContainer}>
          <label>Duration</label>
          <select
            className={styles.selects}
            onChange={handleInputs}
            value={form.duration}
            name="duration"
          >
            <option value="" hidden>
              Hours
            </option>

            {duration.map((e, index) => (
              <option key={index} value={e} name="duration">
                {e}
              </option>
            ))}
          </select>
          <span className={styles.spans}>{errors.duration}</span>
        </div>

        <div className={styles.seasonContainer}>
          <label>Season</label>
          <select
            className={styles.selects}
            onChange={handleInputs}
            value={form.season}
            name="season"
          >
            <option value="">Select a season</option>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
          </select>
          <span className={styles.spans}>{errors.season}</span>
        </div>

        <div className={styles.countryContainer}>
          <div className={styles.listCountries}>
            <label>Country</label>
            <select className={styles.selects} onChange={selectCountry}>
              <option value="" hidden>
                Select countries
              </option>
              {allCountries.map((country) => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
            <span className={styles.spans}>{errors.countries}</span>
          </div>

          <div className={styles.selectedCountry}>
            {form.countries.map((c, i) => (
              <div key={i}>
                <span className={styles.countryName}>{c}</span>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(c)}
                  type="button"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.createButton}
            disabled={!formComplete}
            type="submit"
          >
            Create
          </button>
          <button onClick={clearForm} className={styles.clearButton}>
            Clear
          </button>
        </div>
        <span>{created}</span>

        <NavLink to="/home">
          <button className={styles.homeButton}>Back to Home</button>
        </NavLink>
      </div>
    </form>
  );
};

export default Form;
